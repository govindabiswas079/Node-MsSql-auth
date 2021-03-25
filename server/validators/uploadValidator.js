const {checkSchema} = require("express-validator");
const Validate= checkSchema({
image:{
    exists:{
        errorMessage:"Image required"
    }
}
});
module.exports = Validate;