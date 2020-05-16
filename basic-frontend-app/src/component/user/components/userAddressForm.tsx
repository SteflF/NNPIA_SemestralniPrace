import * as React from "react";
import UserSideMenu from "../../layout/userSideMenu";
import UserService from "../../../service/UserService";
import http from "../../../service/httpService";
import {AddressController_UpdateAddress} from "../../../apiClient/routes";
import Typography from "@material-ui/core/Typography";

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
        const userId = window.localStorage.getItem("userId");
        const address = await UserService.fetchUserById(userId);

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
        this.setState({messageAddress: resultA.data.message, messageUser: resultU.data.message});
}

    render() {
        const {user, messageAddress, messageUser} = this.state;

        return(
            <React.Fragment>
                <UserSideMenu />
                <div className="col-lg-9 mt-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="d-table">
                            <div className="d-table-row mt-4">
                                <div className="d-table-cell">
                                    <label>Jméno:&nbsp;</label>
                                    <input className="form-control" onChange={this.handleFirstNameChange} value={user.firstName} type="text"
                                           name="FirstName"/>
                                </div>
                                <div className="d-table-cell">
                                    <label>Příjmení:&nbsp;</label>
                                    <input className="form-control" onChange={this.handleLastNameChange} value={user.lastName} type="text"
                                           name="LastName"/>
                                </div>
                            </div>
                            <div className="d-table-row mt-4 mb">
                                <div className="d-table-cell">
                                    <label>Bydliště:&nbsp;</label>
                                    <input className="form-control" onChange={this.handleCityChange} value={user.address.city} type="text"
                                           name="City"/>
                                </div>
                                <div className="d-table-cell">
                                    <label>Ulice a č. p.:&nbsp;</label>
                                    <input className="form-control" onChange={this.handleStreetChange} value={user.address.street} type="text"
                                           name="Street"/>
                                </div>
                            </div>
                            <div className="d-table-row">
                                <div className="d-table-cell">
                                    <label>PSČ:&nbsp;</label>
                                    <input className="form-control" onChange={this.handlePSCChange} value={user.address.psc} type="text"
                                           name="PSC"/>
                                </div>
                                <div className="d-table-cell">
                                    <label>Stát:&nbsp;</label>
                                    <input className="form-control" value={user.address.country} name="Country"
                                           readOnly/>
                                </div>
                            </div>
                        </div>
                        <input className="btn btn-success mt-2 float-left" type="submit" value="Uložit"/>
                    </form>
                    <Typography variant="h6" style={styles.notification}>{messageUser}</Typography>
                    <Typography variant="h6" style={styles.notification}>{messageAddress}</Typography>
                </div>
            </React.Fragment>
        )
    }
}

const styles= {
    center :{
        display: 'flex',
        justifyContent: 'center'

    },
    notification: {
        display: 'flex',
        justifyContent: 'center',
        color: '#dc3545'
    }
}

export default UserAddressForm;
