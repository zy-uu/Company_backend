const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.account = require("./account.model");
db.ROLES = ["user", "admin"];
module.exports = db;