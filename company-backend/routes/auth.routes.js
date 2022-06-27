const {verifySignUp} = require("../middlewares");

const controllerAuth = require("../controllers/auth.controller");

// controllerAccount
const controllerAccount = require("../controllers/account.controller");
//

//controllerProfile
const controllerProfile = require("../controllers/profile.controller");
//

module.exports = function(app) {
    app.use(function (req,res,next) {
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/signup",
     [verifySignUp.checkDuplicateUsernameOrEmail],
     controllerAuth.signup
    );

    app.post("/signin",controllerAuth.signin);

    app.post("/app/account", controllerAccount.transferAccount);

    app.post("/app/profile",controllerProfile.updateProfileInfo);

    app.get("/app/profile/:id",controllerProfile.getProfileInfo);


}