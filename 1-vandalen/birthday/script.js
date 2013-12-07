"use strict";

window.onload = function(){

	
	var birthday = function(date){
    
        // Börjar här med att splitta strängen vi får från formuläret, lägger in varje element i en varsin variabel, dag, månad år.
        var splitDate = date.split('-');  
        var day = splitDate[2];  
        var month = splitDate[1]-1;  
    
        // Skapar sedan ett nytt Dateobjekt för vår födelsedag, samt för dagens datum.
        var birthDate = new Date();
        var dateToday = new Date();
        
        // Här vill jag sätta in inputvärden, samt året+1 i mitt birthDayobjekt, så att jag sedan kan jämföra de båda tiderna och räkna dagarna till nästa födelsedag.
        var year = birthDate.getFullYear();
        birthDate.setFullYear(year +1);
        birthDate.setMonth(month);
        birthDate.setDate(day);
               
        try
        {
            // Kollar så att våra värden är riktiga nummer, samt inte för stora utan följer formatet YYYY-MM-DDD.
            if(isNaN(day) || day.length > 2 || isNaN(month) || month.length > 2 || isNaN(year) || year.length > 4)
            {
                throw "Ange ett datum med formateringen YYYY-MM-DD, tack!";
            }
            else
            {
                // Beräknar differansen mellan födelsedatumet och dagens datum, delar på milli-,sekunder,minuter,timmar för korrekt värde.
                var calculateBirthDate = Math.round((birthDate.getTime()/(1000*60*60*24)) - (dateToday.getTime()/(1000*60*60*24)));
                // Kontrollerar här så att vi inte skriver ut att det är 365+ dagar kvar, när det de facto är födelsedagsdags.
                if (calculateBirthDate >= 365) 
                {
                    return calculateBirthDate - 365;
                }
                    
                return calculateBirthDate;
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
			var answer = birthday(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};