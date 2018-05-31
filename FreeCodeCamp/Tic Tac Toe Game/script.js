var actualPlayer;
var player;
var won = false;
var ordre = [];
var delay = 100;
var machine = false;
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
        actualPlayer = player;
        changeAllText();
    });

    $("#play2").click(function () {
        actualPlayer = player;
        machine = true;
        changeAllText();
    });
});

function restart() {
    location.reload();
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
                if (cas.text() == actualPlayer) {
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

        if (machine) {
            if (!won) {
                var elem = $(objects[Math.floor(Math.random() * objects.length)]);
                while (elem.text() != "") {
                    elem = $(objects[Math.floor(Math.random() * objects.length)]);
                }
                elem.text(player);
                if (player == "X") {
                    $(elem).addClass("player1");
                } else {
                    elem.addClass("player2");
                }
                ordre.push(elem);
            }
            checkWin();

            if (won) {
                if (elem.text() == actualPlayer) {
                    $("#result").text("Player1 Won !");
                } else {
                    $("#result").text("IA Won !");
                }

                $("#restart").fadeIn(2000, function () {
                    $(this).css("display", "block");
                });
            }
            changePlayer();
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

    if (!won && $(objects[0]).text() != "" && $(objects[1]).text() != "" && $(objects[2]).text() != "" &&
        $(objects[3]).text() != "" && $(objects[4]).text() != "" && $(objects[5]).text() != "" &&
        $(objects[6]).text() != "" && $(objects[7]).text() != "" && $(objects[8]).text() != "") {
        for (var i = 0; i  <  objects.length; i++) {
            $(objects[i]).fadeIn("slow", function () {
                $(this).addClass("neutral");
                $("#result").text("Equality !");
                $("#restart").fadeIn(2000, function () {
                    $(this).css("display", "block");
                });
            });
        }
    }
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