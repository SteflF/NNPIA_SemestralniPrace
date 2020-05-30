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
            lastName: '',
            address: {
                id: null,
                country: '',
                city: '',
                street: '',
                psc: ''
            }
        },
        messageUser: '',
        messageAddress: ''
    }

    async componentDidMount(){
        const userId = localStorage.getItem("userId");
        const address = await UserService.fetchUserById(Number(userId));

        this.setState({user: address.data.result});
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
        const user = {...this.state.user};
        user.address.city = e.target.value;

        this.setState({user});
    }

    handleStreetChange = (e: any): void => {
        const user = {...this.state.user};
        user.address.street = e.target.value;

        this.setState({user});
    }

    handlePSCChange = (e: any): void => {
        const user = {...this.state.user};
        user.address.psc = e.target.value;

        this.setState({user});
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();
        const {user} = this.state;

        const updatedUser = {firstName: user.firstName, lastName: user.lastName};
        const updatedAddress = user.address;

        const resultA = await http.put(AddressController_UpdateAddress(user.address.id!), updatedAddress);
        const resultU = await UserService.editUser(updatedUser);

        if(resultA.data.status === 200 && resultU.data.status === 200){
            toast.success('Adresa uspesne zmenena!');
        }else{
            toast.error('Neco se nepovedlo!');
        }
    }

    render() {
        const { user } = this.state;

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
                                    <input className="form-control" onChange={this.handleCityChange} defaultValue={user.address.city} type="text" required maxLength={100} />
                                </div>
                                <div className="d-table-cell">
                                    <label>Ulice a č. p.:&nbsp;</label>
                                    <input className="form-control" onChange={this.handleStreetChange} defaultValue={user.address.street} type="text" required maxLength={100} />
                                </div>
                            </div>
                            <div className="d-table-row">
                                <div className="d-table-cell">
                                    <label>PSČ:&nbsp;</label>
                                    <input className="form-control" onChange={this.handlePSCChange} defaultValue={user.address.psc} type="text" required maxLength={15} />
                                </div>
                                <div className="d-table-cell">
                                    <label>Stát:&nbsp;</label>
                                    <input className="form-control" defaultValue={user.address.country} readOnly/>
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
