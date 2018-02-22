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



  var socket = io.connect('http://192.168.86.219/');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
