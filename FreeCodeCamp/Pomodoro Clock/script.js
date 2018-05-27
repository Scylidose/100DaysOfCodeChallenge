var minutes = 25;
var secondes = "00";

var interval;

$(document).ready(function () {

    $("#timer").val(minutes + " : " + secondes);

    $("#start").click(function () {
        interval = setInterval(function () {
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

            $("#timer").val(minutes + " : " + secondes);

            if (secondes == "00") {
                secondes = 60;
            }

        }, 1000);
    });

    $("#stop").click(function () {
        clearInterval(interval);
    });

    $("#reset").click(function () {
        minutes = 25;
        secondes = "00";
        $("#timer").val(minutes + " : " + secondes);
        clearInterval(interval);
    });

    $("#set").click(function () {
        minutes = $("#setMinutes").val();
        secondes = $("#setSecondes").val();
        $("#timer").val(minutes + " : " + secondes);
        clearInterval(interval);
    });
});