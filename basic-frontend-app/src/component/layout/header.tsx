import * as React from "react";
import { Link, NavLink } from "react-router-dom"

class Header extends React.Component{
    handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userInfo");
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="https://moon.fish/">MoonFish, s.r.o.</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact={true} to={{pathname: '/products', state: ''}}>
                                    Produkty
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact={true} to="/user/shoppingcart">
                                    Košík
                                </NavLink>
                            </li>
                            {localStorage.getItem("userInfo") !== null
                                ? <li className="nav-item">
                                    <NavLink className="nav-link" to="/user/address">
                                        Nastavení
                                    </NavLink>
                                </li>
                                : ""}
                            <li className="nav-item">
                                {localStorage.getItem("userInfo") !== null
                                    ? <Link className="nav-link" to="/products" onClick={this.handleLogout}>Odhlásit se</Link>
                                    : <Link className="nav-link" to="/">Přihlásit se</Link>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;