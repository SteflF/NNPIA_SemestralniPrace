import * as React from "react";
import Header from "./layout/header";
import Footer from "./layout/footer";
import SideMenu from "./layout/sideMenu";

const UserLayout = (props: {children?: React.ReactNode}) => (
    <React.Fragment>
        <Header />
        <div className="container">
            <div className="row">
                <SideMenu />
                {props.children}
            </div>
        </div>
        <Footer />
    </React.Fragment>
);

export default UserLayout;
