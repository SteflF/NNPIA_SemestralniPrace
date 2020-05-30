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
        console.log(orders);
        this.setState({orders: orders.data.result});
    }

    render() {
        const { orders } =this.state;

        return(
            <React.Fragment>
                <UserSideMenu />
                <div className="col-lg-9 mt-4">
                    <h2>Objednávky</h2>
                    {/*
                    <div className="row ml-1 mb-2">
                        <form>
                            <table>
                                <tr>

                                    <td>
                                        <select className="form-control" asp-for="OrderState">
                                            <option value="">Všechny</option>
                                            @foreach (var item in Model.OrderStateViewModels)
                                            {
                                                <option value="@item.Id">@item.Name</option>
                                            }
                                        </select>
                                    </td>

                                    <td>
                                        <input className="form-control btn btn-secondary" type="submit"
                                               value="Vyhledat objednávky"/>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    */}
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
