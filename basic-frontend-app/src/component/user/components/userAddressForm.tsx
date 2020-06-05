import * as React from "react";
import UserSideMenu from "../../layout/userSideMenu";
import UserService from "../../../service/UserService";
import http from "../../../service/httpService";
import {AddressController_UpdateAddress} from "../../../apiClient/routes";
import {toast, ToastContainer} from "react-toastify";

class UserAddressForm extends React.Component{
    state = {
        user: {
            id: null,
            firstName: '',
            lastName: ''
        },
        address: {
            id: null,
            country: 'Česká republika',
            city: '',
            street: '',
            psc: ''
        },
        messageUser: '',
        messageAddress: ''
    }

    async componentDidMount(){
        const userId = localStorage.getItem("userId");
        const address = await UserService.fetchUserById(Number(userId));

        console.log("prijde: ", address);

        if(address.data.result.address === null){
            this.setState({user: address.data.result});
        }else{
            this.setState({user: address.data.result, address: address.data.result.address});
        }
    }

    handleFirstNameChange = (e: any): void => {
        const user = {...this.state.user};
        user.firstName = e.target.value;

        this.setState({user});
    }

    handleLastNameChange = (e: any): void => {
        const user = {...this.state.user};
        user.lastName = e.target.value;

        this.setState({user});
    }

    handleCityChange = (e: any): void => {
        const address = {...this.state.address};
        address.city = e.target.value;

        this.setState({address});
    }

    handleStreetChange = (e: any): void => {
        const address = {...this.state.address};
        address.street = e.target.value;

        this.setState({address});
    }

    handlePSCChange = (e: any): void => {
        const address = {...this.state.address};
        address.psc = e.target.value;

        this.setState({address});
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();
        const {user, address} = this.state;

        const updatedAddress = {
            id: null,
            firstName: user.firstName,
            lastName: user.lastName,
            country: address.country,
            city: address.city,
            street: address.street,
            psc: address.psc
        };

        console.log("posilam: ", updatedAddress);

        const result = await http.put(AddressController_UpdateAddress(user.id!), updatedAddress);

        console.log("server odpoved: ", result);

        if(result.data.status === 200){
            toast.success('Údaje úspěšně změněny!');
        }else{
            toast.error('Něco se nepovedlo!');
        }
    }

    render() {
        const { user, address } = this.state;

        return(
            <React.Fragment>
                <ToastContainer/>
                <UserSideMenu />
                <div className="col-lg-9 mt-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="d-table">
                            <div className="d-table-row mt-4">
                                <div className="d-table-cell">
                                    <label>Jméno:&nbsp;</label>
                                    <input className="form-control" onChange={this.handleFirstNameChange} defaultValue={user.firstName} type="text" required maxLength={100} />
                                </div>
                                <div className="d-table-cell">
                                    <label>Příjmení:&nbsp;</label>
                                    <input className="form-control" onChange={this.handleLastNameChange} defaultValue={user.lastName} type="text" required maxLength={100} />
                                </div>
                            </div>
                            <div className="d-table-row mt-4 mb">
                                <div className="d-table-cell">
                                    <label>Bydliště:&nbsp;</label>
                                    <input className="form-control" onChange={this.handleCityChange} defaultValue={address.city} type="text" required />
                                </div>
                                <div className="d-table-cell">
                                    <label>Ulice a č. p.:&nbsp;</label>
                                    <input className="form-control" onChange={this.handleStreetChange} defaultValue={address.street} type="text" required />
                                </div>
                            </div>
                            <div className="d-table-row">
                                <div className="d-table-cell">
                                    <label>PSČ:&nbsp;</label>
                                    <input className="form-control" onChange={this.handlePSCChange} defaultValue={address.psc} type="text" required />
                                </div>
                                <div className="d-table-cell">
                                    <label>Stát:&nbsp;</label>
                                    <input className="form-control" defaultValue={address.country} readOnly/>
                                </div>
                            </div>
                        </div>
                        <input className="btn btn-success mt-2 float-left" type="submit" value="Uložit"/>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default UserAddressForm;
