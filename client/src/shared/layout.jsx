import React from 'react';
import Navbar from "./navbar"
import Context from "./context";
import Inactivity from "./inactivity";
const Layout = ({ children }) => {
    return (
        <Context.Consumer>
            {value =>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <Navbar />
                    </div>
                </div>
                {children}
                <Inactivity show={value.showInactivity} handleClose={value.closeInactivityModal} />
            </div>
        }</Context.Consumer>
    );
}
export default Layout;