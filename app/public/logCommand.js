//-----functions for logCommand------//
var logCommand = {
   element: document.getElementById("logCommand"),
   command: document.getElementById("command"),
   start: function(){
      this.element.onclick = function(){ document.getElementById("command").focus();  }; 
      this.command.onkeydown = this.keyDown;
   },	
   buffer: "",

   commandHistory: [],

   add: function(text){ //adds a line of text to the log
      logCommand.element.value = logCommand.element.value + text;
      logCommand.element.scrollTop = logCommand.element.scrollHeight //scroll down the log  
   },
   clear: function() {  logCommand.element.value = '';}, //clears the text in the log

   help: function() { //display HELP text in the log
         this.element.value = this.element.value
         + ' *** CLI HELP *** \n'
         + '+ -- LOCAL -- \n'
         + 'type \'help\'   to get this menu.  \n'
         + '\'clear\'       to clear the command text area. \n'
         + '\'filter\'      toggle the filter option to display parameter values in the command log. \n'
         + '\n'
         + '+ -- REMOTE -- \n'
         + '\'<par>\'       requests the current value of the parameter from the arduino.  \n'
         + '\'<par>=<val>\' sets the parameter to the specific value and requests that the arduino respond with the new value after it is set.  \n'
         + '\'ech=<val>\'   will request the arduino to echo the value back to this terminal.  \n'
         + '\'refresh\'     requests the arduino to send the status of all parameters \n';
           
        logCommand.element.scrollTop = logCommand.element.scrollHeight;
   },
   newData: function(newData) {
      var buffer = this.buffer;
      buffer = buffer + newData; 
      console.log("New Data: " + newData);
      console.log("Buffer Start: " + buffer);

      var arr = buffer.split(String.fromCharCode(10)); //Dec Char code for NewLine,Removes the \n but keeps the \r to be used to <br> the feed up
      
	//   console.log("array length: " + arr.length);
      var originalLength = arr.length;
      //Loop through all the 
      for (i = originalLength; i > 1; i--){
      //  console.log("length = " + arr.length);
        //publish("first Command = "+ arr.shift());  //gets the first command and removes it from the array
         var currentCommand = arr.shift();
         var splitCommand = currentCommand.split("=");

         //publish command in buffer
         var updated = tableManager.updateValue(splitCommand[0],splitCommand[1]);
         if (!document.getElementById("filter").checked || !updated){
            logCommand.add(currentCommand); 
         }
        
      }
      this.buffer = arr.toString(); 
      console.log("Buffer Stop: \"" + this.buffer + "\"");

   },
   keyDown: function() {
   //Transmit command on Enter KeyDown via socket.io
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
      } else if (event.key === 'ArrowUp'){
	 console.log("code for last command here");
      }
   }
}

logCommand.start();


//-----END functions for logCommand------//

