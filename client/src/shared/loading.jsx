import React from 'react';
import Image from "../assets/loading.gif";
const Loading = (props) => {
    return (
        <div style={{ height: "100vh", width: "100vw" }} className="container-fluid">
            <div className="row align-items-center h-100">
                <div className="col">
                <img src={Image} className="mx-auto d-block" alt="Loading" />
                <p className="text-center">Loading...</p>
                </div>
            </div>
        </div>


    );
}
export default Loading;