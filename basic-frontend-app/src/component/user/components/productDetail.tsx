import * as React from "react";
import { RouteComponentProps } from "react-router";
import http from "../../../service/httpService";
import {OrderItemController_CreateOrderItem, ProductController_GetProduct} from "../../../apiClient/routes";
import SideMenu from "../../layout/sideMenu";
import { ILocalProduct } from "../../../apiModels/viewModels";

type ProductDetailProps = RouteComponentProps<{ id: string }>;

class ProductDetail extends React.Component<ProductDetailProps>{
    state = {
        product: {
            id: -1,
            name: '',
            description: '',
            price: '',
            photo: '',
            category: ''
        }
    }

    async componentDidMount(){
        const productId = parseInt(this.props.match.params.id);
        const product = await http.get(ProductController_GetProduct(productId));
        this.setState({product: product.data.result});
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();
        const { product } = this.state;
        let localProduct = Array<ILocalProduct>()

        const result = localStorage.getItem("products");

        if(result !== null){
            localProduct = JSON.parse(result);

            let productIndex = localProduct.findIndex(i => i.id === product.id);

            if(productIndex !== -1){
                localProduct[productIndex].count += 1;
            }else{
                const newProduct: ILocalProduct = {
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    count: 1,
                    photo: product.photo
                };

                localProduct.push(newProduct);
            }

            localStorage.setItem("products", JSON.stringify(localProduct));
        }else{
            const newProduct: ILocalProduct = {
                id: product.id,
                name: product.name,
                price: Number(product.price),
                count: 1,
                photo: product.photo
            };

            localProduct.push(newProduct);
            localStorage.setItem("products", JSON.stringify(localProduct));
        }
    }

    render() {
        const { product } = this.state;

        if(product.id !== -1){
            return(
                <React.Fragment>

                    <SideMenu />
                    <div className="col-lg-9">
                        <div className="card mt-4">
                            <img className="card-img-top p-1" src={product.photo.toString()} alt="" />
                            <div className="card-body">
                                <h3 className="card-title">{product.name}</h3>
                                <h4>{product.price} Kč</h4>
                                <p className="card-text">
                                    {product.description}
                                </p>
                                <span className="text-warning">★ ★ ★ ★ ☆</span> 4.0 stars
                                <br/>
                                <form onSubmit={this.handleSubmit}>
                                    <button className="btn btn-danger mt-1" type="submit">Do košíku</button>
                                </form>
                            </div>
                        </div>

                        <div className="card card-outline-secondary my-4">
                            <div className="card-header">
                                Product Reviews
                            </div>
                            <div className="card-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore,
                                    similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat
                                    laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                    inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam
                                    aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.
                                </p>
                                <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                    inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam
                                    aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.
                                </p>
                                <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr />
                                <a href="foo" className="btn btn-success">Leave a Review</a>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <h1>LOADING DATA...</h1>
                </React.Fragment>
            )
        }
    }
}

export default ProductDetail;
