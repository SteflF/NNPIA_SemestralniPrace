import * as React from "react";
import { NavLink } from "react-router-dom"

class UserSideMenu extends React.Component{
    render() {
        return (
            <div className="col-lg-3">
                <h1 className="my-4">Nastavení</h1>
                <div className="list-group">
                    <NavLink to={'/user/address'} className="list-group-item">
                        Osobní údaje
                    </NavLink>
                    <NavLink to={'/user/orders'} className="list-group-item">
                        Objednávky
                    </NavLink>
                    <NavLink to={'/user/changePassword'} className="list-group-item">
                        Změnit heslo
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default UserSideMenu;
