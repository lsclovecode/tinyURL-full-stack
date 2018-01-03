var express = require('express');
var app = express();
var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var useragent = require('express-useragent');

mongoose.connect("mongodb://root:root@ds139067.mlab.com:39067/tinyurl2018", function(err){
	if (err) {
    console.log(err);
  } else {
    console.log("connected to db");
  }
});

app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/public', express.static(__dirname + "/public"));

app.use(useragent.express());
app.use("/api/v1", restRouter);
app.use('/', indexRouter);
app.use("/:shortUrl", redirectRouter);


app.listen(3000);