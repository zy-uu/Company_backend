const config = require("../jwtconfig");
const db = require("../model");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req,res,next) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8),
        role: req.body.role
    });
    user.save((err,user) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }
        
        res.status(200).send({
            message: '注册成功',
            code: 200,
            user: user
        })
    })

} 

exports.signin = (req,res,next) => {
    User.findOne({
        email: req.body.email
    }).exec((err,user) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }
        if(!user) {
            return res.status(404).send({message: '该用户不存在'})
        }
        var passwordIsvalid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsvalid) {
            return res.status(401).send({
                accessToken: null,
                message: '密码错误',
            });
        }
        var token = jwt.sign({id: user.id},config.key,{
            expiresIn: 86400  //24h
        });
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            accessToken: token,
            code: 200
        })

    })
}