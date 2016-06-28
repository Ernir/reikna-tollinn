"use strict";

function updateMessages(units, unitsAvailable, unitsRemaining) {
    /*
     Interfaces with the HTML (see index.html) to display the calculated info.
     */
    for (var prop in units) {
        if (units.hasOwnProperty(prop)) {
            $("." + prop + "-units").text(units[prop]);
        }
    }
    $(".units-available").text(unitsAvailable);
    $(".units-remaining").text(unitsRemaining);

    var $message = $(".alert");
    if (unitsRemaining < 0) {
        $message.removeClass("alert-success");
        $message.addClass("alert-warning");
    } else {
        $message.removeClass("alert-warning");
        $message.addClass("alert-success");
    }
}

function litresToUnits(amounts) {
    /*
     Converts given amounts of alcohol to "units" defined by Icelandic customs.
     Returns a JS object, with the number of units for each type of alcohol as
     properties.
     */

    // Units defined by https://www.tollur.is/einstaklingar/tollamal/ferdamenn/
    var spiritUnit = 0.25;
    var wineUnit = 0.75;
    var beerUnit = 3;

    var unitsFromSpirits = Math.ceil(amounts.spirits / spiritUnit) || 0;
    var unitsFromWine = Math.ceil(amounts.wine / wineUnit) || 0;
    var unitsFromBeer = Math.ceil(amounts.beer / beerUnit) || 0;

    return {
        spirits: unitsFromSpirits,
        wine: unitsFromWine,
        beer: unitsFromBeer
    }

}

function calculateAvailable(numPeople) {
    /*
     Calculates the total number of units of alcohol available to a group.
     Limit defined by https://www.tollur.is/einstaklingar/tollamal/ferdamenn/
     */
    var unitsPerPerson = 6;
    return numPeople * unitsPerPerson;
}

function calculateRemaining(totalUnits, units) {
    return totalUnits - units.beer - units.wine - units.spirits;
}


function gatherAmounts() {
    /*
     Uses jQuery to gather form data on the number of litres of each alcohol.
     Returns the data as a JS object.
     */
    return {
        spirits: parseFloat($("#spirit-amount").val()),
        wine: parseFloat($("#wine-amount").val()),
        beer: parseFloat($("#beer-amount").val())
    }
}

function getGroupSize() {
    /*
     Uses jQuery to gather form data on the number of people in the group.
     Returns the data as an integer.
     */
    return parseInt($("#num-people").val());
}

function applyListeners() {
    /*
     The "application", such as it is, is mostly driven by this single listener.
     */
    $("form").change(function () {
        // Gather form data
        var litreAmounts = gatherAmounts();
        var numPeople = getGroupSize();

        // Perform calculations
        var units = litresToUnits(litreAmounts);
        var unitsAvailable = calculateAvailable(numPeople);
        var unitsRemaining = calculateRemaining(unitsAvailable, units);

        // Display results
        updateMessages(units, unitsAvailable, unitsRemaining);
    })
}

function initialize() {
    applyListeners();
}

$(initialize());