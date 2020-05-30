import * as React from "react";
import { RouteComponentProps } from 'react-router';
import UserService from "../../../service/UserService";
import http from "../../../service/httpService";
import { OrderController_CreateOrder, AddressController_CreateAddress, OrderItemController_CreateOrderItem } from "../../../apiClient/routes";
import {ILocalProduct} from "../../../apiModels/viewModels";

class CreateOrder extends React.Component<RouteComponentProps>{
    state = {
        user: {
            id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: ''
        },
        address: {
            city: '',
            street: '',
            psc: '',
            country: 'Česká republika'
        },
        deliveryMethod: 'dodani1',
        paymentMethod: 'platba1'
    }

    async componentDidMount() {
        const userId = localStorage.getItem("userId");

        if(userId !== null){
            const { data: user } = await UserService.fetchUserById(userId);

            this.setState({user: user.result, address: user.result.address})
        }
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();
        const { user, address, deliveryMethod, paymentMethod } = this.state;
        let localProducts = Array<ILocalProduct>();
        const result = localStorage.getItem("products");

        if(user.id === ''){
            const { data: addressResult } = await http.post(AddressController_CreateAddress, address);

            let newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                userAddressId: addressResult.result.id
            };

            const { data: userResult } = await UserService.addUser(newUser);

            let newOrder = {
                userId: userResult.result.id,
                payment: paymentMethod,
                state: 'Vytvoreno',
                deliveryMethod: deliveryMethod
            }

            const { data: orderResult } = await http.post(OrderController_CreateOrder, newOrder);

            if(result !== null){
                localProducts = JSON.parse(result);

                const saveOrderItem = async () => {
                    for (const product of localProducts){
                        let orderItem = {
                            productId: product.id,
                            orderId: orderResult.result.id,
                            price: product.price,
                            count: product.count
                        };

                        const { data: orderItemResult } = await http.post(OrderItemController_CreateOrderItem, orderItem);
                    }
                }

                await saveOrderItem();
            }
        }else{
            let newOrder = {
                userId: user.id,
                payment: paymentMethod,
                state: 'Vytvoreno',
                deliveryMethod: deliveryMethod
            }

            const { data: orderResult } = await http.post(OrderController_CreateOrder, newOrder);

            if(result !== null){
                localProducts = JSON.parse(result);

                const saveOrderItem = async () => {
                    for (const product of localProducts){
                        let orderItem = {
                            productId: product.id,
                            orderId: orderResult.result.id,
                            price: product.price,
                            count: product.count
                        };

                        const { data: orderItemResult } = await http.post(OrderItemController_CreateOrderItem, orderItem);
                    }
                }

                await saveOrderItem();
            }
        }

        localStorage.removeItem("products");
        this.props.history.push("/products");
    }

    handleDeliveryMethodChange = (e: any) => {
        this.setState({deliveryMethod: e.target.value});
    }

    handlePaymentMethodChange = (e: any) => {
        this.setState({paymentMethod: e.target.value});
    }

    handleFirstNameChange = (e: any) => {
        const user = {...this.state.user};
        user.firstName = e.target.value;

        this.setState({user});
    }

    handleLastNameChange = (e: any) => {
        const user = {...this.state.user};
        user.lastName = e.target.value;

        this.setState({user});
    }

    handlePhoneNumberChange = (e: any) => {
        const user = {...this.state.user};
        user.phoneNumber = e.target.value;

        this.setState({user});
    }

    handleEmailChange = (e: any) => {
        const user = {...this.state.user};
        user.email = e.target.value;

        this.setState({user});
    }

    handleCityChange = (e: any) => {
        const address = {...this.state.address};
        address.city = e.target.value;

        this.setState({address});
    }

    handleStreetChange = (e: any) => {
        const address = {...this.state.address};
        address.street = e.target.value;

        this.setState({address});
    }

    handlePSCChange = (e: any) => {
        const address = {...this.state.address};
        address.psc = e.target.value;

        this.setState({address});
    }

    render() {
        const { address, user, deliveryMethod, paymentMethod } = this.state;

        return (
            <div className="col-lg-9">
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 mb-4 mt-4">
                            <h4>Způsob dodání</h4>
                            <input className="ml-1" type="radio" value="dodani1" checked={deliveryMethod === 'dodani1'} onChange={(e) => this.handleDeliveryMethodChange(e)}/> Osobní odběr
                            <input className="ml-1" type="radio" value="dodani2" checked={deliveryMethod === 'dodani2'} onChange={(e) => this.handleDeliveryMethodChange(e)}/> Doručení námi
                            <h4>Typ platby</h4>
                            <input className="ml-1" type="radio" value="platba1" checked={paymentMethod === 'platba1'} onChange={(e) => this.handlePaymentMethodChange(e)} /> Dobírkou
                            <input className="ml-1" type="radio" value="platba2" checked={paymentMethod === 'platba2'} onChange={(e) => this.handlePaymentMethodChange(e)} /> Převodem
                            <input className="ml-1" type="radio" value="platba3" checked={paymentMethod === 'platba3'} onChange={(e) => this.handlePaymentMethodChange(e)} /> Při vyzvednutí
                        </div>
                    </div>
                    <div className="d-table">
                        <h4>Osobní údaje</h4>
                        <div className="d-table-row mt-4">
                            <div className="d-table-cell">
                                <label>Jméno:&nbsp;</label>
                                <input className="form-control" type="text" required={true} value={user.firstName} onChange={(e) => this.handleFirstNameChange(e)} />
                            </div>
                            <div className="d-table-cell">
                                <label>Příjmení:&nbsp;</label>
                                <input className="form-control" type="text" required={true} value={user.lastName} onChange={(e) => this.handleLastNameChange(e)} />
                            </div>
                        </div>
                        <div className="d-table-row">
                            <div className="d-table-cell">
                                <label>Telefon:&nbsp;</label>
                                <input className="form-control" type="tel" pattern="^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$" required={true} value={user.phoneNumber} onChange={(e) => this.handlePhoneNumberChange(e)} />
                            </div>
                            <div className="d-table-cell">
                                <label>Email:&nbsp;</label>
                                <input className="form-control" type="email" required={true} value={user.email} onChange={(e) => this.handleEmailChange(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="d-table mt-4">
                        <h4>Doručovací údaje</h4>
                        <div className="d-table-row mt-4">
                            <div className="d-table-cell">
                                <label>Město:&nbsp;</label>
                                <input className="form-control" type="text" required={true} value={address.city} onChange={(e) => this.handleCityChange(e)} />
                            </div>
                            <div className="d-table-cell">
                                <label>Ulice:&nbsp;</label>
                                <input className="form-control" type="text" required={true} value={address.street} onChange={(e) => this.handleStreetChange(e)} />
                            </div>
                        </div>
                        <div className="d-table-row">
                            <div className="d-table-cell">
                                <label>PSČ:&nbsp;</label>
                                <input className="form-control" type="text" required={true} value={address.psc} onChange={(e) => this.handlePSCChange(e)} />
                            </div>
                            <div className="d-table-cell">
                                <label>Stát:&nbsp;</label>
                                <input className="form-control" type="text" required={true} readOnly={true} value="Česká republika" />
                            </div>
                        </div>
                    </div>
                    <input className="btn btn-success mt-2" type="submit" value="Vytvořit objednávku"/>
                </form>
            </div>
        );
    }
}

export default CreateOrder;
