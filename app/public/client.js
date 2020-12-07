 tableManager.drawTables();  //Add Parameter Tables to Screen from JSON file

//Sending a GET request, although NOT used in this instance
/*
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
//Receiving a GET request, although NOT used in this instance
function myCallback(myMessage){
    console.log(myMessage);
}
*/

//Receiving data via socket.io
var socket = io.connect(window.location.href);
socket.on('news', function (data) {
   logCommand.newData(data.data);
   //console.log('Data Received: ' + data.data);
});

/*
//Transmit command on Enter KeyDown via socket.io
document.getElementById("command").onkeydown = function() {
   if(event.key === 'Enter') {
     if (this.value == 'help'){           //'help' Command
        logCommand.help();
        
     } else if (this.value == 'clear'){  //'clear' Command
        logCommand.clear();

     }else if (this.value == 'filter'){
        document.getElementById("filter").checked = !document.getElementById("filter").checked;
     }  else  {                         //else  forward command to node server.
        socket.emit('command', this.value);      
         
     }
     this.value = '';
   }
};

*/

//Disconnect Message
socket.on('disconnect', (reason) => {
   console.log("Disconnected from NODE.  Reason: " + reason);
   document.getElementById("connected").innerHTML = "Status: Disconnected from NODE.  Reason: " + reason;
   logCommand.add("Client: DISCONNECTED from NODE. Reason: " + reason + " \n");
});

//
socket.on('connect', () => {
   console.log("Connected to NODE.");
   document.getElementById("connected").innerHTML = "Status: Connected to NODE.";
   logCommand.add("Client: Connected to NODE.  :) \n");
});

socket.on('reconnecting', (attemptNumber) => {
	   console.log("Attempting to reconnect with NODE");
	   logCommand.add("Client: Attempting to reconnect to NODE. Attempt " + attemptNumber + " \n");
});







