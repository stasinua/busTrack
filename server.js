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
var http = require('http');

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
    var request = http.request(options, function(res) {
      var response = '';
      res.on('data', function (chunk) {
        response += chunk;
      });

      res.on('end', function () {
        Answer.findOneAndRemove({_id: req.params.answer_id})
        .exec(function (err, result) {
          if (err) {
            defer.reject(err);
          }
          else {
            if (result) {
              Comment.remove({answer_id: req.params.answer_id})
              .exec(function (err, commentResult) {
                if (err) {
                  defer.reject(err);
                }
                else {
                  defer.resolve({success: true, message: 'Answer successfully deleted!'});
                }
              });
            }
            else {
              defer.resolve({success: false, message: 'Answer not found'});
            }
          }
        });
      });
    });
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
    function hex2a(hexx) {
      var hex = hexx.toString();//force conversion
      var str = '';
      for (var i = 0; i < hex.length; i += 2)
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
    }
    console.log('Decoded buffer',hex2a(buffer.toString('hex')));
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
