const byte numChars = 32;
char receivedChars[numChars]; // an array to store the received data

boolean newData = false;

void setup() {
  Serial.begin(9600);
  Serial.println("<Arduino is ready>");
  
  pinMode(12, OUTPUT);
}

void loop() {
  recvWithEndMarker();
  parsInput();
  showNewData();
}

void recvWithEndMarker() {
  static byte ndx = 0;
  char endMarker = '\r';  //\n for newline and \r for carriage return
  char rc;
  
  while (Serial.available() > 0 && newData == false) {
    rc = Serial.read();
    Serial.print(rc,HEX);
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
    Serial.print("This just in ... ");
    Serial.println(receivedChars);
    newData = false;
  }
}

void inputCommands(String par, String val) {
    if (par == "led"){
      //Serial.println("i'm reading!");
      digitalWrite(12, val.toInt());
    } else if (par == "ech"){
    Serial.println(val);
    } else {
      Serial.println("Par not found!");
    } 
}
