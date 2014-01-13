/*jslint browser:true*/
"use strict";

var Memory = {
    
    // Håller reda på brickorna och dess värde, samt antalet gissningar.
    bricksArray: [],
    // Avser hålla reda på antalet brickor som vänts, fler än 2 samtidigt ska inte gå.
    bricksFlipped: [],
    // Håller reda på antalet gissningar.
    bricksGuesses: 0,
    // Håller reda på antalet par.
    bricksPair: 0,
    
    // Här ställer vi in hur många kolumner och rader spelet skall ha, satt till 2x2 här.
    cols: 4,
    rows: 4,
    
    // Referens till tabellen vi vill lägga brickorna (rader/kolumner) i
    gameTable: document.getElementById("gameTable"),
    
    init:function()
    {
        // Slumpar fram brickor genom RandomGenerator och skickar sedan in detta i bricksArray[]
        Memory.bricksArray = RandomGenerator.getPictureArray(Memory.cols, Memory.rows);
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
            var brickLink = document.createElement("a");
            brickLink.href = "#";
            brickLink.id = nr;
            // Lägger min länk kring bilden och skjuter in allt i en kolumn.
            brickLink.appendChild(brickImage);               
            tableCell.appendChild(brickLink);
            
            // Anropar min funktion för att flippa brickan, samt kontrollera att brickan inte redan skiftats.
            flipBrick(brickLink, brickImage, nr);            
        }
        
        function flipBrick(brickLink, brickImage, nr)
        {
            brickLink.onclick = function() 
            {   
                // Kollar här om min bild är frågetecknet "pics/0.png" om TRUE så ska brickan kunna vändas, annars inte.
                if(brickImage.getAttribute("src") === "pics/0.png")
                {
                    // Vid klick byter jag ut "frågetecknet" mot rätt bild.
                    brickImage.src = "pics/"+nr+".png";
                    brickImage.className = "justFlipped";
                    
                    // Anropar funktionen för att kolla om vi får ett par eller inte.
                    checkBrick(nr);
                }
                return false;
            };
        }
        
        function checkBrick(nr)
        {   
            // Skickar här in den klickade brickans värde i bricksFlipped-arrayen.
            Memory.bricksFlipped.push(nr);
            var justFlipped = document.querySelectorAll(".justFlipped");
            
            // Kollar här om vi fått 2 brickor klickade på, om ja så matchas de mot varandra.
            if(Memory.bricksFlipped.length >= 2)
            {
                // Kontrollerar om bricka 1 matchar bricka 2.
                if(Memory.bricksFlipped[0] === Memory.bricksFlipped[1])
                {
                    console.log("Brickorna matchar");
                    justFlipped[0].className = "justFlippedRight";
                    justFlipped[1].className = "justFlippedRight";
                    Memory.bricksFlipped.length = 0;
                }
                else
                {
                    console.log("Brickorna matchar ej");
                    // Här sker en timeout på ca ½ sekund innan funktionen för att vända tillbaka brickorna anropas.
                    setTimeout(function() {
                        flipBack();
                    }, 600);                    
                }
            }
        }
        
        function flipBack()
        {
            var justFlipped = document.querySelectorAll(".justFlipped");
            justFlipped[0].src = "pics/0.png";
            justFlipped[1].src = "pics/0.png";
            justFlipped[0].className = "";
            justFlipped[1].className = "";
            console.log(justFlipped);
            Memory.bricksFlipped.length = 0;
            console.log("Flippar tillbaka");
        }
    },
    
    memoryMessage:function(message)
    {
        var memoryMessage = document.getElementById("memoryMessage");
        memoryMessage.innerHTML = message;
    }
    
};

window.onload = function () {
    Memory.memoryMessage("Think I lost my memory");
    Memory.init();
};