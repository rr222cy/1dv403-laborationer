/*jslint browser:true*/
"use strict";

var Validator = {
    
    init:function()
        {
            // Deklarerar och initierar variablerna/fälten jag kommer arbeta med.
            var firstName = document.getElementById("firstName");
            var lastName = document.getElementById("lastName");
            var postalCode = document.getElementById("postalCode");
            var email = document.getElementById("email");
            var submitForm = document.getElementById("submitForm");
            var canSend = false;
            var error = "";
            
            // Denna funktion körs igång med sidan, validerar utefter att användaren fyller fälten med innehåll.
            var submitAction = function()
            {
                // Validerar förnamn, efternamn, postkod samt e-post.
                firstName.addEventListener('blur',function(e){
                    validateEmptyFields(firstName, "firstName");
                }, true);
                lastName.addEventListener('blur',function(e){
                    validateEmptyFields(lastName, "lastName");
                }, true);
                postalCode.addEventListener('blur',function(e){
                    validateEmptyFields(postalCode, "postalCode");
                }, true);
                email.addEventListener('blur',function(e){
                    validateEmptyFields(email, "email");
                }, true);                
            };
            
            // Funktion för att validera att inga inputs är tomma.
            var validateEmptyFields = function(inputID, inputName)
            {
                var inputErrorMessageID = inputName + "Error";
                if(inputID.value === "")
                {
                    error = Validator.errorMessage("Fältet får ej lämnas blankt!", inputName);
                    if(!document.getElementById(inputErrorMessageID))
                    {
                        inputID.parentNode.insertBefore(error, inputID.nextSibling);
                        inputID.className = "inputInvalid";
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
                            inputID.className = "inputValid";
                        }
                    }
                    inputID.className = "inputValid";
                }
            };
            
            // Funktion för att validera postkoder
            var validatePostalCode = function(inputID, inputName)
            {
                validateEmptyFields(inputID, inputName);
            };
            
            // Funktion för att validera e-postadresser
            var validateEmail = function(inputID, inputName)
            {
                validateEmptyFields(inputID, inputName);
            };
            
            // Om allt är validerat ska canSend vara "true" och formuläret kan då sändas iväg. 
            var sendForm = function()
            {               
                if(!document.getElementById("firstNameError") && !document.getElementById("lastNameError") && !document.getElementById("postalCodeError") && !document.getElementById("emailError"))
                {
                    canSend = true;
                }
                
                if(canSend)
                {
                    document.forms.buyForm.submit();
                }
            };
            
            // Kontrollerar om alla uppgifter stämmer, sänder isf iväg formuläret.
            submitForm.addEventListener('click', function(e){
                e.preventDefault();
                validateEmptyFields(firstName, "firstName");
                validateEmptyFields(lastName, "lastName");
                validateEmptyFields(postalCode, "postalCode");
                validateEmptyFields(email, "email");
                sendForm();
            }, false);
                        
            submitAction();
        },
    
    // Funktion för att hantera felmeddelanden och skapa dessa.
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