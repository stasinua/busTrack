// var express = require('express');
// var path = require('path');
// var bodyParser = require('body-parser');
// var port = process.env.PORT || 4000;
// var app = express();
// app.use(bodyParser.json());
//
// app.get('*', function(req,res){
//   var request = {
//     query: req.query,
//     url: req.url
//   };
//   console.log("request",request);
//   console.log(req);
//   res.json({request: request});
// });
//
// app.listen(port);
// console.log("busTracker on " + port);
//
// module.exports = app;
var meiligao = require('meiligao');

var server = new meiligao.Server({
    timeout: 6000
}).listen(4000, function(error) {
    if (error) throw error;
    console.log('gps server is listening');
});

server.on('connect', function(tracker) {
    console.log('tracker connected!');
});
