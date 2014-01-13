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
                modalHeader = document.createElement("div"),
                modalHeaderIcon = document.createElement("img"),
                modalHeaderSpan = document.createElement("span"),
                modalHeaderCloseIcon = document.createElement("img"),
                modalHeaderCloseIconLink = document.createElement("a");
            
            modalBox.className = "popupWindow";
            modalBox.id = "popupWindow";
            modalBoxContent.className = "popupWindowContent";
            modalBoxContent.id = "popupWindowContent";
            modalFooter.className = "popupWindowFooter";
            modalFooter.id = "popupWindowFooter";
            modalHeader.className = "popupWindowHeader";
            modalHeaderIcon.src = "pics/gallery.png";
            modalHeaderIcon.className = "popupWindowIcon";
            modalHeaderSpan.className = "popupWindowText";
            modalHeaderCloseIcon.src = "pics/close.png";
            modalHeaderCloseIcon.className = "popupWindowClose";
            
            modalHeaderCloseIconLink.href = "#";
            modalHeaderCloseIconLink.title = "Stäng fönster";
            modalHeaderCloseIconLink.id = "closeGallery";
            
            modalHeader.appendChild(modalHeaderIcon);
            modalHeaderSpan.appendChild(document.createTextNode("Image Viewer"));
            modalHeader.appendChild(modalHeaderSpan);
            modalHeaderCloseIconLink.appendChild(modalHeaderCloseIcon);
            modalHeader.appendChild(modalHeaderCloseIconLink);
            // Lägger till headern i fönstret
            modalBox.appendChild(modalHeader);
            // Lägger till content i boxen
            modalBox.appendChild(modalBoxContent);
            // Lägger till footer i boxen
            modalFooter.appendChild(document.createTextNode("Laddar..."));
            modalBox.appendChild(modalFooter);
            // Lägger till boxen i container-diven
            containerDiv.appendChild(modalBox);            
            // Vid klick på kryss stängs aktivt fönster.
            document.getElementById("closeGallery").onclick = function()
            {
                containerDiv.removeChild(document.getElementById("popupWindow"));            
                return false;
            };
            
            // Visar en laddningsgif fram till att AJAX-anropet ersätter den.
            document.getElementById("popupWindowFooter").innerHTML = '<img src="pics/ajax-loader-white.gif" width="12" height="12"/>&nbsp;&nbsp;Laddar...';
            
            // Efter att fönstret renderats fram sker ett AJAX-anrop mot angiven URL.
            new AjaxConn("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", function(data) {
                var responseData = JSON.parse(data);
                var picThumbWidth = [],
                    picThumbHeight = [],
                    picThumbURL = [];
                
                for(var i = 0; i < responseData.length; i++)
                {
                    picThumbHeight[i] = responseData[i].thumbHeight;
                    picThumbWidth[i] = responseData[i].thumbWidth;
                }
                                
                document.getElementById("popupWindowFooter").innerHTML = "";
                
                for(var i = 0; i < responseData.length; i++)
                {
                    document.getElementById("popupWindowContent").innerHTML += '<a href="#"><img src="'+responseData[i].thumbURL+'" class="galleryPic" /></a>';
                }
            });            
        }
    },
    
    changeBackground:function(backgroundImage)
    {
        document.body.style.background = "url(" + backgroundImage + ")";
    },
};

// Kör igång PWD:n direkt windowobjektet laddats in.
window.onload = desktopEnvironment.init();