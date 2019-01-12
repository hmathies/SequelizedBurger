var express = require('express');
var bodyParser = require('body-parser');
var mysql = require("mysql2");
// Set Handlebars.
var exphbs = require("express-handlebars");
var db = require("./models");
require("dotenv").config();

var app = express();

var PORT = process.env.PORT|| 3000;
// Requiring our models for syncing

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    console.log("App listening on PORT ", PORT);
  });
});
