const express = require("express");
const cors = require("cors");
const { listeningPort, publicFolder } = require("./config");
const Routes = require("./routes");
const Uploads = require("express-fileupload");
const path = require("path");

const app = express();
app.use(cors());
app.use("/" + publicFolder, express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Uploads())
app.use(Routes);
app.listen(listeningPort, () => console.log("Running on port " + listeningPort));