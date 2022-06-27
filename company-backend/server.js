const express = require("express");
const cors = require("cors");
const app = express();
var corsOption = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./model");

db.mongoose.connect("mongodb+srv://zy-uu:hi123@cluster0.omcie.mongodb.net/localLibrary?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connect to the mongoDB")
})
.catch(err => {
    console.log("Connection err", err);
    //! i dont know
    process.exit();
    //!
})

//! not really know 
require("./routes/auth.routes")(app);
//!


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });