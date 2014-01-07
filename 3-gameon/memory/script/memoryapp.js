/*jslint browser:true */
"use strict";

var Memory = {
    
    // Håller reda på brickorna och dess värde, samt antalet gissningar.
    bricksArray: [],
    bricksGuesses: 0,
    
    // Här ställer vi in hur många kolumner och rader spelet skall ha, satt till 2x2 här.
    cols: 2,
    rows: 2,
    
    init:function()
    {
        // Slumpar fram brickor genom RandomGenerator och skickar sedan in detta i bricksArray[]
        Memory.bricksArray = RandomGenerator.getPictureArray(Memory.cols, Memory.rows);
        console.log(Memory.bricksArray);
    }
    
};

window.onload = function () {
    Memory.init();
};