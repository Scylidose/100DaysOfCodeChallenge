var player;
var won = false;
var ordre = [];
var delay = 100;
var machine = false;
var machineTurn = false;
var objects =
    ["#top-left", "#top-middle", "#top-right",
        "#middle-left", "#middle-middle", "#middle-right",
        "#bottom-left", "#bottom-middle", "#bottom-right"];

$(document).ready(function () {

    $("#x1").click(function () {
        player = "X";
    });

    $("#x2").click(function () {
        player = "X";
    });

    $("#o1").click(function () {
        player = "O";
    });

    $("#o2").click(function () {
        player = "O";
    });

    $("#play1").click(function () {
        changeAllText();
    });

    $("#play2").click(function () {
        machine = true;
        machineTurn = true;
        changeAllText();
    });
});

function restart() {
    won = false;
    ordre = [];
    delay = 100;
    machine = false;
    machineTurn = false;
    emptyCase();
    $("#result").text("");
    $("table").css("display", "none");
    $("#restart").css("display", "none");
    $("#choice").css("display", "block");
}

function emptyCase() {
    for (var i = 0; i < objects.length; i++) {
        $(objects[i]).text("");
        $(objects[i]).removeClass();
    }
}

function changeAllText() {
    $("#choice").css("display", "none");
    $("table").css("display", "block");
    for (var i = 0; i < objects.length; i++) {
        changeText($(objects[i]));
    }
}

function changeText(cas) {
    if (machineTurn) {
        cas.click();
    }
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
            }
            checkWin();
            if (won) {
                if (cas.text() == player) {
                    $("#result").text("Player1 Won !");
                } else {
                    if (machine) {
                        $("#result").text("IA Won !");
                    } else {
                        $("#result").text("Player2 Won !");
                    }
                }
                $("#restart").fadeIn(2000, function () {
                    $(this).css("display", "block");
                });
            }
            changePlayer();
        }
        if (machineTurn) {
            machineTurn = false;
        } else {
            machineTurn = true;
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
    $("#restart").fadeOut(500, function () {
        $(this).css("display", "none");
    });
}