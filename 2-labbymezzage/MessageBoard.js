"use strict";

var messageBoard = {
    
    messages: [],
    
    init:function(e)
    {
        // Skapar en variabel här för att slippa upprepa en massa kod, kan slänga på .value där det behövs.
        // Kör en addEventListener som kollar om man klickar på min skickaknapp
        // Om ja så pushas meddelandet + datum till messages-arrayen.
        var messageText = document.getElementById("messageBox");
        document.getElementById("messageSubmit").addEventListener("click", function()
                                {
                                    if(messageText.value === "")
                                    {
                                        alert("Skriv något innan du skickar!");
                                    }
                                    else
                                    {
                                        messageBoard.messages.push(new Message(messageText.value, new Date()));
                                        messageBoard.renderMessages();
                                        messageBoard.messagesCounter();
                                    }
                                    // Rensar textboxen så användaren slipper göra det.
                                    messageText.value = "";
                                }, false);
        // Denna lägger till en "lyssnare" som vid enterslag (utan att hålla inne shift) exekverar följande kod. Annars ignorerar den.
        messageText.addEventListener("keydown", function (e) {
            if ((e.keyCode === 13) && !e.shiftKey) {
                // Förhindrar att enterslag gör ny rad, utan att shift hålls inne
                e.preventDefault();
                if(messageText.value === "")
                {
                    alert("Skriv något innan du skickar!");
                }
                else
                {
                    messageBoard.messages.push(new Message(messageText.value, new Date()));
                    messageBoard.renderMessages();
                    messageBoard.messagesCounter();
                }
                // Rensar textboxen så användaren slipper göra det.
                messageText.value = "";
            }
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
        var messageBox = document.querySelector("#messageArea");
        var messDiv = document.createElement("div");
        var messP = document.createElement("p");
        var messPTime = document.createElement("p");
        var messDeleteLink = document.createElement("a");
        var messTimestampLink = document.createElement("a");
        var messDeletePic = document.createElement("img");
        var messTimePic = document.createElement("img");
        
        // Formaterar bilder korrekt.
        messDeletePic.src = "pics/rubbish-bin.png";
        messDeletePic.width = "16";
        messDeletePic.height = "16";
        messDeletePic.alt = "Ikon föreställande en soptunna";
        
        messTimePic.src = "pics/clock.png";
        messTimePic.width = "16";
        messTimePic.height = "16";
        messTimePic.alt = "Ikon föreställande en klocka";
        
        // Skapar raderalänk för varje meddelande.        
        messDeleteLink.href = "#";
        messDeleteLink.className = "deleteMess";
        messDeleteLink.onclick = function () {
            messageBoard.removeMessage(messageID);
        };
        
        // Skapar timestamplänk för varje meddelande.
        messTimestampLink.href = "#";
        messTimestampLink.className = "deleteMess";
        messTimestampLink.onclick = function () {
            alert(messageBoard.messages[messageID].getDateText());
        };
        
        // Skapar meddelandetexten i sig och innehållande DIV-element för allting.                
        messDiv.className = "messageBox";        
        messP.innerHTML = messageBoard.messages[messageID].getHTMLText();
        messPTime.className = "messageTime";
        messPTime.innerHTML = messageBoard.messages[messageID].getDate().toLocaleTimeString();
        
        messDeleteLink.appendChild(messDeletePic);
        messDiv.appendChild(messDeleteLink);       
        
        messTimestampLink.appendChild(messTimePic);
        messDiv.appendChild(messTimestampLink);
        
        messDiv.appendChild(messP);
        messDiv.appendChild(messPTime);
        messageBox.appendChild(messDiv);
    },
    
    removeMessage: function(messageID)
    {
        if(window.confirm("Vill du verkligen radera detta meddelande?"))
        {
            // Raderar valt meddelande från messages-arrayen.
            messageBoard.messages.splice(messageID,1);
            messageBoard.renderMessages();
            messageBoard.messagesCounter();        
        }
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