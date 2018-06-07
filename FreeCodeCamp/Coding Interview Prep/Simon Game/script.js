var ordre = [];

var click = [];

var colors = ["green", "red", "yellow", "blue"];

var color;
var col;
var strict = false;
var fail = false;
var index = 0;
var score = 0;

var redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

$(document).ready(function () {

    $(".score").text(score);

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
        $(this).prop("disabled", true);
    });

    $("#red").click(function () {
        $("#red").attr('class', "redLight red");
        redAudio.play();
        click.push("red");

        setTimeout(function () {
            $("#red").removeClass("redLight");
        }, 500);

        verifier();
    });

    $("#blue").click(function () {
        $("#blue").attr('class', "blueLight blue");
        blueAudio.play();
        click.push("blue");

        setTimeout(function () {
            $("#blue").removeClass("blueLight");
        }, 500);

        verifier();
    });

    $("#yellow").click(function () {
        $("#yellow").attr('class', "yellowLight yellow");
        yellowAudio.play();
        click.push("yellow");

        setTimeout(function () {
            $("#yellow").removeClass("yellowLight");
        }, 500);

        verifier();
    });

    $("#green").click(function () {
        $("#green").attr('class', "greenLight green");
        greenAudio.play();
        click.push("green");

        setTimeout(function () {
            $("#green").removeClass("greenLight");
        }, 500);

        verifier();
    });
});

function play() {
    if (!fail) {
        $(".score").text(score);

        click = [];
        color = colors[Math.floor(Math.random() * colors.length)];

        ordre.push(color);

        index = 0;
        setLight();

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
    classes = col + "Light " + col;
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
    score = 0;
    fail = false;

    $(".score").text(score);
    $("#play").removeClass("playing");
    $("#play").prop("disabled", false);
}

function verifier() {
    for (var i = 0; i < click.length; i++) {
        if (click[i] != ordre[i]) {
            perdu();
        }
    }
    if (click.length == ordre.length && !fail) {
        score++;
        if (score == 20) {
            gagner();
        } else {
            play();
        }
    } else {
        index = 0;
        setTimeout(function () {
            setLight();
        }, 4000);
    }
}

function gagner() {
    $(".score").text(score);
    var err = setInterval(function () {
        $(".error").text("WIN").fadeIn(500);
        $(".error").text("WIN").fadeOut(500);
    }, 1000);
    index = 0;
    setTimeout(function () {
        clearInterval(err);
        restart();
    }, 4000);
}

function perdu() {
    if (strict) {
        ordre = [];
        click = [];
        fail = false;
        score = 0;
        showError();
        play();
    } else {
        fail = true;
        showError();
    }
}

function showError() {
    $(".score").fadeOut(300);
    var err = setInterval(function () {
        $(".error").text("ERROR").fadeIn(500);
        $(".error").text("ERROR").fadeOut(500);
    }, 1000);
    index = 0;
    setTimeout(function () {
        clearInterval(err);
        $(".score").text(score).fadeIn(500);
        setLight();
    }, 4000);
}