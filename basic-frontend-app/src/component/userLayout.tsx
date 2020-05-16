import * as React from "react";
import Header from "./layout/header";
import Footer from "./layout/footer";

const UserLayout = (props: {children?: React.ReactNode}) => (
    <React.Fragment>
        <Header />
        <div className="container min-vh-100">
            <div className="row">
                {props.children}
            </div>
        </div>
        <Footer />
    </React.Fragment>
);

export default UserLayout;
