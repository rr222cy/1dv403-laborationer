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
        document.getElementById("messageSubmit").addEventListener("click", function()
                                { 
                                    messageBoard.messages.push(new Message(messageText.value, new Date()));
                                    messageBoard.renderMessages();
                                    messageBoard.messagesCounter(); 
                                }, false);
        
    },
    
    renderMessages: function()
    {
        // Raderar alla meddelanden från att presenteras.
        var messageArea = document.querySelector("#messageArea");
        messageArea.innerHTML = "";
        
        // Renderar alla meddelanden igen.
        for(var i = 0; i < messageBoard.messages.length; ++i)
        {
            messageBoard.renderMessage(i);
            messageBoard.messages[i].getText();
            
        }
    },
    
    renderMessage: function(messageID)
    {
        // Formaterar meddelandet så det ser ut på önskat vis.
        var messageBox = document.querySelectorAll("#messageArea");
        var messDiv = document.createElement("div");
        var messLink = document.createElement("a");
        var messLinkText = document.createTextNode(" Radera mess");
        var newMessText = document.createTextNode(messageBoard.messages[messageID].getText());
        
        // Skapar raderalänk för varje meddelande.
        messLink.appendChild(messLinkText);
        messLink.href = "#";
        messLink.className = "deleteMess";
        messLink.onclick = function () {
        messageBoard.removeMessage(messageID);
    }
        
        // Skapar meddelandetexten i sig och innehållande DIV-element för allting.
        messDiv.appendChild(newMessText);
        messDiv.appendChild(messLink);
        messDiv.className = "messageBox";
        messageBox[0].appendChild(messDiv);
    },
    
    removeMessage: function(messageID)
    {
        // Raderar valt meddelande från messages-arrayen.
        messageBoard.messages.splice(messageID,1);
        messageBoard.renderMessages();
        messageBoard.messagesCounter();         
    },
    
    messagesCounter: function()
    {
        // Räknar ut och presenterar antalet meddelanden.
        document.getElementById("messageCounter").innerHTML = "Antal meddelanden: " + messageBoard.messages.length;
    }
};

window.onload = function () {
    messageBoard.init();
};