"use strict";

function updateMessages(units, unitsAvailable, unitsRemaining) {
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
    // Limit defined by https://www.tollur.is/einstaklingar/tollamal/ferdamenn/
    var unitsPerPerson = 6;
    return numPeople * unitsPerPerson;
}

function calculateRemaining(totalUnits, units) {
    return totalUnits - units.beer - units.wine - units.spirits;
}


function gatherAmounts() {
    return {
        spirits: parseFloat($("#spirit-amount").val()),
        wine: parseFloat($("#wine-amount").val()),
        beer: parseFloat($("#beer-amount").val())
    }
}

function getGroupSize() {
    return parseInt($("#num-people").val());
}

function applyListeners() {
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