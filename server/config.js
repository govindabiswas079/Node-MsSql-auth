const _configuration = require("./config.json");
const mssql = require("mssql");
const nanoid = require("nanoid");
const jwt = require("jsonwebtoken");
const Response = require("./classes/response");
const { response } = require("express");

const pool = new mssql.ConnectionPool(_configuration.database);
const verifyToken = (req, res, next) => {
    let response = new Response();
    try {
        let bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            let bearer = bearerHeader.split(' ');
            let bearerToken = bearer[1];
            req.token = bearerToken;
            jwt.verify(bearerToken, config.authorization.secret, (err) => {
                if (err) {
                    response.success = false;
                    response.message = "You are not authorized";
                    res.json(response.Value());
                } else {
                    next();
                }
            });
        }
        else {
            response.success = false;
            response.message = "Forbidden";
            res.json(response.Value());
        }
    }
    catch (error) {
        response.success = false;
        response.message(error.message);
        res.json(response.Value());
    }
};
_configuration.authorization = {
    ..._configuration.authorization,
    verifyToken,
    generatePassword: nanoid
}
const config = {
    ..._configuration,
    pool: pool,
};
module.exports = config  