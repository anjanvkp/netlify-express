const express = require("express");
const serverless = require("serverless-http");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = express.Router();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://anjan:indian@anjan-shard-00-00-01ifl.azure.mongodb.net:27017,anjan-shard-00-01-01ifl.azure.mongodb.net:27017,anjan-shard-00-02-01ifl.azure.mongodb.net:27017/NETLIFY?ssl=true&replicaSet=ANJAN-shard-0&authSource=admin&retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});



app.use(`/.netlify/functions/api`, router);

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/notes.routes")(app);
require("./app/routes/exp.route")(app);

module.exports = app;
module.exports.handler = serverless(app);
