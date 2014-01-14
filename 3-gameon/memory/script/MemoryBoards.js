/*jslint browser:true*/
"use strict";

var MemoryBoards = {
   init: function(){
      var gameBoard1 = new Memory(3,4,"game1");
      gameBoard1.init();
   }
};

window.onload =  MemoryBoards.init();