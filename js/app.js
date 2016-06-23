"use strict";

var rules = [
    {
        id: "leid1",
        name: "Leið 1",
        spiritAmount: 1,
        wineAmount: 1,
        beerAmount: 6
    },
    {
        id: "leid2",
        name: "Leið 2",
        spiritAmount: 1,
        wineAmount: 0,
        beerAmount: 9
    },
    {
        id: "leid3",
        name: "Leið 3",
        spiritAmount: 0,
        wineAmount: 3,
        beerAmount: 6
    },
    {
        id: "leid4",
        name: "Leið 4",
        spiritAmount: 0,
        wineAmount: 1.5,
        beerAmount: 9
    },
    {
        id: "leid5",
        name: "Leið 5",
        spiritAmount: 0,
        wineAmount: 0,
        beerAmount: 12
    }
];

function calculateRemaining(spiritAmount, wineAmount, beerAmount) {
    var remaining = [];
    for (var i = 0; i < rules.length; i++) {
        var item = {};
        var rule = rules[i];
        item.id = rule.id;
        item.name = rule.name;
        item.spiritAmount = rule.spiritAmount - spiritAmount;
        item.wineAmount = rule.wineAmount - wineAmount;
        item.beerAmount = rule.beerAmount - beerAmount;

        item.valid = item.spiritAmount >= 0 && item.wineAmount >= 0 && item.beerAmount >= 0;
        remaining.push(item);
    }
    return remaining;
}


function updateMessages(personNumber, remainders) {
    var personId = "person" + personNumber;
    var nothingValid = true;
    for (var i = 0; i < remainders.length; i++) {
        var item = remainders[i];
        var identifier = "." + personId + " .message ." + item.id;
        if (item.valid) {
            nothingValid = false;
            var messageToShow = "Þessi kaup ganga upp í " + item.name + ", sem" +
                " leyfir þér að kaupa " + item.spiritAmount + " lítra af" +
                " sterku, " + item.wineAmount +
                " lítra af léttvíni og " + item.beerAmount + " lítra af bjór til" +
                " viðbótar.";
            $(identifier + " p").text(messageToShow);
            $(identifier).show();
        } else {
            $(identifier).hide();
        }
    }
    var $nowayElement = $("." + personId + " .message .noway");
    if (nothingValid) {
        $nowayElement.show();
    } else {
        $nowayElement.hide();
    }
}

function applyListeners() {
    $("form").change(function () {
        var personNumber = parseInt($(this).parent().parent().attr("class").slice(6));
        var spirits = 0;
        var wine = 0;
        var beer = 0;
        $(this).find("input").each(function () {
            if ($(this).hasClass("spirit")) {
                spirits = $(this).val();
            } else if ($(this).hasClass("wine")) {
                wine = $(this).val();
            } else if ($(this).hasClass("beer")) {
                beer = $(this).val();
            }
        });
        var remainders = calculateRemaining(spirits, wine, beer);
        updateMessages(personNumber, remainders);
    })
}

var numPeople = 1;
function addPerson() {
    var $people = $(".people");
    numPeople += 1;
    var $base = $(".person1");
    var $newPerson = $($.parseHTML($base.prop("outerHTML")));
    $newPerson.addClass("person" + numPeople).removeClass("person1");
    $people.append($newPerson);
    applyListeners();
}

function removePerson() {
    // ToDo unfuck
    var $people = $(".people");
    console.log($(".person" + numPeople));
    if (numPeople > 1) {
        $(".person" + numPeople).remove();
        numPeople -= 1;
        //$people.children().last().remove();
    }
}

function initialize() {
    applyListeners();
}

$(initialize());