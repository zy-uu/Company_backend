const mongoose = require("mongoose");

const Account = mongoose.model("Account", new mongoose.Schema({
    companyName2: String,
    companyName1: String,
    TransferCard: Number,
    transferNum: Number,
    payMethods: String,
    detail: String,
    address: String
}));

module.exports = Account;