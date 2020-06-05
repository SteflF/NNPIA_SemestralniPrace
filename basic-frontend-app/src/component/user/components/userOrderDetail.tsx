import * as React from "react";
import UserSideMenu from "../../layout/userSideMenu";
import UserOrderedItem from "./orders/userOrderedItem";
import {IOrderItem} from "../../../apiModels/viewModels";
import {RouteComponentProps} from "react-router";
import {string, number} from "prop-types";
import http from "../../../service/httpService";
import {OrderCotroller_GetById, OrderItemController_GetByOrderId} from "../../../apiClient/routes";
import UserOrderDetailHeader from "./orders/userOrderDetailHeader";

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

        this.setState({order: order.data.result, orderItems: orderItems.data.result});
    }

    render() {
        const {order, orderItems} = this.state;

        if(order.id !== null){
            return(
                <React.Fragment>
                    <UserSideMenu />
                    <div className="col-lg-9">
                        <UserOrderDetailHeader order={{id: Number(order.id), state: order.state.toString()}}/>

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
