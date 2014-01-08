/*jslint browser:true*/
"use strict";

var Validator = {
    
    init:function()
        {
            // Deklarerar och initierar variablerna/fälten jag kommer arbeta med.
            var firstName = document.getElementById("firstName");
            var lastName = document.getElementById("lastName");
            var submitForm = document.getElementById("submitForm");
            var submitAction = function()
            {
                if(firstName.value === "")
                {
                    alert("Tomt");
                }
                else
                {
                    alert("Ej tomt");
                }
                if(lastName.value === "")
                {
                    alert("Tomt");
                }
                else
                {
                    alert("Ej tomt");
                }
            };
            
            // Vid klick på skicka ska funktionen submitAction köras som validerar formuläret.
            submitForm.addEventListener('click', submitAction, false);            
        },
};

window.onload = function () {
    Validator.init();
};