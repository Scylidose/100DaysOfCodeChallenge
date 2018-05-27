var on = false;
var interval;

var enters = "";
var enters2 = "";
var operation = "";
var equal = false;

var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var operations = ["+", "-", "x", "÷"];

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
            if ($("input").val() == "I") {
                $("input").val("");
            }
            if (operation != "") {
                $(".basic").click(function () {
                    $("input").val("");
                });

                if (operations.includes($("input").val())) {
                    if (equal) {
                        equal = false;
                    }
                    $("input").val("");
                }

                if (numbers.includes($(this).text())) {
                    if (equal) {
                        equal = false;
                        $("input").val("");
                    }
                    enters2 = $("input").val() + $(this).text();
                    $("input").val(enters2);
                }
            } else {
                if (numbers.includes($(this).text())) {
                    if (equal) {
                        equal = false;
                        $("input").val("");
                    }
                    enters = $("input").val() + $(this).text();
                    $("input").val(enters);
                }
            }
        }

        $(".basic").click(function () {
            if (enters2 != "") {
                if (operation == "x") {
                    operation = "*";
                } else if (operation == "÷") {
                    operation = "/";
                }
                enters = eval(enters + " " + operation + " " + enters2);
                operation = "";
                enters2 = "";
            }
            $("input").val($(this).text());
            operation = $(this).text();
        });
    });
});

function reset() {
    if (on) {
        $("#show").val("I");
    }
}

function change() {
    if (on) {
        var num = 0;
        if (enters2 == "") {
            num = parseInt(enters);
            num *= -1;
            enters = num.toString();

        } else {
            num = parseInt(enters2);
            num *= -1;
            enters2 = num.toString();
        }
        $("input").val(num);
    }
}

function result() {
    if (on) {
        if (operation == "x") {
            operation = "*";
        } else if (operation == "÷") {
            operation = "/";
        }
        enters = eval(enters + " " + operation + " " + enters2);
        $("input").val(enters);
        operation = "";
        enters2 = "";
        equal = true;
    }
}


