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
import {PrivateRoute} from "../component/PrivateRoute";
import CreateOrder from "../component/user/components/createOrder";
import ProductForm from "../component/user/components/products/productForm";

const UserRoutes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={LoginComponent} />
                <Route path="/list-user" component={ListUserComponent} />
                <Route path="/registration" component={AddUserComponent} />
                <Route path="/edit-user" component={EditUserComponent} />

                <UserLayout>
                    <Route exact path="/products/cpu" component={ProductCategoryList} />
                    <Route exact path="/products/gpu" component={ProductCategoryList} />
                    <Route exact path="/products/motherboard" component={ProductCategoryList} />
                    <Route exact path="/product/:id" component={ProductDetail} />
                    <Route exact path="/newproduct" render={(props) => <ProductForm createProduct={true} {...props}/>} />
                    <Route exact path="/editproduct/:id" render={(props) => <ProductForm createProduct={false} {...props}/>} />
                    <Route exact path="/products" component={ProductList} />
                    <PrivateRoute exact path="/user/address" component={UserAddressForm} />
                    <PrivateRoute exact path="/user/orders" component={UserOrderList} />
                    <PrivateRoute exact path="/user/order/:id" component={UserOrderDetail} />
                    <PrivateRoute exact path="/user/changePassword" component={UserPasswordForm} />
                    <Route exact path="/user/shoppingcart" component={UserShoppingCart} />
                    <Route exact path="/user/createorder" component={CreateOrder} />
                </UserLayout>
            </Switch>
        </Router>
    )
}

export default UserRoutes;
