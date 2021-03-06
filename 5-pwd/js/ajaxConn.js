/*jslint browser:true*/
"use strict";

// Baserat på Johan Leitets logik för AJAX-anrop, kontakt: https://coursepress.lnu.se/johan-leitet/
function AjaxConn(url, callback)
{
    // Variabler för att kontrollerar svarsstatus på anrop.
    var READY_STATE_UNINITIALIZED = 0;
    var READY_STATE_OPENED = 1;
    var READY_STATE_SENT = 2;
    var READY_STATE_LOADING = 3;
    var READY_STATE_COMPLETE = 4;
    
    var xhr = this.getXHR();
    
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState === READY_STATE_COMPLETE)
        {
            if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)
            {
                callback(xhr.responseText);
            }
            else
            {
                console.log("Gick ej att läsa, felmeddelande: " + xhr.status);
            }
        }
    };
    
    xhr.open("get", url, true);
    xhr.send(null);
}

AjaxConn.prototype.getXHR = function()
{
    var xhr = null;
    
    // Försöker här skapa ett XMLHttpRequest-objekt, går inte det testar vi om ett ActiveXObject kan skapas, om inte kastas ett fel.
    try
    {
        xhr = new XMLHttpRequest();
    }
    catch (error)
    {
        try
        {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (error)
        {
            throw new Error("Din webbläsare stödjer inte AJAX-anrop, vänligen uppgradera.");
        }
    }
    return xhr;
};