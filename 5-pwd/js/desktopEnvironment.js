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
        
        // Kollar om fönstret redan finns, om ja, så raderas det, annars renderas.
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
            modalBox.appendChild(modalHeader);
            modalBox.appendChild(modalBoxContent);
            modalFooter.appendChild(document.createTextNode("Laddar..."));
            modalBox.appendChild(modalFooter);
            containerDiv.appendChild(modalBox);
            
            // Vid klick på kryss stängs aktivt fönster.
            document.getElementById("closeGallery").onclick = function()
            {
                containerDiv.removeChild(document.getElementById("popupWindow"));            
                return false;
            };
            
            document.getElementById("popupWindowFooter").innerHTML = '<img src="pics/ajax-loader-white.gif" width="12" height="12"/>&nbsp;&nbsp;Laddar...';
            
            // Efter att fönstret renderats fram sker ett AJAX-anrop mot angiven URL.
            new AjaxConn("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", function(data) {
                var responseData = JSON.parse(data);
                var picThumbWidth = [],
                    picThumbHeight = [],
                    picThumbMaxWidth = 0,
                    picThumbMaxHeight = 0,
                    i = 0;
                
                // Loopar ut alla bilders bredd och höjd och skickar in dem i nya arrayer.
                for(i = 0; i < responseData.length; i++)
                {
                    picThumbHeight[i] = responseData[i].thumbHeight;
                    picThumbWidth[i] = responseData[i].thumbWidth;
                }
                
                // Beräknar här genom Math-funktionen vilken bild i arrayen som är störst (vilket tal som är störtst i arrayen och skickar in det i min variabel).
                picThumbMaxWidth = Math.max.apply(Math, picThumbWidth);
                picThumbMaxHeight = Math.max.apply(Math, picThumbHeight);
                
                // Ser till att laddningsanimationen raderas, nu ska content fyllas.
                document.getElementById("popupWindowFooter").innerHTML = "";
                
                // Här loopas alla objekt ut, genom innerHTML skjuts bilderna in i DOM:en efter varv.
                for(i = 0; i < responseData.length; i++)
                {
                    document.getElementById("popupWindowContent").innerHTML += '<div class="galleryPic" style="width:'+picThumbMaxWidth+'px; height:'+picThumbMaxHeight+'px;"><a class="galleryPickd" href="'+responseData[i].URL+'"><img src="'+responseData[i].thumbURL+'" /></a></div>';
                }
                
                // Här skjuter jag in min egen standardbakgrund, så man kan gå tillbaka till den om man vill.
                document.getElementById("popupWindowContent").innerHTML += '<div class="galleryPic" style="width:'+picThumbMaxWidth+'px; height:'+picThumbMaxHeight+'px;"><a id="galleryPic'+i+'" href="pics/standardBackground.jpg"><img width="'+picThumbMaxWidth+'" height="'+picThumbMaxHeight+'" src="pics/standardBackground.jpg" /></a></div>';
                
                // Letar på alla länkar under mina galleribildsdivar och sätter onclickevent på dem.
                var galleryLinks = document.querySelectorAll(".galleryPic a");
                for(i=0; i < galleryLinks.length; i++)
                {
                    galleryLinks[i].onclick = function()
                    {
                        desktopEnvironment.changeBackground(this.href);
                        return false;
                    };
                }
            });            
        }
    },
    
    // Funktion för att byta PWD:ns bakgrund.
    changeBackground:function(backgroundImage)
    {
        document.body.style.background = "url(" + backgroundImage + ")";
    },
};

// Kör igång PWD:n direkt windowobjektet laddats in.
window.onload = desktopEnvironment.init();