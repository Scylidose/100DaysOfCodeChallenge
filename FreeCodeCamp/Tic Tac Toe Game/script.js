var player = "X";
var won = false;
var ordre = [];
var delay = 100;
var objects =
    ["#top-left", "#top-middle", "#top-right",
        "#middle-left", "#middle-middle", "#middle-right",
        "#bottom-left", "#bottom-middle", "#bottom-right"];

// Can choose player color

// Can choose human 1v1 or against IA

// Add color to restart button

// Add background-color

// Upgrade color in the table

// Upgrade td borders.


$(document).ready(function () {
    changeAllText();
});

function restart() {
    won = false;
    player = "X";
    ordre = [];
    delay = 100;
    emptyCase();
    $("#result").text("");
}

function emptyCase() {
    for (var i = 0; i < objects.length; i++) {
        $(objects[i]).text("");
        $(objects[i]).removeClass();
    }
}

function changeAllText() {
    for (var i = 0; i < objects.length; i++) {
        changeText($(objects[i]));
    }
}

function changeText(cas) {
    cas.click(function () {
        if (!won) {
            if (cas.text() == "") {
                cas.text(player);
                if (player == "X") {
                    $(cas).addClass("player1");
                } else {
                    cas.addClass("player2");
                }
                ordre.push(cas);
                changePlayer();
            }
            checkWin();
        }
        if (won) {
            $("#result").text(cas.text() + " Player Won !");
            $("#restart").fadeIn(2000, function () {
                $(this).css("display", "block");
            });
        }
    });
}

function changePlayer() {
    if (player == "X") {
        player = "O";
    } else {
        player = "X";
    }
}

function checkWin() {
    win($(objects[0]), $(objects[1]), $(objects[2])); // _
    win($(objects[3]), $(objects[4]), $(objects[5])); // -
    win($(objects[6]), $(objects[7]), $(objects[8])); // -
    win($(objects[0]), $(objects[4]), $(objects[8])); // \
    win($(objects[2]), $(objects[4]), $(objects[6])); // /
    win($(objects[0]), $(objects[3]), $(objects[6])); // |
    win($(objects[1]), $(objects[4]), $(objects[7])); // |
    win($(objects[2]), $(objects[5]), $(objects[8])); // |
}

function win(case1, case2, case3) {
    if (!won) {
        if (case1.text() === case2.text() && case1.text() === case3.text() && case1.text() != "") {
            won = true;

            for (var i = 0; i < ordre.length; i++) {
                if (ordre[i].attr('id') === case1.attr('id')) {
                    $(case1).delay(delay).queue(function () { $(this).addClass("win").delay("slow") });
                    delay += 300;
                } else if (ordre[i].attr('id') === case2.attr('id')) {
                    $(case2).delay(delay).queue(function () { $(this).addClass("win").delay("slow") });
                    delay += 300;

                } else if (ordre[i].attr('id') === case3.attr('id')) {
                    $(case3).delay(delay).queue(function () { $(this).addClass("win").delay("slow") });
                    delay += 300;

                } else if (ordre[i].text() != case1.text()) {
                    $(ordre[i]).fadeIn("slow", function () {
                        $(this).addClass("loose");
                    });

                } else if ($(ordre[i]).text() == case1.text()) {
                    $(ordre[i]).fadeIn("slow", function () {
                        $(this).addClass("neutral");
                    });
                }
            }
        }
    }
}

function end() {
    $("#restart").fadeOut(1000, function () {
        $(this).css("display", "none");
    });
}