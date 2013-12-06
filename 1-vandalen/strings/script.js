"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
	// Plats för förändring.		
	// Returnera den konverterade strängen.
    // Vid fel, kasta ett undantag med ett meddelande till användaren.
        
    var strConverted = "";
    var i = 0;
        
        try 
        {
            if (str === "")
            {
                throw "Mata in en mening du vill omvandla!";
            }
            else
            {
                
                // Loopar här igenom varje tecken i min sträng och utför önskad operation enligt if-satserna för respektive tecken.
                for(i = 0; i<str.length; i++)
                {
                    // Ersätter alla 'a' och 'A' med '#'.
                    if(str.charAt(i) === 'a' || str.charAt(i) === 'A')
                    {
                        strConverted += '#';
                        continue;
                    }
                    // Kollar om mitt tecken redan är lowercase, om så är fallet görs tecknet om till uppercase.
                    else if (str.charAt(i) === str.charAt(i).toLocaleLowerCase())
                    {
                        strConverted += str.charAt(i).toLocaleUpperCase();
                        continue;
                    }
                    // Samma som ovan, fast tvärtom
                    else if (str.charAt(i) === str.charAt(i).toLocaleUpperCase())
                    {
                        strConverted += str.charAt(i).toLocaleLowerCase();
                        continue;
                    }
                }

                return strConverted;
            }
        }
        catch(errorMsg)
        {
            return errorMsg;
        }
	

	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};