const jwt = require("jsonwebtoken");
var config = require("../jwtconfig");
const db = require("../model");
var bcrypt = require("bcryptjs");
const User = db.user;

verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"];
    if(!token) {
        return res.status(403).send({message: 'No token provided'});
    }
    jwt.verify(token,config.key, (err,decoded) => {
        if(err) {
            return res.status(401).send({message: 'Unauthorized'})
        }
        req.userId = decoded.id;
        next();
    })
};

isAdmin = (req,res,next) => {
    User.findById(req,userId).exec((err,user) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }
        if(user.role === "管理员") {
            next();
            return;
        }
    })
}

const authJwt = {
    isAdmin,
    verifyToken
};

module.exports = authJwt;

