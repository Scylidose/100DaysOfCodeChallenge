var ordre = [];

var click = [];

var colors = ["green", "red", "yellow", "blue"];

var color;
var col;
var delay = 1000;
var strict = false;
var fail = false;
var index = 0;

var redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

$(document).ready(function () {
    $("#strict").click(function () {
        if ($(this).hasClass("strictActive")) {
            $(this).removeClass("strictActive");
            strict = false;
        } else {
            $(this).addClass("strictActive");
            strict = true;
        }
    });

    $("#play").click(function () {
        $(this).addClass("playing");
        $(this).prop("disabled",true);
    });

    $("#red").click(function () {
        $("#red").attr('class', "redLight red");
        redAudio.play();
        click.push("red");

        setTimeout(function () {
            $("#red").removeClass("redLight");
        }, delay);
    });

    $("#blue").click(function () {
        $("#blue").attr('class', "blueLight blue");
        blueAudio.play();
        click.push("blue");

        setTimeout(function () {
            $("#blue").removeClass("blueLight");
        }, delay);
    });

    $("#yellow").click(function () {
        $("#yellow").attr('class', "yellowLight yellow");
        yellowAudio.play();
        click.push("yellow");

        setTimeout(function () {
            $("#yellow").removeClass("yellowLight");
        }, delay);
    });

    $("#green").click(function () {
        $("#green").attr('class', "greenLight green");
        greenAudio.play();
        click.push("green");

        setTimeout(function () {
            $("#green").removeClass("greenLight");
        }, delay);
    });
});

function play() {
    $("h4").text(ordre.length);

    if (!fail) {
        color = colors[Math.floor(Math.random() * colors.length)];

        ordre.push(color);

        index = 0;
        setLight();

        verifier();

    } else {
        fail = false;
    }
}

function setLight() {
    setTimeout(function () {
        enlight(ordre[index]);
    }, 1000);
}

function enlight(col) {
    var classes = $("#" + col).attr('class');
    classes = col + "Light" + ' ' + col;
    $("#" + col).attr('class', classes);

    if (col == "red") {
        redAudio.play();
    } else if (col == "green") {
        greenAudio.play();
    } else if (col == "yellow") {
        yellowAudio.play();
    } else if (col == "blue") {
        blueAudio.play();
    }
    setTimeout(function () {
        $("#" + col).removeClass(col + "Light");
    }, 1000);

    index++;

    if (index < ordre.length) {
        setLight();
    }
}

function restart() {
    ordre = [];
    click = [];
    delay = 1000;
    $("#play").removeClass("playing");
    $("#play").prop("disabled", false);
}

function verifier() {
    /*for (var i = 0; i < click.length; i++) {
        if (click[i] != ordre[i]) {
            perdu();
        }
    }

    play();*/
}

function perdu() {
    if (strict) {
        restart();
    } else {
        fail = true;
    }
}