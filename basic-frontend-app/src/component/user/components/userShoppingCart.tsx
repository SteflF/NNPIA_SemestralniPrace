import * as React from "react";
import ProductItem from "./shoppingCart/productItem";

class UserShoppingCart extends React.Component{

    componentDidMount() {

    }

    render() {
        return(
            <div className="col-lg-auto mt-4">
                <h2>Košík</h2>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">&nbsp;</th>
                            <th scope="col">Zboží</th>
                            <th scope="col">Počet ks</th>
                            <th scope="col">Cena</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                        </thead>
                        <ProductItem/>
                    </table>
                    <a className="btn btn-success float-right" asp-action="MakeOrder" title="Vytvořit objednávku">Objednat</a>
            </div>
        );
    }
}

export default UserShoppingCart;
