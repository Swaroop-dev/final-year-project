const User = require("../models/user")


exports.getUserById = (req, res, id, next) => {
    User.findById(id).exec((err, user) => {
        if (err) {
            res.status(403).json({
                error:'could not find the user with the given id'
            })
        }
        req.profile = user;
        next();
    })
}

exports.addCsv = (req, res) => {
    
}


