import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Context from "../../shared/context";
import Layout from "../../shared/layout";
const Login = (props) => {
    const [state,setState] = useState({
        username:"",
        password:""
    })
    return (
        <Context.Consumer>
            {value =>!value.isAuthorized?
            <Layout>
                <div className="row">
                    <div className="offset-md-4 col-md-4">
                        <div className="mb-3">
                            <label className="form-label">Username/Email</label>
                            <input className="form-control" value={state.username} placeholder="Put in your username / email" onChange={(e)=>{
                                    let handler = {...state};
                                    handler.username = e.target.value;
                                    setState(handler); 
                            }}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input className="form-control" value={state.password} type="password" onChange={(e)=>{
                                    let handler = {...state};
                                    handler.password = e.target.value;
                                    setState(handler); 
                            }}/>
                        </div>
                        <div className="mb-3 d-flex justify-content-center">
                            <input className="btn btn-primary" type="submit" value="Log In" onClick={()=>{
                                value.authorize(state);
                            }}/>
                        </div>
                    </div>
                </div>
        </Layout>
                :<Redirect to="/panel"/>
            }
        </Context.Consumer>
    );
}
export default Login;