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
    var messageDate = this.getDate();
    var messageDateMonth;
    
    switch(messageDate.getUTCMonth())
    {
    case 0:
        messageDateMonth = "januari";
        break;
    case 1:
        messageDateMonth = "februari";
        break;
    case 2:
        messageDateMonth = "mars";
        break;
    case 3:
        messageDateMonth = "april";
        break;
    case 4:
        messageDateMonth = "maj";
        break;
    case 5:
        messageDateMonth = "juni";
        break;
    case 6:
        messageDateMonth = "juli";
        break;
    case 7:
        messageDateMonth = "augusti";
        break;
    case 8:
        messageDateMonth = "september";
        break;
    case 9:
        messageDateMonth = "oktober";
        break;
    case 10:
        messageDateMonth = "november";
        break;
    case 11:
        messageDateMonth = "december";
        break;
    }
    
    return "Inlägget skapades den " + messageDate.getUTCDate() + " " + messageDateMonth + " " + messageDate.getUTCFullYear() + " klockan " + messageDate.toLocaleTimeString();    
};