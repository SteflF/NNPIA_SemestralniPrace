import * as React from "react";
import UserSideMenu from "../../layout/userSideMenu";
import {IOrder} from "../../../apiModels/viewModels";
import http from "../../../service/httpService";
import {OrderCotroller_GetByUserId} from "../../../apiClient/routes";
import UserOrderTable from "./orders/userOrderTable";

class UserOrderList extends React.Component{
    state = {
        orders: Array<IOrder>()
    }

    async componentDidMount() {
        const userId = localStorage.getItem("userId");
        const orders = await http.get(OrderCotroller_GetByUserId(Number(userId)));

        this.setState({orders: orders.data.result});
    }

    render() {
        const { orders } =this.state;

        return(
            <React.Fragment>
                <UserSideMenu />
                <div className="col-lg-9 mt-4">
                    <h2>Objednávky</h2>
                     <UserOrderTable
                        orders={orders}
                    />
                    {orders.length === 0
                        ?<p>Nebyly nalezeny žádné objednávky!</p>
                        : null}
                </div>
            </React.Fragment>
        );
    }
}

export default UserOrderList;
