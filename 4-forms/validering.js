/*jslint browser:true*/
"use strict";

var Validator = {
    
    init:function()
        {
            // Deklarerar och initierar variablerna/fälten jag kommer arbeta med.
            var firstName = document.getElementById("firstName");
            var lastName = document.getElementById("lastName");
            var submitForm = document.getElementById("submitForm");
            var error = "";
            var submitAction = function()
            {
                // Validerar förnamn.
                if(firstName.value === "")
                {
                    error = Validator.errorMessage("Fältet får ej lämnas blankt!", "firstNameError");
                    if(!document.getElementById("firstNameError"))
                    {
                        firstName.parentNode.insertBefore(error, firstName.nextSibling);
                    }
                }
                else
                {
                    if(document.getElementById("firstNameError"))
                    {
                        document.getElementById("firstNameError").innerHTML = "";
                    }
                }
                // Validerar efternamn.
                if(lastName.value === "")
                {
                    error = Validator.errorMessage("Fältet får ej lämnas blankt!", "lastNameError");
                    if(!document.getElementById("lastNameError"))
                    {
                        lastName.parentNode.insertBefore(error, lastName.nextSibling);
                    }
                }
                else
                {
                    if(document.getElementById("lastNameError"))
                    {
                        document.getElementById("lastNameError").innerHTML = "";
                    }
                }
                
                // Validerar e-post.
            };
            
            // Vid klick på skicka ska funktionen submitAction köras som validerar formuläret.
            submitForm.addEventListener('click', submitAction, false);            
        },
    
    errorMessage:function(message, inputID)
    {
        var messageSpan = document.createElement("span");
        var messageText = document.createTextNode(" " + message);
        messageSpan.className = "errorMessage";
        messageSpan.id = inputID;
        messageSpan.appendChild(messageText);
               
        return messageSpan;
    }
    
};

// Kör igång min validator så snart windowobjektet är redo.
window.onload = function () {
    Validator.init();
};