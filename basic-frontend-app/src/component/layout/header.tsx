import * as React from "react";
import { Link, NavLink } from "react-router-dom"

class Header extends React.Component{
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
                                <NavLink className="nav-link" exact={true} to="/products">
                                    Produkty
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact={true} to="/cart">
                                    Kosik
                                </NavLink>
                            </li>
                            {localStorage.getItem("userInfo") !== null
                                ? <li className="nav-item">
                                    <NavLink className="nav-link" to="/user/address">
                                        Nastaveni
                                    </NavLink>
                                </li>
                                : ""}
                            <li className="nav-item">
                                {localStorage.getItem("userInfo") !== null
                                    ? <Link className="nav-link" to="/products" onClick={() => localStorage.clear()}>Odhlasit se</Link>
                                    : <Link className="nav-link" to="/">Prihlasit se</Link>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;