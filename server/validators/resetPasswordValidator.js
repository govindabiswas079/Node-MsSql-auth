const { checkSchema } = require("express-validator");
const Validate = checkSchema({
    user: {
        exists: {
            errorMessage: "Username or Email required"
        },
        isLength: {
            options: {
                max: 40
            },
            errorMessage: "Username or Email should be more less than 41 characters"
        }
    }
});
module.exports = Validate;