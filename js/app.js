"use strict";

function litresToUnits(spiritAmount, wineAmount, beerAmount) {
    /*
     Converts given amounts of alcohol to "units" defined by Icelandic customs.

     spiritAmount: litres of hard liquor
     wineAmount: litres of wine
     beerAmount: litres of beer
     */

    // Units defined by https://www.tollur.is/einstaklingar/tollamal/ferdamenn/
    var spiritUnit = 0.25;
    var wineUnit = 0.75;
    var beerUnit = 3;

    var unitsFromSpirits = Math.ceil(spiritAmount / spiritUnit);
    var unitsFromWine = Math.ceil(wineAmount / wineUnit);
    var unitsFromBeer = Math.ceil(beerAmount / beerUnit);

    return unitsFromSpirits + unitsFromWine + unitsFromBeer;

}

function calculateRemaining(numPeople, units) {
    /*
     Calculates the number of tax-free units a group has remaining.

     numPeople: the number of people travelling together
     units: the combined number of units of alcohol the group is carrying
     */

    // Limit defined by https://www.tollur.is/einstaklingar/tollamal/ferdamenn/
    var unitsPerPerson = 6;
    return numPeople * unitsPerPerson - units;
}


function updateMessages(remainder) {
}

function applyListeners() {
    $("form").change(function () {

        var numPeople = parseInt($("#num-people").val());
        var spirits = parseFloat($("#spirit-amount").val());
        var wine = parseFloat($("#wine-amount").val());
        var beer = parseFloat($("#beer-amount").val());

        var units = litresToUnits(spirits, wine, beer);
        var remaining = calculateRemaining(numPeople, units);
        updateMessages(remaining);
    })
}

function initialize() {
    applyListeners();
}

$(initialize());