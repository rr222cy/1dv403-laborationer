"use strict";

/*

// Lånar här in ForEach-metoden från Array
if (!NodeList.prototype.forEach) 
{
    NodeList.prototype.forEach = Array.prototype.forEach;
}

*/

// Konstruktorfunktion för meddelanden
var Message = function (message, date) {
    
    this.getText = function() {
        return message;
    };
    
    this.setText = function(_text) {
        message = _text;
    };
    
    this.getDate = function() {
        return date;
    };
    
    this.setDate = function(_date) {
        date = _date;
    };
    
};

Message.prototype.toString = function () {
    return this.getText() + " (" + this.getDate() + ")";  
};

Message.prototype.getHTMLText = function () {
    return this.getText().replace(/[\n\r]/g, "<br />");
};

Message.prototype.getDateText = function () {
};