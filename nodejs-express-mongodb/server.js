const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// body-parser helps to parse the request and create the req.body obj
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose.connect("mongodb+srv://zy-uu:hi123@cluster0.omcie.mongodb.net/localLibrary?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to the database")
}).catch(err => {
    console.log("Cannot connect to the database", err)
    process.exit();
}
);
require("./app/routes/turturial.routes")(app);

const PORT =  8080;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
