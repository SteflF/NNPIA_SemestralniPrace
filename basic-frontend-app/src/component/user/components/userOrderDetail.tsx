import * as React from "react";
import UserSideMenu from "../../layout/userSideMenu";
import UserOrderedItem from "./orders/userOrderedItem";
import {IOrderItem} from "../../../apiModels/viewModels";
import {RouteComponentProps} from "react-router";
import {string, number} from "prop-types";
import http from "../../../service/httpService";
import {OrderCotroller_GetById, OrderItemController_GetByOrderId} from "../../../apiClient/routes";

type UserOrderDetailProps = RouteComponentProps<{ id: string }>;

class UserOrderDetail extends React.Component<UserOrderDetailProps>{
    state = {
        order: {
            id: null,
            userId: number,
            payment: string,
            state: string,
            deliveryMethod: string
        },
        orderItems: Array<IOrderItem>()
    };

    async componentDidMount() {
        const orderId = parseInt(this.props.match.params.id);
        const order = await http.get(OrderCotroller_GetById(orderId));
        const orderItems = await http.get(OrderItemController_GetByOrderId(orderId));

        this.setState({order: order.data.result});
        this.setState({orderItems: orderItems.data.result});
    }

    render() {
        const {order, orderItems} = this.state;

        if(order.id !== null){
            return(
                <React.Fragment>
                    <UserSideMenu />
                    <div className="col-lg-9">
                        <h2>Objednávka</h2>
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
                            <tr>
                                <td>Datum</td>
                                <td>{order.id}</td>
                                <td>{order.state}</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>

                        <h2>Položky objednávky</h2>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">&nbsp;</th>
                                <th scope="col">Název</th>
                                <th scope="col">Počet</th>
                                <th scope="col">Cena</th>
                            </tr>
                            </thead>
                            <tbody>
                                {orderItems.map(function (orderItem){
                                    return <UserOrderedItem orderItem={orderItem} key={orderItem.id}/>
                                })}
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            );
        }
        else{
            return null;
        }

    }
}

export default UserOrderDetail;
