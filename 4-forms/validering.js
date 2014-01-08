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
            
            // Denna funktion körs igång med sidan, validerar utefter att användaren fyller fälten med innehåll.
            var submitAction = function()
            {
                // Sätter fokus på input för förnamn.
                firstName.focus();
                
                // Validerar förnamn, efternamn, postkod samt e-post varje gång en användare lämnar ett inputfält.
                firstName.addEventListener('blur',function(e){
                    validateEmptyFields(firstName);
                }, true);
                lastName.addEventListener('blur',function(e){
                    validateEmptyFields(lastName);
                }, true);
                postalCode.addEventListener('blur',function(e){
                    validatePostalCode(postalCode);
                }, true);
                email.addEventListener('blur',function(e){
                    validateEmail(email);
                }, true);                
            };
            
            // Funktion för att validera att inga inputs är tomma.
            var validateEmptyFields = function(inputID)
            {
                if(inputID.value === "")
                {
                    // Skriver ut ett tooltip vid formuläret
                    Validator.errorMessage("Fältet får ej vara tomt!", inputID, false);                    
                    inputID.className = "inputInvalid";
                    return false;
                }
                else
                {
                    // Raderar tooltipet.
                    Validator.errorMessage("", inputID, true);                    
                    inputID.className = "inputValid";
                    return true;
                }
            };
            
            // Funktion för att validera postkoder
            var validatePostalCode = function(inputID)
            {
                validateEmptyFields(inputID);
                var postalCode = inputID.value;
                
                // Pattern som kollar om vi har 3st siffor, mellanslag, 2st siffror,
                var pattern = /([0-9]{3})(|[-| ])([0-9]{2})/;
                if(postalCode.match(pattern))
                {                    
                    inputID.className = "inputValid";
                    // Om mellanrum finns, tas detta bort och nummret sätts samman till ett.
                    inputID.value = postalCode.split(" ").join("");
                    inputID.value = postalCode.split("-").join("");
                    return true;
                }
                else
                {   
                    Validator.errorMessage("Postnummret stämmer ej", inputID, false);
                    inputID.className = "inputInvalid";
                    return false;
                }
                
                return true;
            };
            
            // Funktion för att validera e-postadresser
            var validateEmail = function(inputID)
            {
                validateEmptyFields(inputID);
                var epost = inputID.value;
                
                // TESTPATTERN - Hämtat från StackOverflow!
                var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if(epost.match(pattern))
                {                    
                    inputID.className = "inputValid";
                    return true;
                }
                else
                {   
                    Validator.errorMessage("Eposten stämmer ej", inputID, false);
                    inputID.className = "inputInvalid";
                    return false;
                }
            };
            
            // Om allt validerar sänds formuläret iväg.
            var sendForm = function()
            {         
                if(validateEmptyFields(firstName, "firstName") && validateEmptyFields(lastName, "lastName") && validatePostalCode(postalCode, "postalCode") && validateEmail(email, "email"))
                {
                    document.forms.buyForm.submit();
                }
            };
            
            // Kontrollerar om alla uppgifter stämmer, sänder isf iväg formuläret.
            submitForm.addEventListener('click', function(e){
                e.preventDefault();
                validateEmptyFields(firstName, "firstName");
                validateEmptyFields(lastName, "lastName");
                validatePostalCode(postalCode, "postalCode");
                validateEmail(email, "email");
                sendForm();
            }, false);
                        
            submitAction();
        },
    
    // Funktion för att hantera felmeddelanden och skapa dessa.
    errorMessage:function(message, inputID, status)
    {
        // Hämtar ut inputfältets ID-så jag senare kan skjuta in min span-tagg under den.
        var input = document.getElementById(inputID.name);
        var validateSpanCurrent = document.getElementById(inputID.name + "Tip");
        
        // Kollar om en spantagg redan finns som är kopplad till det inputID jag har, om ja så ska ingen ny skapas i onödan.
        if(validateSpanCurrent !== null && status === true)
        {
            validateSpanCurrent.remove(validateSpanCurrent);
        }
        else if (validateSpanCurrent === null && status === false)
        {
            var validateSpan = document.createElement("span");
            validateSpan.className = "errorMessage";
            validateSpan.id = inputID.name + "Tip";
            var messageText = document.createTextNode(" " + message);
            validateSpan.appendChild(messageText);            
            input.parentNode.insertBefore(validateSpan, input.nextSibling);
        }
    }    
};

// Kör igång min validator så snart windowobjektet är redo.
window.onload = function () {
    Validator.init();
};