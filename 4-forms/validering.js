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
                // Validerar förnamn
                if(firstName.value === "")
                {
                    error = Validator.errorMessage("Fältet får ej lämnas blankt!", "firstNameError");
                    if(!document.getElementById("firstNameError"))
                    {
                        firstName.parentNode.insertBefore(error, firstName.nextSibling);
                    }                    
                }
                // Validerar efternamn
                if(lastName.value === "")
                {
                    error = Validator.errorMessage("Fältet får ej lämnas blankt!", "lastNameError");
                    if(!document.getElementById("lastNameError"))
                    {
                        lastName.parentNode.insertBefore(error, lastName.nextSibling);
                    }
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
        messageSpan.id = inputID;
        messageSpan.appendChild(messageText);
        
        
        
        return messageSpan;
    }
    
};

window.onload = function () {
    Validator.init();
};