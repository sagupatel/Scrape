
var express = require("express");
var mongoose = require("mongoose");
var db = require(".");
var cheerio = require("cheerio");
var axios = require("axios");
var app = express();

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrape";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

app.get("/", function (req, res) {
  db.scrape.find({}, function (error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

app.get("/scrape", function (req, res) {
  axios.get("https://www.nytimes.com/section/science").then(function (response) {
    var $ = cheerio.load(response.data);
    console.log("grabbing threads...");
    var results = [];

    $("div.css-10wtrbd").each(function (i, element) {
      console.log(element.children.children)

      var href = $(this)
        .find("h2")
        .find("a")
        .attr("href")

      var text = $(this)
        .find("h2")
        .find("a")
        .text()
      console.log("one", href, text)
    });
    res.send("Web scrape successfull");
  })
});




app.listen(3000, function () {
  console.log("App listening on port: 3000");
});

