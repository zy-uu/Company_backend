const { account } = require("../model");
const db = require("../model");
const Account = db.account;

exports.transferAccount = (req, res, next) => {
    const account = new Account({
        company2: req.body.company2,
        company1: req.body.company1,
        transferCard: req.body.transferCard,
        num: req.body.num,
        methods: req.body.methods,
    });
    account.save((err,account) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({
            message: '转账信息保存成功',
            code: 200,
            company2: account.company2,
            company1: account.company1,
            transferCard: account.transferCard,
            num: account.num,
            methods: account.methods,
        });
    })
    

}
