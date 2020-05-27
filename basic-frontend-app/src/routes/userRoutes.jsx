import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "../component/user/ListUserComponent";
import AddUserComponent from "../component/user/AddUserComponent";
import EditUserComponent from "../component/user/EditUserComponent";
import React from "react";
import LoginComponent from "../component/user/LoginComponent";
import ProductList from "../component/user/components/productList";
import UserLayout from "../component/userLayout";
import ProductDetail from "../component/user/components/productDetail";
import ProductCategoryList from "../component/user/components/productCategoryList";
import UserAddressForm from "../component/user/components/userAddressForm";
import UserOrderList from "../component/user/components/userOrderList";
import UserPasswordForm from "../component/user/components/userPasswordForm";
import UserOrderDetail from "../component/user/components/userOrderDetail";
import UserShoppingCart from "../component/user/components/userShoppingCart";

const UserRoutes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={LoginComponent} />
                <Route path="/list-user" component={ListUserComponent} />
                <Route path="/add-user" component={AddUserComponent} />
                <Route path="/edit-user" component={EditUserComponent} />

                <UserLayout>
                    <Route exact path="/products/cpu" component={ProductCategoryList} />
                    <Route exact path="/products/gpu" component={ProductCategoryList} />
                    <Route exact path="/products/motherboard" component={ProductCategoryList} />
                    <Route exact path="/product/:id" component={ProductDetail} />
                    <Route exact path="/products" component={ProductList} />
                    <Route exact path="/user/address" component={UserAddressForm} />
                    <Route exact path="/user/orders" component={UserOrderList} />
                    <Route exact path="/user/order/:id" component={UserOrderDetail} />
                    <Route exact path="/user/changePassword" component={UserPasswordForm} />
                    <Route exact path="/user/shoppingcart" component={UserShoppingCart} />
                </UserLayout>
            </Switch>
        </Router>
    )
}

export default UserRoutes;
