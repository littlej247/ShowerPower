//var element = document.querySelector("#greeting");
//element.innerText = "Hello, world!";

function myGetRequest()
{
    theUrl = window.location.href + 'command';
    callback = myCallback();

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            myCallback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);

}

function myCallback(myMessage){
    console.log(myMessage);
}



  var socket = io.connect(window.location.href);
  socket.on('news', function (data) {
var command = document.getElementById('logCommand');
   command.value = command.value + '\n' + data.data;
   console.log('Data Received: ' + data.data);

   // socket.emit('my other event', 'led');  //send io status request for led on connection
  });


//Transmit command on button click
document.getElementById("sendCommand").onclick = function() {
   var command = document.getElementById('command');
   socket.emit('my other event', command.value);
   command.value = '';
   command.focus();

};

