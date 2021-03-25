const Router = require("express").Router();
const AuthenticationController = require("./controllers/authentication");
const SystemController = require("./controllers/system");
const UploadsController = require("./controllers/uploads");
Router.use(AuthenticationController);
Router.use("/system",SystemController);
Router.use("/upload",UploadsController);
module.exports = Router;