/*************************************************************

You should implement your req handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require('url'),
  fs = require('fs'),
  results = [];

var requestHandler = function (req, res) {
  var path = url.parse(req.url).pathname;
  var getSuccess = 200;
  var postSuccess = 201;
  var notFound = 404;
  headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";



  //INDEX

  if (path === '/' && req.method === 'GET') {

    res.writeHead(getSuccess, headers);
    res.end("HELLO");

  //ROOMS

  } else if (path === '/classes/room1' && req.method === 'GET') {
    var data = JSON.stringify({
      results: results
    });
    res.writeHead(getSuccess, headers);
    res.end(data);

  } else if (path === '/classes/room1' && req.method === 'POST') {
    var roomString = '';
    req.on('data', function (data) {
      roomString += data;
    });
    req.on('end', function () {
      results.push(JSON.parse(roomString));
    });
    res.writeHead(postSuccess, headers);
    res.end();


  //MESSAGES

  } else if (path === '/classes/messages' && req.method == 'GET') {

    res.writeHead(getSuccess, headers);
    res.write(JSON.stringify({
      results: results
    }));
    res.end();

  } else if (path === '/classes/messages' && req.method === 'POST') {
    var messageString = '';
    req.on('data', function (data) {
      messageString += data;
    });
    req.on('end', function () {
      results.push(JSON.parse(messageString));
    });
    res.writeHead(postSuccess, headers);
    res.end();


  //IF IT HASN'T MATCHED YET, 404

  } else {

    res.writeHead(notFound, headers);
    res.end();

  }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;