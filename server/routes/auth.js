var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin } = require("../controllers/auth");


router.post('/signup',
    [
        check("phoneNumber", "phoneNumber is required").isMobilePhone(),
        check("email", "email is required").isEmail(),
        check("passowrd", "password must be strong").isLength({ min: 4 }),
        check("deviceid", "deviceid is required").isAlphanumeric(),
        
    ],

    signup
)

router.get('/signout', signout)

router.post('/signin',
    
    [
        check("phoneNumber", "phoneNumber is required").isMobilePhone(),
        check("passowrd","passowrd is required").isLength({min: 4})
    ],
    signin

)

module.exports = router