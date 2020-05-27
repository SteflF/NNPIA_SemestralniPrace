import * as React from "react";
import UserSideMenu from "../../layout/userSideMenu";

class UserPasswordForm extends React.Component{
    render() {
        return(
            <React.Fragment>
                <UserSideMenu />
                <div className="col-lg-9 mt-4">
                    <form asp-controller="User" asp-action="Password" method="post">
                        <div className="d-table-row">
                            <label>Stávající heslo:&nbsp;</label>
                            <br />
                            <input className="form-control" asp-for="CurrentPassword" name="CurrentPassword" type="password" />
                            <span className="text-danger" asp-validation-for="CurrentPassword"></span>
                        </div>
                        <div className="d-table-row">
                            <label>Nové heslo:&nbsp;</label>
                            <input className="form-control" asp-for="NewPassword" name="NewPassword" type="password" />
                            <span className="text-danger" asp-validation-for="NewPassword"></span>
                        </div>
                        <div className="d-table-row">
                            <label>Nové heslo znovu:&nbsp;</label>
                            <input className="form-control" asp-for="ConfirmPassword" name="ConfirmPassword" type="password" />
                            <span className="text-danger" asp-validation-for="ConfirmPassword"></span>
                        </div>
                        <input className="btn btn-success mt-2" type="submit" value="Změnit heslo" />
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default UserPasswordForm;
