var ordre = [];

var colors = ["green", "red", "yellow", "blue"];

var color;

var col;

var delay = 1000;

var loose;

var redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

$(document).ready(function () {


});

function play() {
    color = colors[Math.floor(Math.random() * colors.length)];

    ordre.push(color);

    for (var i = 0; i < ordre.length; i++) {
        col = ordre[i];
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
        }, delay);
    }



}

function restart() {
    ordre = [];
    delay = 1000;
}