"use strict";

function calculateRemaining(n, spiritAmount, wineAmount, beerAmount) {
    var spiritUnit = 0.25;
    var wineUnit = 0.75;
    
}


function updateMessages(remainders) {

}

function applyListeners() {
    $("form").change(function () {

        var n = parseInt($("#num-people").val());
        var spirits = parseFloat($("#spirit-amount").val());
        var wine = parseFloat($("#wine-amount").val());
        var beer = parseFloat($("#beer-amount").val());

        var remainders = calculateRemaining(n, spirits, wine, beer);
        updateMessages(remainders);
    })
}

function initialize() {
    applyListeners();
}

$(initialize());