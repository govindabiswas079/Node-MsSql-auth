const {checkSchema} = require("express-validator");
const Validate= checkSchema({
username:{
    exists:{
        errorMessage:"Username required",
    },
    isLength:{
        options:{
            max:30
        },
        errorMessage:"Username should be more less than 31 characters"
    }
},
password:{
    exists:{
        errorMessage:"Password required"
    },
    isLength:{
        options:{
            max:40
        },
        errorMessage:"Password should be more less than 41 characters"
    }
},
email:{
    exists:{
        errorMessage:"Email required"
    },
    isEmail:{
        errorMessage:"Email should be valid"
    },
    isLength:{
        options:{
            max:40
        },
        errorMessage:"Email should be more less than 41 characters"
    }
},
name:{
    isLength:{
        options:{
            max:30
        },
        errorMessage:"Name should be more less than 31 characters"
    }
},
surname:{
    isLength:{
        options:{
            max:30
        },
        errorMessage:"Surname should be more less than 31 characters"
    }
},
phone:{
    isMobilePhone:{
        errorMessage:"Phone should be valid"
    },
    isLength:{
        options:{
            min:8,
            max:8
        },
        errorMessage:"Phone should be 8 digits"
    }
},
});
module.exports = Validate;