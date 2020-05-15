import * as React from "react";
import { NavLink, Link } from "react-router-dom"

class SideMenu extends React.Component{
    state = {
        searchTerm: ""
    }

    handleSearchTermChange = (e: any): void => {
        this.setState({searchTerm: e.target.value});
    }

    render() {
        return (
            <div className="col-lg-3">
                <h1 className="my-4">Simple Shop</h1>
                <h6>Vyhledat produkt:</h6>
                <input className="btn-block mb-1" type="text" value={this.state.searchTerm} onChange={this.handleSearchTermChange} />
                <Link className="btn btn-dark mb-1"
                      to={{pathname: '/products', state: this.state.searchTerm}}>
                    Vyhledat
                </Link> | <Link className="btn btn-dark mb-1" to="/products" onClick={() => this.setState({searchTerm: ""})}>Všechny produkty</Link>
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
