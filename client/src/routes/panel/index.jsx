import React from 'react';
import Context from "../../shared/context";
import Layout from "../../shared/layout";
import { Link, Redirect } from 'react-router-dom';
const Index = ({ show, handleClose }) => {
    return (
        <Context.Consumer>
            {value =>
                value.isAuthorized ?
                    <Layout>
                        <div className="row">
                            <div className="col-12 text-center p-3">
                                <b><small>Welcome, Daniel</small></b>
                                <h3>What we doing today?</h3>
                            </div>
                            <div className="offset-1 col-10 offset-md-3 col-md-6">
                                <button className="btn btn-success m-2">Nueva Pagina</button>
                                <button className="btn btn-danger m-2">Nuevo Proyecto</button>
                                <button className="btn btn-warning m-2">Nuevo Producto</button>
                            </div>
                            <div className="col-12 text-center p-3">
                                <h3>Actualmente tienes</h3>
                            </div>
                                <div className="col-12 table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Paginas</th>
                                                <th>Productos</th>
                                                <th>Proyectos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-center" >
                                                <td>0</td>
                                                <td>2</td>
                                                <td>31</td>
                                            </tr>
                                            <tr className="text-center">
                                                <td><Link to="/panel/pages">See Pages</Link></td>
                                                <td>Ver Productos</td>
                                                <td>Ver Proyectos</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </Layout>
                    : <Redirect to="/login" />
            }
        </Context.Consumer>
    );
}
export default Index;