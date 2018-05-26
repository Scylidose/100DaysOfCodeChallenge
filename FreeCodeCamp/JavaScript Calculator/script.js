var on = false;
var interval;

var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

$(document).ready(function () {
    $("#init").click(function () {

        if (!on) {
            on = true;
            interval = setInterval(function () {
                if ($("#show").val() == "I") {
                    $("#show").val("");
                } else if ($("#show").val() == "") {
                    $("#show").val("I");
                }
            }, 800);

        } else {
            on = false;

            clearInterval(interval);
            $("#show").val("");
        }
    });

    $("button").click(function () {
        if (on) {
            if($("input").val() == "I"){
                $("input").val("");
            }
            if (numbers.includes($(this).text())) {
                var enters = $("input").val() + $(this).text();
                $("input").val(enters);
            }
        }
    });
});

function reset() {
    if (on) {
        $("#show").val("I");
    }
}


