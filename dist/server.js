"use strict";

require("dotenv").config(); // all other imports below here


var express = require('express');

var cors = require('cors');

var bodyParser = require('body-parser');

var path = require("path");

var routes = require('../routes'); // routes exist at ./routes in this file. on npm start build is run, and from the dist file where the app runs, routes is located at ../routes


var app = express();
var port = process.env.PORT || 8000;
app.use(express["static"](path.join(__dirname, "client", "build")));
app.use(bodyParser.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/api/sections', routes.sections);
app.use('/api/comments', routes.comments);
app.use('/api/related-articles', routes.relatedArticles);
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, function () {
  console.log("App running on port ".concat(port));
});