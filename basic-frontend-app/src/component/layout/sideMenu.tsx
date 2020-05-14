import * as React from "react";

class SideMenu extends React.Component{
    render() {
        return (
            <div className="col-lg-3">
                <h1 className="my-4">Shop Name</h1>
                <div className="list-group">
                    <a href="#" className="list-group-item">CPU</a>
                    <a href="#" className="list-group-item">GPU</a>
                    <a href="#" className="list-group-item">Motherboards</a>
                </div>
            </div>
        );
    }
}

export default SideMenu;
