//var element = document.querySelector("#greeting");
//element.innerText = "Hello, world!";

function myGetRequest(){
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
   command.value = command.value + data.data;
   document.getElementById("logCommand").scrollTop = document.getElementById("logCommand").scrollHeight
   console.log('Data Received: ' + data.data);
});


//Transmit command on Enter KeyDown
document.getElementById("command").onkeydown = function() {
   if(event.key === 'Enter') {
     socket.emit('command', this.value);
     this.value = '';
   }
};

