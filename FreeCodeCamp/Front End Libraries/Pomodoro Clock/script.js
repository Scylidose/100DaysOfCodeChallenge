var minutes = 25;
var secondes = "00";

var minuteReset = minutes;
var secondeReset = secondes;

var interval;

$(document).ready(function () {

    $(".timer").val(minutes + " : " + secondes);

    $("#reset").click(function () {
        minutes = minuteReset;
        secondes = secondeReset;
        $(".timer").val(minutes + " : " + secondes);
        clearInterval(interval);

        $(".lecture").replaceWith("<button class='lecture' id='start' onclick='play()'><i class='fas fa-play'></i></button>");
    });

    $("#set").click(function () {
        minutes = $("#setMinutes").val();
        minuteReset = $("#setMinutes").val();

        secondes = $("#setSecondes").val();
        secondeReset = $("#setSecondes").val();
        $(".timer").val(minutes + " : " + secondes);
        clearInterval(interval);
        $(".lecture").replaceWith("<button class='lecture' id='start' onclick='play()'><i class='fas fa-play'></i></button>");
    });
});

function play() {
    $("#start").replaceWith("<button class='lecture' id='stop' onclick='stop()'><i class='fas fa-pause'></i></button>");
    interval = setInterval(function () {

        if($("#clock").hasClass("borderAnim")){
            $("#clock").removeClass("borderAnim");
        } else {
            $("#clock").addClass("borderAnim");
        }

        if (secondes > "00" && secondes <= "09") {
            var sec = parseInt(secondes);
            sec--;
            secondes = "0" + sec;
        }
        if (minutes > "00" && minutes <= "09" && secondes == "00") {
            var min = parseInt(minutes);
            min--;
            minutes = "0" + min;
            secondes = 60;
        }

        if (minutes == "00" && secondes == "00") {
            //Finished
            clearInterval(interval);
        }

        if (minutes > "09" && secondes == 60) {
            minutes--;
        }

        if (secondes > "09") {
            secondes--;
        }

        if (secondes == 9) {
            secondes = "09"
        }

        if (minutes == 9) {
            minutes = "09"
        }

        $(".timer").val(minutes + " : " + secondes);

        if (secondes == "00") {
            secondes = 60;
        }

    }, 1000);
}

function stop() {
    $("#stop").replaceWith("<button class='lecture' id='start' onclick='play()'><i class='fas fa-play'></i></button>");
    clearInterval(interval);
}