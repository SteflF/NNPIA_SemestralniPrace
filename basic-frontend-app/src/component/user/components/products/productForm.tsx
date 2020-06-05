import * as React from "react";
import {RouteComponentProps} from "react-router";
import http from "../../../../service/httpService";
import {ProductController_GetProduct, ProductController_CreateProduct, ProductController_EditProduct} from "../../../../apiClient/routes";
import TextField from "@material-ui/core/TextField";
import {NavLink} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

type ProductFormProps = RouteComponentProps<{ id: string }>;

interface IProductFormProps {
    createProduct: boolean
}

class ProductForm extends React.Component<ProductFormProps & IProductFormProps>{
    state = {
        headingText: '',
        acceptButtonText: 'Potvrdit',
        product: {
            id: '',
            name: '',
            price: '',
            description: '',
            photo: 'https://picsum.photos/200',
            category: ''
        }
    }

    async componentDidMount() {
        const productId = parseInt(this.props.match.params.id);

        if(!isNaN(productId) && !this.props.createProduct){
            const product = await http.get(ProductController_GetProduct(productId));

            if(product.data.result !== null){
                this.setState({product: product.data.result, headingText: "Upravit produkt", acceptButtonText: "Uložit"});
            }
        }else{
            this.setState({headingText: "Vytvořit produkt", acceptButtonText: "Vytvořit"});
        }
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();

        if(this.props.createProduct){
            const result = await http.post(ProductController_CreateProduct, this.state.product);

            if(result.data.result !== null){
                toast.success('Produkt úspěšně vytvořen!');
            }else{
                toast.error('Něco se nepovedlo!');
            }
        }else{
            const result = await http.put(ProductController_EditProduct(Number(this.state.product.id)), this.state.product);

            if(result.data.result !== null){
                toast.success('Produkt úspěšně upraven!');
            }else{
                toast.error('Něco se nepovedlo!');
            }
        }
    }

    handleProductNameChange = (e: any): void => {
        const product = {...this.state.product};
        product.name = e.target.value;

        this.setState({product});
    }

    handleProductPriceChange = (e: any): void => {
        const product = {...this.state.product};
        product.price = e.target.value;

        this.setState({product});
    }

    handleProductDescriptionChange = (e: any): void => {
        const product = {...this.state.product};
        product.description = e.target.value;

        this.setState({product});
    }

    handleProductCategoryChange = (e: any): void => {
        const product = {...this.state.product};
        product.category = e.target.value;

        this.setState({product});
    }

    render() {
        const { product } = this.state;

        return(
            <React.Fragment>
                <ToastContainer/>
                <h2>{this.state.headingText}</h2>
                <form onSubmit={this.handleSubmit} style={formContainer}>
                    <TextField label="Název" fullWidth margin="normal" name="name" value={product.name} onChange={this.handleProductNameChange} required/>

                    <TextField label="Cena" type="number" aria-valuemin={1} fullWidth margin="normal" name="price" value={product.price} onChange={this.handleProductPriceChange} required/>

                    <TextField label="Popis" fullWidth margin="normal" name="description" value={product.description} onChange={this.handleProductDescriptionChange} required/>

                    <TextField label="Foto" fullWidth margin="normal" name="photo" value={product.photo} aria-readonly={true} required/>

                    <TextField label="Kategorie" fullWidth margin="normal" name="category" value={product.category} onChange={this.handleProductCategoryChange} required/>

                    <input className="btn btn-success mt-2 float-left" type="submit" value={this.state.acceptButtonText}/>
                    <NavLink className="btn btn-danger mt-2 ml-2" to={{pathname: '/products', state: ''}} exact={true}>Zrušit</NavLink>
                </form>
            </React.Fragment>
        );
    }
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

export default ProductForm;
