//-----functions for logCommand------//
var logCommand = {
   element: document.getElementById("logCommand"),

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
   }
}
//-----END functions for logCommand------//

