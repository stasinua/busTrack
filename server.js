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

// Set up server
var server = new meiligao.Server({timeout: 60000}).listen(5009, function(error) {
  if (error) {
    throw error;
  }
  console.log('gps server is listening');
});

// Handle server connections
server.on('connect', function(tracker) {
  console.log('tracker has connected');

  /**
   * Tracker events
   */
  // Tracker requested login (and it was confirmed)
  tracker.on('login', function(tracker) {
    console.log('tracker has logged in');
  });

  // Heartbeat packets
  tracker.on('heartbeat', function(tracker) {
    console.log('tracker sent heartbeat');
  });

  // Most useful thing: alarms & reports
  tracker.on('message', function(message, tracker) {
    console.log('tracker sent message: [' + meiligao.Message.getMessageTypeByCode(message.type) + ']', message);
  });

  // Useful for debugging
  tracker.on('packet.in', function(packet, tracker) {
    console.log('incoming packet:', packet.toString());
  });
  tracker.on('packet.out', function(packet, tracker) {
    console.log('outgoing packet:', packet.toString());
  });

  // Handle errors
  tracker.on('error', function(error, buffer) {
    console.log('error parsing message:', error, buffer);
  });

  // Handle disconnects
  tracker.on('disconnect', function() {
    console.log('tracker disconnected (tracker.disconnect)');
  });
});

// Handle disconnects
server.on('disconnect', function(tracker) {
  console.log('tracker disconnected (server.disconnect)');
});
