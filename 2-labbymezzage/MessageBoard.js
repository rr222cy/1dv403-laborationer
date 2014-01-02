"use strict";

/* Lite "tankegångskod" jag tror kommer behöva användas 

// Skapar ny div för ett nytt meddelande, kommer slänga in denna i en loop förmodligen.
var messageDiv = document.createElement("div");
div.className = "messageBox";

// Hur jag tänker lite kring hur meddelandesändningsknappen kan tänkas fungera
var sendMessage = document.getElementById("messageSubmit");

sendMessage.onlick = function (e) {
e.preventDefault();
console.log("Tjolahopp, mess sänt!");
};

*/
var messageBoard = {
    
    messages: [],
    
    init:function(e)
    {
        // Skapar en variabel här för att slippa upprepa en massa kod, kan slänga på .value där det behövs.
        // Kör en addEventListener som kollar om man klickar på min skickaknapp, om så, pushas meddelandet + datum till messages-arrayen.
        var messageText = document.getElementById("messageBox");
        document.getElementById("messageSubmit").addEventListener("click", function(){ messageBoard.messages.push(new Message(messageText.value, new Date())); console.log(messageBoard.messages[0].getText()); }, false);
        
    }
};

window.onload = function () {
    messageBoard.init();
};