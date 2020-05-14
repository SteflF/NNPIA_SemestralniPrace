import * as React from "react";
import { NavLink } from "react-router-dom"

class SideMenu extends React.Component{
    render() {
        return (
            <div className="col-lg-3">
                <h1 className="my-4">Hokus Pokus</h1>
                <div className="list-group">
                    <NavLink to={{
                        pathname: '/products/cpu',
                        state: 'CPU'
                    }} className="list-group-item">
                        CPU
                    </NavLink>
                    <NavLink to={{
                        pathname: '/products/gpu',
                        state: 'GPU'
                    }} className="list-group-item">
                        GPU
                    </NavLink>
                    <NavLink to={{
                        pathname: '/products/motherboard',
                        state: 'Motherboard'
                    }} className="list-group-item">
                        Motherboard
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default SideMenu;
