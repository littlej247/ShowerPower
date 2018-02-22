var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80)
//app.use(express.static('public'), function (req, res) { console.log('app.use called'); });

app.get('/command', function (req, res) {
  res.send('command routing executed: once');
  console.log('command routing executed');
  res.send('command routing executed: TWICE Baby!');
})

app.use(express.static('public'), function (req, res) { console.log('app.use called'); });

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});



//var server = app.listen(80);
