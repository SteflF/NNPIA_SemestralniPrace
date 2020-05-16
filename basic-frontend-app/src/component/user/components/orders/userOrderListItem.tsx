import * as React from "react";
import {IOrder} from "../../../../apiModels/viewModels";
import { Link } from "react-router-dom";

interface IUserOrderListItemProps {
    order: IOrder
}

class UserOrderListItem extends React.Component<IUserOrderListItemProps>{
    render() {
        const {order} = this.props;

        return(
            <tr>
                <td>
                    <a asp-controller="User" asp-action="OrderDetails"
                       asp-route-id="@item.Id">Datum
                    </a>
                </td>
                <td>
                    <a asp-controller="User" asp-action="OrderDetails" asp-route-id="@item.Id">{order.id}</a>
                </td>
                <td>{order.state}</td>
                <td>
                    <Link to={`/user/order/${order.id}`}>Více</Link>
                </td>
            </tr>
        );
    }
}

export default UserOrderListItem;
