const byte numChars = 32;
char receivedChars[numChars]; // an array to store the received data
volatile int parValues[] = {0, 0, 0, 0, 0, 0, 0, 0};  //array of pars 2=PSI

const int MODE = 0; //current MODE selected. OFF, PRE:Pre-Heat, ONE:Shower head 1 ON, TWO:Shower head 2 ON, ALL:All shower heads on, TUB:Fill Tub
const int S1O = 1;  //Solenoind
const int S2O = 2;
const int S3O = 3;
const int S4O = 4;
const int S5O = 5;
const int PDT = 6;   //Pre-heat Default Temp in C
const int PWD = 7;   //Pre-heat Watchdog timer in secconds
const int PSI = 8;   //Pre-heat Sensor input
const int PST = 9;   //Pre-heat Sensor Tempratur as calculated in C
const int PPO = 10;  //Pre-heat PUMP output
//const int PDT = 11;  //Pre-head Default Temperature
const int MSI = 12;  //Mixer Sensor Input
const int MDF = 13;  //Mixer Desired Flow
const int MFI = 14;
const int MDT = 15;
const int MCC = 16;
const int MHC = 17;

boolean newData = false;

void setup() {                                       //SETUP
  Serial.begin(9600);
  Serial.println("<Arduino is ready>");
  

  //Pin D5:  Analog,  Hot mixing valve
  //Pin D6:  Analog,  Cold mixing valve
  pinMode(5, OUTPUT);    //  Analog, Hot mixing valve
  pinMode(6, OUTPUT);    //  Analog, Cold mixing valve
  pinMode(7, OUTPUT);    //  Digital, Showerhead 1
  pinMode(8, OUTPUT);    //  Digital, Showerhead 2
  pinMode(9, OUTPUT);    //  Digital, Spout
  pinMode(10, OUTPUT);   //  Digital, Body Jets 1
  pinMode(11, OUTPUT);   //  Digital, Body Jets 2
  pinMode(12, OUTPUT);   //  Digital, Pre-Heat Pump
  
}


void inputCommands(String par, String val) {
    if (par == "led"){
      //Serial.println("i'm reading!");
      if (val == par){
        Serial.println("<requested current value of: "+par+">");
        Serial.println(par+"="+digitalRead(12));
        
      } else {
        digitalWrite(12, val.toInt());
        Serial.println(par+"="+digitalRead(12));
        
      }
    } else if (par == "hot"){
         analogWrite(5, val.toInt());
         Serial.println(par+"="+analogRead(5));
         
    } else if (par == "cold"){
         analogWrite(6, val.toInt());
         Serial.println(par+"="+analogRead(6));
         
    } else if (par == "s1o"){
        digitalWrite(7, val.toInt());
        Serial.println("S1O="+String(digitalRead(7)));
        
    } else if (par == "s2o"){
        digitalWrite(8, val.toInt());
        Serial.println("S2O="+String(digitalRead(8)));
      
    } else if (par == "ppo"){
        //String output = "PPO=";
        digitalWrite(12, val.toInt());
        Serial.println("PPO="+String(digitalRead(12)));
        
    } else if (par == "ech"){
      Serial.println(val);
    } else {
      Serial.println("<Par not found!>");
    } 
}

void recvWithEndMarker() {
  static byte ndx = 0;
  char endMarker = '\n';  //\n for newline and \r for carriage return
  char rc;
  
  while (Serial.available() > 0 && newData == false) {
    rc = Serial.read();
    //Serial.print(rc,HEX);
    if (rc != endMarker) {
      receivedChars[ndx] = rc;
      ndx++;
      if (ndx >= numChars) {
        ndx = numChars - 1;
      }
    }
    else {
      receivedChars[ndx] = '\0'; // terminate the string
      ndx = 0;
      newData = true;
    }
  }
}
void parsInput(){
  if (newData == true) {
    String myString = receivedChars;
    int commaIndex = myString.indexOf("=");
    //  Search for the next comma just after the first
    int secondCommaIndex = myString.indexOf(';', commaIndex + 1);
  
    String firstValue = myString.substring(0, commaIndex);
    String secondValue = myString.substring(commaIndex + 1, secondCommaIndex);
    String thirdValue = myString.substring(secondCommaIndex + 1); // To the end of the string
    
    //Serial.println(firstValue);
    //Serial.println(secondValue);
    //Serial.println(thirdValue);
    
    inputCommands(firstValue, secondValue);
  }
}
void showNewData() {
  if (newData == true) {
    //Serial.print("This just in ... ");
    //Serial.println(receivedChars);
    newData = false;
  }
}

void updateIoInputs() {
  
  //read PreHeat Sensor Input
  int PSIcurrent = analogRead(A6);
  if (parValues[PSI] < PSIcurrent-1 || parValues[PSI] > PSIcurrent+1){
    parValues[PSI] = PSIcurrent;  Serial.println("PSI="+String(PSIcurrent));
  }
    
  //read PreHeat Sensor Input
  int MSIcurrent = analogRead(A7);
  if (parValues[ MSI ] < MSIcurrent-1 || parValues[ MSI ] > MSIcurrent+1){
    parValues[ MSI ] = MSIcurrent;  Serial.println("MSI="+String(MSIcurrent));
  }
 
}

void loop() {                                        //LOOP
  recvWithEndMarker();
  parsInput();
  showNewData();
  updateIoInputs();
  delay(100);
}

