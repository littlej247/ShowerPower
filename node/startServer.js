//Setup http Server and streaming socket
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Setup Serial Port Connection
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyUSB0');
const parser = new Readline();
port.pipe(parser);
//port.on('data', sendDataToWebClient);

server.listen(80)
//app.use(express.static('public'), function (req, res) { console.log('app.use called'); });


//**START Routing Table**
app.get('/command', function (req, res) {
  res.send('command routing executed: once');
  console.log('command routing executed');
  res.send('command routing executed: TWICE Baby!');
})

app.use(express.static('public'), function (req, res) { console.log('app.use called'); });
//**END Routing Table**



//Send data from Web client to USB
io.on('connection', function (socket) {

  port.on('data', sendDataToWebClient); //testing usb connection delay




  socket.emit('news', { data: '<connected to node>'});
  socket.on('my other event', function (data) {
    console.log('sending data from web client to USB: ' + data);
    port.write(data+'\r');
  });

});


//Send data from USB to web client
function sendDataToWebClient(data){
    data = data.toString();
    console.log('sending data from USB to web client: ' + data);
    io.sockets.emit('news', { data: data });
};
