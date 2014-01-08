/*jslint browser:true*/
"use strict";

var Validator = {
    
    init:function()
        {
            // Deklarerar och initierar variablerna/fälten jag kommer arbeta med.
            var firstName = document.getElementById("firstName");
            var lastName = document.getElementById("lastName");
            var submitForm = document.getElementById("submitForm");
            var canSend = false;
            var error = "";
            
            // Denna funktion körs när användaren vill sända formuläret, validering startas.
            var submitAction = function()
            {
                // Validerar förnamn och efternamn
                validateName(firstName, "firstName");
                validateName(lastName, "lastName");
                
                // Kontrollerar om alla uppgifter stämmer, sänder isf iväg formuläret.
                sendForm();
                
            };
            
            // Funktion för att validera vanlig text, för och efternamn i detta fallet.
            var validateName = function(inputID, inputName)
            {
                var inputErrorMessageID = inputName + "Error";
                if(inputID.value === "")
                {
                    error = Validator.errorMessage("Fältet får ej lämnas blankt!", inputName);
                    if(!document.getElementById(inputErrorMessageID))
                    {
                        inputID.parentNode.insertBefore(error, inputID.nextSibling);
                    }
                }
                else
                {
                    if(document.getElementById(inputErrorMessageID))
                    {
                        if(inputErrorMessageID)
                        {
                            var inputErrorMessageElement = document.getElementById(inputErrorMessageID);
                            inputErrorMessageElement.parentNode.removeChild(inputErrorMessageElement);
                        }
                        else 
                        {
                            console.log("jag finns inte");
                        }
                    }
                }
            };
            
            // Om allt är validerat ska canSend vara "true" och formuläret kan då sändas iväg. 
            var sendForm = function()
            {               
                if(!document.getElementById("firstNameError") && !document.getElementById("lastNameError"))
                {
                    canSend = true;
                }
                
                if(canSend)
                {
                    document.forms.buyForm.submit();
                }
            };
            
            // Vid klick på skicka ska funktionen submitAction köras som validerar formuläret.
            submitForm.addEventListener('click', submitAction, false);
            
        },
    
    errorMessage:function(message, inputID)
    {
        var messageSpan = document.createElement("span");
        var messageText = document.createTextNode(" " + message);
        messageSpan.className = "errorMessage";
        messageSpan.id = inputID + "Error";
        messageSpan.appendChild(messageText);
               
        return messageSpan;
    }
    
};

// Kör igång min validator så snart windowobjektet är redo.
window.onload = function () {
    Validator.init();
};