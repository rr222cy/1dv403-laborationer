"use strict";

var makePerson = function(persArr) {
   
    var result = {}, maxAge, minAge, averageAge, namesArray = [], allAges = [], names;
    var totalAge = 0;
        
    // Loopar ut alla åldrar och namn ur arrayen persArr, skickar sedan in resultaten i 2 nya arrayer så vi kan sortera dessa.
    // Lägger även in alla åldrar i variabeln totalAge, så vi kan beräkna medelåldern.
    for (var i = 0; i < persArr.length; i++) 
    {
        allAges.push(persArr[i].age);
        totalAge += persArr[i].age;
        namesArray.push(persArr[i].name);
    }
    
    // Sorterar här åldrarna så att vi får yngst först och äldst sist
    allAges.sort(function(a,b){return a - b;});
    minAge = allAges[0];
    maxAge = allAges[allAges.length-1];
    averageAge = Math.round(totalAge / allAges.length);
    // Sorterar här namnen i bokstavsordning, sedan så slår jag ihop alla namnen i min array till en ny string i variabeln names.
    // Jämför med lokala bokstäver mot icke-lokala för rätt sortering.
    namesArray.sort(function sortLocaleLetters(a, b) 
                    {
                        return a.toString().localeCompare(b.toString());
                    }
                   );
    names = namesArray.join(", ");
    
    // Sätter samman objektet jag sedan returnerar.
    result = {
        maxAge: maxAge,
        minAge: minAge,
        averageAge: averageAge,
        names: names
    };
    
    return result;
};


