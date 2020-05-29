import * as React from "react";
import {IOrderItem} from "../../../../apiModels/viewModels";

interface IUserOrderedItemProps {
    orderItem: IOrderItem
}

class UserOrderedItem extends React.Component<IUserOrderedItemProps>{
    render() {
        const {orderItem} = this.props;

        return(
            <tr>
                <td><img src="https://picsum.photos/100" alt=""/></td>
                <td>{orderItem.product.name}</td>
                <td>{orderItem.count}</td>
                <td>{orderItem.price} Kč</td>
            </tr>
        );
    }
}

export default UserOrderedItem;
