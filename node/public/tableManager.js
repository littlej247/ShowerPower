var tableManager = {
  list: {
     global: {
        name: "Global Parameters",
        parameters: [
           {name: "mode",    description: "current MODE selected"},
           {name: "led",     description: "test led output"},
           {name: "hot",     description: "analog hot output for testing"}
        ]
     },
     preHeat: {
        name: "PreHeat System",
        parameters: [
           {name: "PDT",    description: "Pre-heat Default Temperature"},
           {name: "PWD",    description: "Pre-heat WatchDog timer in secconds"},
           {name: "PSI",    description: "PreHeat Sensor Input in volts from 0-5"},
           {name: "PST",    description: "PreHeat Sensor Tempratur as calculated in C"},
           {name: "PPO",    description: "PreHeat Pump Putput, 0 = OFF, 1 = ON"},
           {name: "PDT",    description: "Pre-heat Default Temperature"}
        ]
     }
  }, 
  drawTables: function() {
     var parCharts = document.getElementById("parCharts");
     for (var sys in this.list) {  //loop systems
        if (this.list.hasOwnProperty(sys)) {
         
           //Add Headline text for table
           var headline = document.createElement("H3");
           headline.innerHTML = this.list[sys].name;
           parCharts.appendChild(headline);

           //Build Inner HTML for TABLE
           var html = "      <tr> <th>Parameter</th> <th>Value</th> <th>Description</th> </tr> \n";
           for (var par in this.list[sys].parameters) {    //loop parameters
              if (this.list[sys].parameters.hasOwnProperty(par)) {  
                 html = html + "      <tr> <td>"+this.list[sys].parameters[par].name+"</td> <td id=\""+ this.list[sys].parameters[par].name +"\"></td>  <td>"+ this.list[sys].parameters[par].description +"</td> </tr> \n";
              }
           }
           var newElement = document.createElement("TABLE");
           newElement.innerHTML = html;
           parCharts.appendChild(newElement);
        }
     }
  },
  updateValue: function(Parameter, Value) {
     if (!! document.getElementById(Parameter)){
        var cell = document.getElementById(Parameter);
        cell.innerHTML = Value;
        var orig = cell.style.backgroundColor;
        cell.style.backgroundColor = '#64d323';
        setTimeout(function(){
           cell.style.backgroundColor = orig;
        }, 3000);
        return true;
     } else {
        return false;
     }
  }
};

