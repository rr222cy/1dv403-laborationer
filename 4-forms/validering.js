/*jslint browser:true*/
"use strict";

var Validator = {
    
    // Deklarerar och initierar variablerna/fälten jag kommer arbeta med.
    firstName: document.getElementById("firstName"),
    lastName:  document.getElementById("lastName"),
    postalCode: document.getElementById("postalCode"),
    email: document.getElementById("email"),
    priceModel: document.getElementById("priceModel"),
    submitForm: document.getElementById("submitForm"),
    
    init:function()
        {
            // Denna funktion körs igång med sidan, validerar utefter att användaren fyller fälten med innehåll.
            var submitAction = function()
            {
                // Sätter fokus på input för förnamn.
                Validator.firstName.focus();                
                // Validerar förnamn, efternamn, postkod samt e-post varje gång en användare lämnar ett inputfält.
                Validator.firstName.addEventListener('blur',function(e){
                    Validator.validateEmptyFields(Validator.firstName);
                }, true);
                Validator.lastName.addEventListener('blur',function(e){
                    Validator.validateEmptyFields(Validator.lastName);
                }, true);
                Validator.postalCode.addEventListener('blur',function(e){
                    Validator.validatePostalCode(Validator.postalCode);
                }, true);
                Validator.email.addEventListener('blur',function(e){
                    Validator.validateEmail(Validator.email);
                }, true);                
            };                        
            
            // Om användaren klickar på skicka, valideras alla fält igen och informationen får verifieras av användaren.
            Validator.submitForm.addEventListener('click', function(e){
                e.preventDefault();
                Validator.validateEmptyFields(Validator.firstName, "firstName");
                Validator.validateEmptyFields(Validator.lastName, "lastName");
                Validator.validatePostalCode(Validator.postalCode, "postalCode");
                Validator.validateEmail(Validator.email, "email");
                Validator.sendForm();
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
    },
    
    // Funktion för att sända iväg formulärdatan.
    sendForm:function(finalConfirm)
    {
        if(Validator.validateEmptyFields(Validator.firstName) && Validator.validateEmptyFields(Validator.lastName) && Validator.validatePostalCode(Validator.postalCode) && Validator.validateEmail(Validator.email))
        {
            if(finalConfirm)
            {
                document.forms.buyForm.submit();
            }
            else
            {
                Validator.submitForm.value = "Validerar formulär och skickar!";                    
                Validator.showModal();
            }                    
        }
        else
        {
            Validator.submitForm.value = "Genomför köp!";
        }
    },
    
    // Funktion för att visa en modal popup.
    showModal:function()
    {
        // Ser till att frysa formuläret för ändringar medan popupen visas
        Validator.firstName.disabled = true;
        Validator.lastName.disabled = true;
        Validator.postalCode.disabled = true;
        Validator.email.disabled = true;
        Validator.priceModel.disabled = true;
        Validator.submitForm.disabled = true;
        
        var containerDiv = document.getElementById("container");
        var formName = document.getElementById("buyForm");
        
        containerDiv.className = "grayOut";
        
        var modalBox = document.createElement("div"),
            modalBoxContent = document.createElement("div"),
            modalH2 = document.createElement("h2"),
            modalTable = document.createElement("table"),
            modalTr = document.createElement("tr"),
            modalHeader = document.createTextNode("Vänligen bekräfta ditt köp"),
            modalFooter = document.createElement("div"),
            modalConfirmButton = document.createElement("input"),
            modalCancelButton = document.createElement("input");
        
        modalBox.className = "validationBox";
        modalBoxContent.className = "validationBoxContent";
        modalFooter.className = "validationBoxFooter";
        modalConfirmButton.type = "button";
        modalCancelButton.type = "button";
        modalConfirmButton.value = "Bekräfta ditt köp";
        modalCancelButton.value = "Avbryt";
        modalConfirmButton.className = "validationButton";
        modalCancelButton.className = "validationButton";
        modalTable.id = "validationTable";
        
        // Loopar här ut 5 rader med 2 kolumner vardera och skjuter in dessa i min tabell.
        for(var i = 0; i < 5; i++)
        {
            var tableRow = modalTable.insertRow();
            for(var j = 0; j < 2; j++)
            {
                var tableCell = tableRow.insertCell();
                //var cellP = document.createElement("p");
                
                //var cellText = document.createTextNode("Hej" + j);
                //cellP.className = "bold";
                //cellP.appendChild(cellText);
                //tableCell.appendChild(cellP);
            }
        }  
        
        // Lägger till rubriken i H2
        modalH2.appendChild(modalHeader);
        // Lägger till H2 i content
        modalBoxContent.appendChild(modalH2);
        // Lägger till content i boxen
        modalBox.appendChild(modalBoxContent);
        modalBox.appendChild(modalTable);
        // Lägger till knappar i footern
        modalFooter.appendChild(modalCancelButton);
        modalFooter.appendChild(modalConfirmButton);
        // Lägger till footer i boxen
        modalBox.appendChild(modalFooter);
        // Lägger till boxen under body
        document.body.appendChild(modalBox);
        
        var row1 = document.getElementById("validationTable").rows[0].cells;
        row1[0].appendChild(document.createTextNode("Förnamn: "));
        row1[1].appendChild(document.createTextNode(Validator.firstName.value));
        var row2 = document.getElementById("validationTable").rows[1].cells;
        row2[0].appendChild(document.createTextNode("Efternamn: "));
        row2[1].appendChild(document.createTextNode(Validator.lastName.value));
        var row3 = document.getElementById("validationTable").rows[2].cells;
        row3[0].appendChild(document.createTextNode("Postnummer: "));
        row3[1].appendChild(document.createTextNode(Validator.postalCode.value));
        var row4 = document.getElementById("validationTable").rows[3].cells;
        row4[0].appendChild(document.createTextNode("E-post: "));
        row4[1].appendChild(document.createTextNode(Validator.email.value));
        var row5 = document.getElementById("validationTable").rows[4].cells;
        row5[0].appendChild(document.createTextNode("Prismodell: "));
        row5[1].appendChild(document.createTextNode(Validator.priceModel.value));
        
        modalCancelButton.addEventListener("click", function () {
            document.body.removeChild(modalBox);
            containerDiv.className = "";
            Validator.firstName.disabled = false;
            Validator.lastName.disabled = false;
            Validator.postalCode.disabled = false;
            Validator.email.disabled = false;
            Validator.priceModel.disabled = false;
            Validator.submitForm.disabled = false;
            Validator.submitForm.value = "Genomför köp!";
        }, false);
        
        modalConfirmButton.addEventListener("click", function () {
            Validator.firstName.disabled = false;
            Validator.lastName.disabled = false;
            Validator.postalCode.disabled = false;
            Validator.email.disabled = false;
            Validator.priceModel.disabled = false;
            Validator.submitForm.disabled = false;
            Validator.sendForm(true);
        }, false);
    },
    
    // Funktion för att validera e-postadresser
    validateEmail:function(inputID)
    {
        Validator.validateEmptyFields(inputID);
        var epost = inputID.value;
        
        // OBS! Detta pattern är inlånat från följande källa: http://www.aspsnippets.com/Articles/Email-Address-Validation-in-JavaScript-using-Regular-Expressions.aspx
        var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
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
    },
    
    // Funktion för att se till att fältet som valideras inte är tomt.
    validateEmptyFields:function(inputID)
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
    },
    
    // Funktion för att validera svenska postkoder
    validatePostalCode:function(inputID) 
    {
        Validator.validateEmptyFields(inputID);
        var postalCode = inputID.value;
        
        // Pattern som kollar om vi har endera ett S eller ett E, sedan ett mellanslag eller ej, sedan 3 siffor mellan 0-9, sedan inget mellanslag
        // bindestreck, eller mellanrum, sedan 2 siffror mellan 0-9.
        var pattern = /([ES]|)( |)(\d{3})(|[-| ])(\d{2})/;
        var matched = postalCode.match(pattern);
        if(matched && postalCode.length <= 9)
        {                    
            inputID.className = "inputValid";
            // Kollar om E, S, - eller mellanrum finns, ersätter det med sammandrag isf.
            inputID.value = matched[0].replace(/([ES]|-| )/g, "");
            return true;
        }
        else
        {   
            Validator.errorMessage("Postnummret stämmer ej - XXXXX", inputID, false);
            inputID.className = "inputInvalid";
            return false;
        }        
    }
};

// Kör igång min validator så snart windowobjektet är redo.
window.onload = function () {
    Validator.init();
};