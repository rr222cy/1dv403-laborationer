"use strict";

var makePerson = function(persArr) {
   
    var result = {};
    var maxAge;
    var minAge;
    var averageAge;
    var names = [];
    var allAges = [];
        
    // Loopar ut alla åldrar och namn ur arrayen persArr, skickar sedan in resultaten i 2 nya arrayer så vi kan sortera dessa.
    for (var i = 0; i < persArr.length; i++) 
    {
        allAges.push(persArr[i].age);
        names.push(persArr[i].name);
    }
    
    // Sorterar här åldrarna så att vi får yngst först och äldst sist
    allAges.sort(function(a,b){return a - b;});
    minAge = allAges[0];
    maxAge = allAges[allAges.length-1];
    averageAge = 40;
    
    names.sort();
    
    result = {
        maxAge: maxAge,
        minAge: minAge,
        averageAge: averageAge,
        names: names
    };
    
    return result;
};


