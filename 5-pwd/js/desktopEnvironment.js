/*jslint browser:true*/
"use strict";

var desktopEnvironment = {
    init:function()
    {
        document.getElementById("galleryLink").onclick = function()
        {
            desktopEnvironment.showWindow();            
            return false;
        };
    },
    
    // Funktion för att rendera ett fönster.
    showWindow:function()
    {   
        var containerDiv = document.getElementById("container");
        
        if(document.getElementById("popupWindow"))
        {
            containerDiv.removeChild(document.getElementById("popupWindow"));
        }
        else
        {
            var modalBox = document.createElement("div"),
                modalBoxContent = document.createElement("div"),
                modalH2 = document.createElement("h2"),
                modalFooter = document.createElement("div"),
                modalHeader = document.createElement("div");
            
            modalBox.className = "popupWindow";
            modalBox.id = "popupWindow";
            modalBoxContent.className = "popupWindowContent";
            modalFooter.className = "popupWindowFooter";
            modalHeader.className = "popupWindowHeader";
                    
            // Lägger till headern i fönstret
            modalBox.appendChild(modalHeader);
            // Lägger till content i boxen
            modalBox.appendChild(modalBoxContent);
            // Lägger till footer i boxen
            modalBox.appendChild(modalFooter);
            // Lägger till boxen i container-diven
            containerDiv.appendChild(modalBox);            
            modalBoxContent.innerHTML = "Testar fönsterhanteraren.";
        }
    },
};

// Kör igång PWD:n direkt windowobjektet laddats in.
window.onload = function () {
    desktopEnvironment.init();
};