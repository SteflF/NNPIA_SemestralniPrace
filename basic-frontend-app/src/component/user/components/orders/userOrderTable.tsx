import * as React from "react";
import UserOrderListItem from "./userOrderListItem";
import {IOrder} from "../../../../apiModels/viewModels";

interface IUserOrderTableProps {
    orders: IOrder[]
}

class UserOrderTable extends React.Component<IUserOrderTableProps>{
    render() {
        const {orders}= this.props;

        return(
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Datum</th>
                        <th scope="col">Číslo objednávky</th>
                        <th scope="col">Stav objednávky</th>
                        <th scope="col">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(function (order){
                        return <UserOrderListItem order={order} key={order.id}/>
                    })}
                </tbody>
            </table>
        );
    }

}

export default UserOrderTable;
