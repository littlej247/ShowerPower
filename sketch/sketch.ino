const byte numChars = 32;
char receivedChars[numChars]; // an array to store the received data
const String inputNames[] = {};
volatile int inputValues[] = {0, 0, 0, 0, 0, 0, 0};  //array of pars 2=PSI


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
         
    } else if (par == "so1"){
        digitalWrite(7, val.toInt());
        Serial.println(par+"="+digitalRead(7));
        
    } else if (par == "so2"){
        digitalWrite(8, val.toInt());
        Serial.println(par+"="+digitalRead(8));
      
    } else if (par == "pre"){
        digitalWrite(12, val.toInt());
        Serial.println(par+"="+digitalRead(12));
        
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
  int PSIcurrent = analogRead(A7)/4;
  if (inputValues[2] < PSIcurrent-1 || inputValues[2] > PSIcurrent+1){
  //  inputValues[2] = PSIcurrent;  Serial.println("PSI="+String(PSIcurrent));
  //  delay(5);
  }
 
}

void loop() {                                        //LOOP
  recvWithEndMarker();
  parsInput();
  showNewData();
  updateIoInputs();

}

