const Router = require("express").Router();
const { validationResult } = require("express-validator");
const db = require("../config").pool;
const config = require("../config").authorization;
const jwt = require("jsonwebtoken");
const Response = require("../classes/response");
const validateLogin = require("../validators/loginValidator");
const validateRegister = require("../validators/registerValidator");
const validateResetPassword = require("../validators/resetPasswordValidator");
Router.post("/login",
    validateLogin,
    async (req, res) => {
        let errors = validationResult(req);
        let response = new Response();
        try {
            if (!errors.isEmpty()) {
                response.success = false;
                response.message = errors.array();
            }
            else {
                let user = req.body;
                await db.connect();
                await db.request()
                    .input("username", user.username)
                    .input("password", user.password)
                    .output("result", 0)
                    .execute("sp_Authenticate").then(result => {
                        if (parseInt(result.output.result) == 1) {
                            response.data ={token:jwt.sign({username:user.username}, config.secret, { expiresIn: config.expiration, algorithm: config.algorithm })};
                            response.message = "Succesfully authenticated";
                        }
                        else {
                            response.success = false;
                            response.message = "Username/Email or Password dont match";
                        }
                    }).catch(err => {

                        response.success = false;
                        response.message = err;
                    })
            }
        } catch (err) {
            response.success = false;
            response.message = err.message;
        }
        finally {
            res.json(response.Value());
        }
    });
Router.post("/register",
    validateRegister,
    async (req, res) => {
        let errors = validationResult(req);
        let response = new Response();
        try {
            if (!errors.isEmpty()) {
                response.success = false;
                response.message = errors.array();
            } else {
                let user = req.body;
                await db.connect();
                await db.request()
                    .input("username", user.username)
                    .input("password", user.password)
                    .input("email", user.email)
                    .input("name", user.name)
                    .input("surname", user.surname)
                    .input("phone", user.phone)
                    .output("result", 0)
                    .execute("sp_Register").then(result => {
                        if (parseInt(result.output.result) == 1) {
                            response.message = "succesfully registered"
                        }
                        else {
                            response.success = false;
                            response.message = "This username / email is already in use";
                        }

                    }).catch(err => {
                        response.success = false;
                        response.message = err.message;
                    });
            }
        } catch (error) {
            response.success = false;
            response.message = error.message;
        }
        finally {
            res.json(response.Value());
        }
    });
    Router.post("/check_status",config.verifyToken,(req,res)=>{
        let response = new Response();
        response.message="You are authorized";
        res.json(response.Value());
    });
Router.post("/reset_password",
    validateResetPassword,
    (req, res) => {
        let errors = validationResult(req);
        let response = new Response();
        if (!errors.isEmpty()) {
            response.success = false;
            response.message = errors.array();
        } else {
            response.message = "Succesfully reseted the password";
        }
        res.json(response.Value());
    });
module.exports = Router;