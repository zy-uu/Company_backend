const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req,res,next) => {
    User.findOne({
        username: req.body.username
    }).exec((err,user) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }
        if(user) {
            res.status(400).send({message: '用户名已存在'});
            return;
        }

        User.findOne({
            email: req.body.email
        }).exec((err,user) => {
            if(err) {
                res.status(500).send({message: err});
            }
            if(user) {
                res.status(400).send({message: '该邮箱已存在'});
                return;
            }
            next();
        })
    })
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp;