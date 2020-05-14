import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "../component/user/ListUserComponent";
import AddUserComponent from "../component/user/AddUserComponent";
import EditUserComponent from "../component/user/EditUserComponent";
import React from "react";
import LoginComponent from "../component/user/LoginComponent";
import ProductList from "../component/user/components/productList";
import UserLayout from "../component/userLayout";
import ProductDetail from "../component/user/components/productDetail";

const UserRoutes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={LoginComponent} />
                <Route path="/list-user" component={ListUserComponent} />
                <Route path="/add-user" component={AddUserComponent} />
                <Route path="/edit-user" component={EditUserComponent} />

                <UserLayout>
                    <Route path="/product/:id" component={ProductDetail} />
                    <Route path="/products" component={ProductList} />
                </UserLayout>
            </Switch>
        </Router>
    )
}

export default UserRoutes;
