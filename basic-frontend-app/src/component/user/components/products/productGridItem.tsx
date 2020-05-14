import * as React from "react";
import { Link } from "react-router-dom";
import {IProductItem} from "../../../../apiModels/viewModels";

interface IProductGriItemProps {
    product: IProductItem
}

class ProductGridItem extends React.Component<IProductGriItemProps>{
    render() {
        const product = this.props.product;

        return(
            <div className="col-6 col-lg-4 g-mb-30" key={product.id}>
                <figure className="g-pos-rel g-mb-20">
                    <img className="img-fluid" src="https://picsum.photos/220/200" alt="Description" />
                </figure>
                <div className="media">
                    <div className="d-flex flex-column">
                        <h4 className="h6 g-color-black mb-1">
                            <Link to={`/product/${product.id}`}>
                                {product.name}
                            </Link>
                        </h4>
                        <a className="d-inline-block g-color-gray-dark-v5 g-font-size-13" href="#">{product.description}</a>
                        <span className="d-block g-color-black g-font-size-17">{product.price} Kč</span>
                    </div>
                    <ul className="list-inline media-body text-right">
                        <li className="list-inline-item align-middle mx-0">
                            <a className="u-icon-v1 u-icon-size--sm g-color-gray-dark-v5 g-color-primary--hover g-font-size-15 rounded-circle" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add to Cart">
                                <i className="icon-finance-100 u-line-icon-pro" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default ProductGridItem;
