import * as React from "react";
import { Link } from "react-router-dom"
import {IProductItem} from "../../../../apiModels/viewModels";

interface IProductListItemProps {
    product: IProductItem
}

class ProductListItem extends React.Component<IProductListItemProps>{
    render() {
        const product = this.props.product;

        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100">
                    <img className="card-img-top p-1" src={product.photo} alt=""  />
                    <div className="card-body">
                        <h4 className="card-title">
                            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: "black" }}>
                                {product.name}
                            </Link>
                        </h4>
                        <h5>{product.price} Kč</h5>
                        <p className="card-text">{product.description}</p>
                    </div>
                    <div className="card-footer">
                        <Link className="btn btn-info btn-block" to={`/product/${product.id}`} style={{ textDecoration: 'none', color: "black" }}>
                            Detail
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductListItem;
