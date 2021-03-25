import React from 'react';
import DataTable from 'react-data-table-component';
import Layout from "../../shared/layout";
import Context from "../../shared/context";
import { Redirect } from 'react-router-dom';
const Pages = (props) => {
    return (
        <Context.Consumer> {value => value.isAuthorized?
            <Layout>
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center">Pages List</h3>
                    </div>
                    <div className="col-12">
                        <DataTable
                            data={[
                                { nombre: "el pepe", fecha: "1" }, { nombre: "el pepe", fecha: "2" }
                            ]}
                            columns={[
                                { name: "Nombre", selector: "nombre" },
                                { name: "Fecha", selector: "fecha" }
                            ]}
                            selectableRows
                            onSelectedRowsChange={(selectedRows) => {
                                console.log(selectedRows);
                            }}
                        />
                    </div>
                </div>
            </Layout>
            :<Redirect to="/login"/>
}
        </Context.Consumer>
    );
}
export default Pages;