// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api/:date?", function (req, res) {
  const date = req.params.date;
  var d;
  if (!date) {
    d = new Date();
    return res.json({ unix: d.getTime(), utc: d.toUTCString() });
  }
  if (isNaN(date)) {
    d = new Date(date);
  } else {
    d = new Date(Number(date));
  }
  let output;
  if (d.toString() != "Invalid Date") {
    console.log("aaaa");
    output = {
      unix: d.getTime(),
      utc: d.toUTCString(),
    };
  } else {
    console.log("a");
    output = { error: d.toString() };
  }
  return res.json(output);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
