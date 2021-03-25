const Router = require("express").Router();
const db = require("../config").pool;
const Response = require("../classes/response");

Router.get("/frontend_data",
    async (req, res) => {
        let response = new Response();
        try {
                await db.connect();
                await db.request()
                    .input("array","1,2,3,4")
                    .execute("sp_System_Data").then(result => {
                        response.message="Data is ready";
                        response.data=result.recordset;
                    }).catch(err => {
                        response.success = false;
                        response.message = err; 
                    })
        } catch (err) {
            response.success = false;
            response.message = err.message;
        }
        finally {
            res.json(response.Value());
        }
    });
module.exports = Router;