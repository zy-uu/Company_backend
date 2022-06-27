const db = require("../model");
const User = db.user;

exports.updateProfileInfo = (req, res, next) => {
    User.updateOne({ email: req.body.email }, {
        $set: {
            username: req.body.username,
            phone: req.body.phone,
            name: req.body.name
        }
    }).then(doc => {
        if (doc.matchedCount) {
            console.log(`已找到${doc.matchedCount}个条件`);
        }
        if (doc.modifiedCount) {
            console.log(`已修改${doc.modifiedCount}个条件`);
        }

        User.findOne({ email: req.body.email }).exec((err, user) => {
            if (err) {
                res.status(500).send(err);
            }
            if (!user) {
                res.status(404).send({
                    message: 'not found',
                    code: 404
                });
            }

            res.status(200).send({
                user: user,
                code: 200
            });

        });
    })
        .catch(err => {
            console.log("modify doc err", err)
        })
};

exports.getProfileInfo = (req, res, next) => {
    var id = req.params.id;
    User.findOne({ _id: id }).exec((err, user) => {
        //* have check it , user is an obj
        if (err) {
            res.status(500).send({
                message: err,
                code: 500
            });
            return;
        }
        if(!user) {
            res.status(404).send({
                message: 'not found by userId',
                code: 404
            })
        }
        res.status(200).send({
            code: 200,
            user: user
        })
    })
}