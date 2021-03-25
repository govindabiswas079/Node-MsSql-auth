const Router = require("express").Router();
const config = require("../config");
const Response = require("../classes/response");
const path = require("path");
const nanoid = require("nanoid").nanoid;
const fs = require("fs");

Router.post("/image", (req, res) => {
    let response = new Response();
    try {
        if (req.files && req.files.image.length === undefined) {
            img = req.files.image;
            let name = "img_" + nanoid(30) + path.extname(img.name)
            uploadPath = path.join(__dirname, '../uploads/products/images', name);
            img.mv(uploadPath);
            response.message = "file uploaded succesfully";
            response.data = { result: [{ url: config.domain + "/"+config.publicFolder+"/products/images/"  + name, name: img.name, size: img.size }] }
        }
        else {
            response.success = false;
            response.message = "No files uploaded, remember you can only upload 1";
            response.data = { errorMessage: "No files uploaded, remember you can only upload 1" }
        }
    } catch (error) {
        response.success = false;
        response.message = error.message;
        response.data = { errorMessage: "No files uploaded, " + error.message }
    }
    finally {
        res.json(response.Value());
    }
});
Router.post("/images",  (req, res) => {
    let response = new Response();
    try {
        if (req.files && req.files.images.length > 1) {
            images = req.files.images;
            let urls = [];
            for (let image of images) {
                let name = "img_" + nanoid(30) + path.extname(image.name);
                image.mv(path.join(__dirname, '../uploads/products/images/', name));
                urls.push(config.domain + "/"+config.publicFolder+"/products/images/"  + name);
            }
            response.message = "files uploaded succesfully";
            response.data = urls;
        }
        else {
            response.success = false;
            response.message = "No files uploaded, remember you have to upload more than 1";
        }
    } catch (error) {
        response.success = false;
        response.message = error.message;
    }
    finally {
        res.json(response.Value());
    }
});
Router.get("/images", (req, res) => {
    let images = [];
    let response = fs.readdirSync(path.join(__dirname, '../uploads/products/images'));
    for (let image of response) {
        images.push(
            {
                src: config.domain + "/"+config.publicFolder+"/products/images/" +image,
                name: "image",
                alt: "Product Image",
                tag: "Products"
            }
        )
    }
    res.json({ result: images });
});
Router.delete("/image/:name", (req, res) => {
    let response = new Response();
    try {
        let images = fs.readdirSync(path.join(__dirname, '../uploads/products/images'));
        let image = images.filter(name => name = req.params.name)[0];
        if (image != undefined) {
            fs.rmSync(path.join(__dirname, '../uploads/products/images/' + image));
            response.message = "Successfully deleted";
        }
        else {
            response.message = "File doesnt exist";
            response.success = false;
        }
    } catch (error) {
        response.message = error.message;
        response.success = false;
    }
    finally {
        res.json(response.Value());
    }
})
module.exports = Router;