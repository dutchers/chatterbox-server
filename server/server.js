var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/chattrbox');

var Schema = mongoose.Schema;

var Message = mongoose.model('Message', {
  username: String,
  text: String,
  createdAt: Date,
  room: String
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('../client'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.route('/messages')
  .get(function (req, res) {
    Message.find({}, function (err, messages) {
      var results = [];

      messages.forEach(function (message) {
        results.push(message);
      });
      console.log(results);
      res.send(results);
    });
  })
  .post(function (req, res) {
    var message = new Message({
      username: req.body.username,
      text: req.body.text,
      createdAt: req.body.createdAt,
      room: req.body.room
    });
    message.save(function (err) {
      if (err) {
        console.log('oh god no!');
      } else {
        console.log(req.body.username + " said " + req.body.text);
      }

    });
  });

app.route('/rooms')
  .get(function (req, res) {
    res.send("get all rooms");
  })
  .post(function (req, res) {
    res.send('add a new room');
  });

app.route('rooms/:room')
  .get(function (req, res) {
    res.send(req.params.room);
    var room = req.params.room;
    Message.find({
      room: room
    }, function (err, messages) {
      var results = [];
      messages.forEach(function (message) {
        results.push(results);
      });
      res.send(results);
    });
  });



// app.route('/rooms/:room')
//   .get(function (req, res) {
//     res.send('load messages for that particular room');
//   });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Something is happening over there at http://%s:%s', host, port);
});