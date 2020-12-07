//Setup http Server and streaming socket
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Setup Serial Port Connection
const SerialPort = require('serialport');
//const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyUSB0',{
  baudRate: 9600,	
  // parser: new SerialPort.parsers.Readline('\r\n')
});
//const parser = new Readline();
//port.pipe(parser);
port.on('data', sendDataToWebClient);

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

// Open errors will be emitted as an error event
 port.on('error', function(err) {
   console.log('SearialPort Error: ', err.message)
   })   

//Send data from Web client to USB
io.on('connection', function (socket) {

  //port.on('data', sendDataToWebClient); //testing usb connection delay

  io.sockets.emit('news', { data: 'NODE: Connection established with web web client\r\n'});
  socket.on('command', function (data) {
    console.log('sending data from web client to USB: ' + data);
    port.write(data+'\n');
  });

});


//Send data from USB to web client
function sendDataToWebClient(data){
  setTimeout(function(){
       data = data.toString();
       console.log('sending data from USB to web client: ' + data);
       io.sockets.emit('news', { data: data });
     },1000
  )

};
