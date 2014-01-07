/*jslint browser:true*/
"use strict";

var Memory = {
    
    // Håller reda på brickorna och dess värde, samt antalet gissningar.
    bricksArray: [],
    bricksGuesses: 0,
    
    // Här ställer vi in hur många kolumner och rader spelet skall ha, satt till 2x2 här.
    cols: 4,
    rows: 4,
    
    // Referens till tabellen vi vill lägga brickorna (rader/kolumner) i
    gameTable: document.getElementById("gameTable"),
    
    init:function()
    {
        // Slumpar fram brickor genom RandomGenerator och skickar sedan in detta i bricksArray[]
        Memory.bricksArray = RandomGenerator.getPictureArray(Memory.cols, Memory.rows);
        console.log(Memory.bricksArray);
        
        for(var i = 0; i < Memory.rows; i++)
        {
            // Det jag gör här är att skjuta in antalet rader i min tabell jag valt att spelet skall ha.
            var tableRow = gameTable.insertRow();
            for(var j = 0; j < Memory.cols; j++)
            {
                // Det jag gör här är att på varje rad skjuta in det antal kolumner jag valt att spelet skall ha per rad.
                var tableCell = tableRow.insertCell();
                
                // Skapar brickorna och tilldelar dem värden.
                var brickImage = document.createElement("img");
                brickImage.src = "pics/0.png";
                brickImage.width = "24";
                brickImage.height = "24";
                brickImage.alt = "Bilden föreställer en utav memoryts spelbrickor";
                var brickLink = document.createElement("a");
                brickLink.href = "#";
                
                // Lägger min länk kring bilden och skjuter in allt i en kolumn.
                brickLink.appendChild(brickImage);               
                tableCell.appendChild(brickLink);
            }
        }
    },
    
    memoryMessage:function()
    {
        var memoryMessage = document.getElementById("memoryMessage");
        memoryMessage.innerHTML = "Think I lost my memory.";
    }
    
};

window.onload = function () {
    Memory.memoryMessage();
    Memory.init();
};