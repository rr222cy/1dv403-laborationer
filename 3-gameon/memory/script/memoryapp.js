/*jslint browser:true*/
"use strict";

var Memory = {
    
    // Håller reda på brickorna och dess värde, samt antalet gissningar.
    bricksArray: [],
    // Avser hålla reda på antalet brickor som vänts, fler än 2 samtidigt ska inte gå.
    bricksFlipped: [],
    // Håller reda på antalet gissningar.
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
        Memory.renderBoard();
    },
    
    renderBoard:function()
    {
        // k kommer i iterationen lyfta ut varje slumpat tal ur bricksArray[].
        var k = 0;
        
        for(var i = 0; i < Memory.rows; i++)
        {
            
            // Det jag gör här är att skjuta in antalet rader i min tabell jag valt att spelet skall ha.
            var tableRow = Memory.gameTable.insertRow();
            for(var j = 0; j < Memory.cols; j++)
            {   
                // Det jag gör här är att på varje rad skjuta in det antal kolumner jag valt att spelet skall ha per rad.
                var tableCell = tableRow.insertCell();
                
                // Här skapar jag en bricka som tilldelas ett sedan tidigare slumpat värde.                
                createBrick(Memory.bricksArray[k]);
                k++;
            }
        }
        
        // Funktion för att tillämpa en closure och verkligen få ut önskat värde ur varje iteration ovan.
        function createBrick(nr)
        {
            // Skapar brickorna och tilldelar dem värden.
            var brickImage = document.createElement("img");
            brickImage.src = "pics/0.png";
            brickImage.width = "24";
            brickImage.height = "24";
            brickImage.alt = "Bilden föreställer en utav memoryts spelbrickor";
            brickImage.id = nr;
            var brickLink = document.createElement("a");
            brickLink.href = "#";
            
            brickLink.onclick = function() 
            {
                console.log(nr);
                brickLink.onclick = null;
                // Vid klick byter jag ut "frågetecknet" mot rätt bild.
                brickImage.src = "pics/"+nr+".png";
                // Lägger till flippade brickan till arrayen som håller koll på matchningar och antalet flippade brickor.
                checkBrick(nr);
            };
            
            // Lägger min länk kring bilden och skjuter in allt i en kolumn.
            brickLink.appendChild(brickImage);               
            tableCell.appendChild(brickLink);
        }
        
        function checkBrick(nr)
        {
            // Skickar här in den klickade brickans värde i bricksFlipped-arrayen.
            Memory.bricksFlipped.push(nr);
            
            
            // Kollar här om vi fått 2 brickor klickade på, om ja så matchas de mot varandra.
            if(Memory.bricksFlipped.length >= 2)
            {
                // Kontrollerar om bricka 1 matchar bricka 2.
                if(Memory.bricksFlipped[0] === Memory.bricksFlipped[1])
                {
                    console.log("Brickorna matchar");
                    Memory.bricksFlipped.length = 0;
                }
                else
                {
                    console.log("Brickorna matchar ej");
                    Memory.bricksFlipped.length = 0;
                }
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