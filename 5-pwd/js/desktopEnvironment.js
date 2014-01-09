/*jslint browser:true*/
"use strict";

var desktopEnvironment = {
    init:function()
    {
        console.log("Applikationen initierad.");
    }
};


// Kör igång PWD:n direkt windowobjektet laddats in.
window.onload = function () {
    desktopEnvironment.init();
};