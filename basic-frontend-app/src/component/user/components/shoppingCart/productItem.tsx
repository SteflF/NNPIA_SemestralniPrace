import * as React from "react";
import {ILocalProduct} from "../../../../apiModels/viewModels";

interface IProductItemProps {
    product: ILocalProduct
    onRemoveProductItemClick(productId: number): void
    onIncreaseProductCountClick(productId: number): void
    onDecreaseProductCountClick(productId: number): void
}

class ProductItem extends React.Component<IProductItemProps> {
    onRemoveClick = (productId: number, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        this.props.onRemoveProductItemClick(productId);
    }

    onIncreaseClick = (productId: number, e: React.MouseEvent) => {
        e.preventDefault();
        this.props.onIncreaseProductCountClick(productId);
    }

    onDecreaseClick = (productId: number, e: React.MouseEvent) => {
        e.preventDefault();
        this.props.onDecreaseProductCountClick(productId);
    }

    render() {
        const {product} = this.props;

        return(
            <tr>
                <td><img src={product.photo} width="80px" alt=""/></td>
                <td>{product.name}</td>
                <td>
                    <button className="btn btn-secondary border mr-1" onClick={(e) => this.onDecreaseClick(product.id, e)}>▼</button>
                    {product.count}
                    <button className="btn btn-secondary border ml-1"onClick={(e) => this.onIncreaseClick(product.id, e)}>▲</button>
                </td>
                <td>{product.price} Kč</td>
                <td>{product.price * product.count} Kč</td>
                <td>
                    <a className="btn btn-danger" title="Odebrat položku" href="#fuu" onClick={(e) => this.onRemoveClick(product.id, e)}>Odebrat</a>
                </td>
            </tr>
        );
    }
}

export default ProductItem;
