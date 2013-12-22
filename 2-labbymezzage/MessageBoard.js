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
    
    init:function()
    {
        var mess = new Message("Tjolahopp!", new Date());
        alert(mess);
        alert(mess.getText());
        mess.setText("Tengil, vår befriare!");
        alert(mess);
    }
};

window.onload = function () {
    messageBoard.init();
};