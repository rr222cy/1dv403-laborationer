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
    // Timer för att ta tid på spelet.
    gameTimer: 0,
    // Här ställer vi in hur många kolumner och rader spelet skall ha, satt till 2x2 här.
    cols: 4,
    rows: 4,    
    // Referens till tabellen vi vill lägga brickorna (rader/kolumner) i
    gameTable: "",
    
    init:function()
    {
        var mainContainer = document.querySelector("#gameBoard1");
        
        mainContainer.innerHTML = '<h2>Välj storlek på memoryt</h2><p class="memoryMessageStyle"><select id="boardSize"><option value="" disabled selected style="display:none;">Välj här</option><option value="2,2">2x2</option><option value="3,2">3x2</option><option value="4,2">4x2</option><option value="4,3">4x3</option><option value="4,4">4x4</option></select></p>';
        var selectBoardSize = document.getElementById("boardSize");
        selectBoardSize.onchange = function()
        {
            // Hämtar värden från selectrutan, nedan sätts rätt värde in för kolumn/rad.
            var values = selectBoardSize.options[selectBoardSize.selectedIndex].value;
            Memory.cols = values[0];
            Memory.rows = values[2];
            mainContainer.innerHTML = '<table id="gameTable1" class="gameTableStyle"></table><p id="memoryMessage1" class="memoryMessageStyle"></p><p class="memoryButtons"><input type="button" value="Börja om" id="restartGame1"><input type="button" value="Ändra brädesstorlek" id="changeBoardSize"></p>';
            Memory.gameTable = document.getElementById("gameTable1");
            Memory.initBoard();
            Memory.memoryMessage("Släpp sargen, kör igång!");
        };
    },
    
    initBoard:function()
    {
        // Slumpar fram brickor genom RandomGenerator och skickar sedan in detta i bricksArray[]
        Memory.bricksArray = RandomGenerator.getPictureArray(Memory.cols, Memory.rows);
        // k kommer i iterationen lyfta ut varje slumpat tal ur bricksArray[].
        var k = 0;
        restartGame();
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
        
        Memory.gameTable.onclick = function ()
        {
            Memory.memoryMessage("Spelet är igång!");
            Memory.gameTimer = new Date();
            this.onclick = null;
        };
        
        // Funktion för att tillämpa en closure och verkligen få ut önskat värde ur varje iteration ovan.
        function createBrick(nr)
        {
            // Skapar brickorna och tilldelar dem värden.
            var brickImage = document.createElement("img");
            brickImage.src = "pics/0.png";
            brickImage.width = "32";
            brickImage.height = "32";
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
        
        function checkBrick(nr)
        {   
            // Skickar här in den klickade brickans värde i bricksFlipped-arrayen.
            Memory.bricksFlipped.push(nr);
            var justFlipped = document.querySelectorAll(".justFlipped");
            
            // Kollar här om vi fått 2 brickor klickade på, om ja så matchas de mot varandra.
            if(Memory.bricksFlipped.length > 1)
            {
                // Kontrollerar om bricka 1 matchar bricka 2.
                if(Memory.bricksFlipped[0] === Memory.bricksFlipped[1])
                {
                    justFlipped[0].className = "justFlippedRight";
                    justFlipped[1].className = "justFlippedRight";
                    
                    Memory.bricksFlipped.length = 0;
                    Memory.bricksPair += 1;
                    Memory.bricksGuesses += 1;
                    
                    Memory.memoryMessage("Du har hittat " + Memory.bricksPair + " av " + Memory.cols * Memory.rows / 2 + " par hittills!");
                    
                    // Kollar om spelet är slut, antal par blir alltid hälften av rader * kolumner.
                    if(Memory.bricksPair === (Memory.cols * Memory.rows / 2))
                    {
                        var now = new Date();
                        Memory.memoryMessage("Grattis, du klarade memoryt på " + Math.round((now.getTime() / 1000) - (Memory.gameTimer.getTime() / 1000)) + " sekunder och " + Memory.bricksGuesses + " försök!");
                    }  
                }                
                else
                {
                    // Här sker en timeout på innan funktionen för att vända tillbaka brickorna anropas.
                    setTimeout(function() {
                        flipBack();
                    }, 700);                    
                }              
            }
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
        
        function flipBack()
        {
            var justFlipped = document.querySelectorAll(".justFlipped");
            justFlipped[0].src = "pics/0.png";
            justFlipped[1].src = "pics/0.png";
            justFlipped[0].className = "";
            justFlipped[1].className = "";

            Memory.bricksFlipped.length = 0;
            Memory.bricksGuesses += 1;
        }
        
        // Funktion för att börja om, nollställer allt utan att ladda om fönstret.
        function restartGame()
        {
            document.getElementById("restartGame1").addEventListener('click',function(){
                    Memory.bricksArray.length = 0;
                    Memory.bricksFlipped.length = 0;
                    Memory.bricksGuesses = 0;
                    Memory.bricksPair = 0;
                    Memory.gameTable.innerHTML = "";
                    Memory.memoryMessage("");
                    Memory.gameTimer = 0;
                    Memory.initBoard();
                }, true);
            
            document.getElementById("changeBoardSize").addEventListener('click',function(){
                    Memory.bricksArray.length = 0;
                    Memory.bricksFlipped.length = 0;
                    Memory.bricksGuesses = 0;
                    Memory.bricksPair = 0;
                    Memory.gameTable.innerHTML = "";
                    Memory.memoryMessage("");
                    Memory.gameTimer = 0;
                    Memory.init();
                }, true);
        }
    },
    
    memoryMessage:function(message)
    {
        var memoryMessage = document.getElementById("memoryMessage1");
        memoryMessage.innerHTML = message;
    }
    
};

window.onload =  Memory.init();