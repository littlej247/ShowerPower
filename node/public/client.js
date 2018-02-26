 tableManager.drawTables();  //Add Parameter Tables to Screen from JSON file

//Sending a GET request, although NOT used in this instance
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


//Receiving data via socket.io
var socket = io.connect(window.location.href);
socket.on('news', function (data) {
   var splitData = data.data.split("=",2);
   var updated = tableManager.updateValue(splitData[0],splitData[1]);
   if (!document.getElementById("filter").checked || !updated ){
       logCommand.add(String(data.data));
   }
   console.log('Data Received: ' + data.data);

});

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

