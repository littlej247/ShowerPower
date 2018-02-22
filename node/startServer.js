var express = require('express');
var app = express();

//app.use(express.static('public'), function (req, res) { console.log('app.use called'); });

app.get('/command', function (req, res) {
  res.send('command routing executed: once');
  console.log('command routing executed');
  res.send('command routing executed: TWICE Baby!');
})

app.use(express.static('public'), function (req, res) { console.log('app.use called'); });
//setting middleware
//app.use(express.static(__dirname + '/public')); //Serves resources from public folder
/*
app.use('/', function (req, res, next) {
  console.log('Time:', Date.now());
  console.log('Request.method: ' + req.method);
 // console.log(JSON.stringify(req.body))
  console.log('Request.originalUrl: ' + req.originalUrl);
  res.send(express.static(__dirname + '/public'));

next();
})
*/




var server = app.listen(8080);
