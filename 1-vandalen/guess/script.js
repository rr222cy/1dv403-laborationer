"use strict";

window.onload = function(){
	
    var secret = Math.floor(Math.random() * (100 - 1) + 1) + 1; // Detta tal behöver bytas ut mot ett slumpat tal.
    var counter = 0;
	
	// I denna funktion ska du skriva koden för att hantera "spelet"
	var guess = function(number){
		//console.log("Det hemliga talet: " + secret); // Du når den yttre variabeln secret innifrån funktionen.
		//console.log("Du gissade: " + number); // Detta nummer är det som användaren gissade på.
		

		// Här kollar jag så att talet som matas in inte är mindre än 0 och större än 100. Samt att talet är i korrekt format, dvs inte i text utan siffror.
		if (number > 100 || number < 0 || isNaN(number))
		{
		    return [false, "Gissa på ett tal mellan 0-100!"];
		}
		
		else
		{
            // Lägger på +1 på antal gånger man gissat talet
		    counter += 1;
		    if (number < secret) {
		        return [false, "Hemliga talet är högre än " + number + "!"];
		    }
		    else if (number > secret) {
		        return [false, "Hemliga talet är mindre än " + number + "!"];
		    }
		    else if (number == secret) {
		        return [true, "Grattis du vann! Det hemliga talet var " + secret + " och du behövde " + counter + " gissningar för att hitta det!"];
		    }
		}


		// Returnera exempelvis: 
		// [true, "Grattis du vann! Det hemliga talet var X och du behövde Y gissningar för att hitta det."]
		// [false, "Det hemliga talet är högre!"]
		// [false, "Det hemliga talet är lägre!"]
		// [false, "Talet är utanför intervallet 0 - 100"]		
	};
	
	// ------------------------------------------------------------------------------



	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value) // Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};