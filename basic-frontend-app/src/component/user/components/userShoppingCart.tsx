import * as React from "react";
import ProductItem from "./shoppingCart/productItem";
import {ILocalProduct} from "../../../apiModels/viewModels";
import {NavLink, Link} from "react-router-dom";
import { ToastContainer } from "react-toastify";

class UserShoppingCart extends React.Component{
    state = {
        products: Array<ILocalProduct>()
    }

    componentDidMount() {;
        let result = localStorage.getItem("products");

        if(result !== null){
            const localProducts = JSON.parse(result);
            this.setState({products: localProducts});
        }
    }

    handleRemoveProductItem = (productId: number): void => {
        let result = localStorage.getItem("products");

        if(result !== null){
            let localProducts = Array<ILocalProduct>();
            localProducts = JSON.parse(result);
            localProducts = localProducts.filter(i => i.id !== productId);

            localStorage.setItem("products", JSON.stringify(localProducts));
            this.setState({products: localProducts});
        }
    }

    handleIncreaseProductCount = (productId: number): void => {
        let result = localStorage.getItem("products");

        if(result !== null){
            let localProducts = Array<ILocalProduct>();
            localProducts = JSON.parse(result);

            localProducts.forEach(product => {
                if(product.id === productId && product.count < 100) {
                    product.count += 1;
                }
            })

            this.setState({products: localProducts});
            localStorage.setItem("products", JSON.stringify(localProducts));
        }
    }

    handleDecreaseProductCount = (productId: number): void => {
        let result = localStorage.getItem("products");

        if(result !== null){
            let localProducts = Array<ILocalProduct>();
            localProducts = JSON.parse(result);

            let productIndex = localProducts.findIndex(i => i.id === productId);

            if(productIndex !== -1){
                localProducts[productIndex].count -= 1;
                if(localProducts[productIndex].count === 0){
                    localProducts = localProducts.filter(i => i.id !== localProducts[productIndex].id);
                }
            }

            this.setState({products: localProducts});
            localStorage.setItem("products", JSON.stringify(localProducts));
        }
    }

    render() {
        const {products} = this.state;

        return(
            <React.Fragment>
                <ToastContainer />
                <div className="col-lg-auto mt-4 w-100">
                    <h2>Košík</h2>
                    {products.length > 0
                        ?
                        <div>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">&nbsp;</th>
                                    <th scope="col">Zboží</th>
                                    <th scope="col">Počet ks</th>
                                    <th scope="col">Cena za kus</th>
                                    <th scope="col">Cena</th>
                                    <th scope="col">&nbsp;</th>
                                </tr>
                                </thead>
                                {products.map(product => {
                                    return <ProductItem
                                        key={product.id}
                                        product={product}
                                        onRemoveProductItemClick={this.handleRemoveProductItem}
                                        onDecreaseProductCountClick={this.handleDecreaseProductCount}
                                        onIncreaseProductCountClick={this.handleIncreaseProductCount}
                                    />
                                })}
                            </table>
                            <Link className="btn btn-success float-right" title="Vytvořit objednávku" href="#fuu" to='/user/createorder'>Objednat</Link>
                        </div>
                        :
                        <div className="text-center badge-dark p-4">
                            <h1>Váš nákupní <strong>košík je prázdný</strong>.</h1>
                            <NavLink className="btn btn-primary" exact={true} to={{pathname: '/products', state: ''}}>
                                Zpět do obchodu
                            </NavLink>
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default UserShoppingCart;
