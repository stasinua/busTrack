var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 4000;
var app = express();
app.use(bodyParser.json());

app.get('*', function(req,res){
  var request = {
    query: req.query,
    url: req.url
  };
  console.log(request);
  res.json({request: request});
});

app.listen(port);
console.log("busTracker on " + port);

module.exports = app;
