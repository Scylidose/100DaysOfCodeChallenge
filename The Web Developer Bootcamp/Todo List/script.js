var date = new Date();

var month = date.getMonth() + 1;
var day = date.getDate();

var output = date.getFullYear() + '-' +
    (month < 10 ? '0' : '') + month + '-' +
    (day < 10 ? '0' : '') + day;

$("#myDate").val(output);

$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
});

$("ul").on("click", "span", function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").keypress(function (event) {
    if (event.which === 13) {
        if ($(".important").hasClass("clicked")) {
            $("ul").append("<li class='clicked'><span><i class='fas fa-trash-alt'></i></span>" + $(this).val() + "<span class='date align-bottom'>" + output + "</span></li>").children(':last').hide().fadeIn(2000);;
        } else {
            $("ul").append("<li><span><i class='fas fa-trash-alt'></i></span>" + $(this).val() + "<span class='date align-bottom'>" + output + "</span></li>").children(':last').hide().fadeIn(2000);;
        }

        $(this).val("");
        $(".important").removeClass("clicked");
    }
});

$(".important").click(function () {
    if ($(".important").hasClass("clicked")) {
        $(".important").removeClass("clicked");
    } else {
        $(".important").addClass("clicked");
    }
});

$(".deroul").click(function () {
    if ($(".deroul").hasClass("fa-minus")) {
        $(".important").fadeOut();
        $("input").fadeOut();
        $(".deroul").removeClass("fa-minus");
        $(".deroul").addClass("fa-plus");
    } else {
        $(".important").fadeIn();
        $("input").fadeIn();
        $(".deroul").removeClass("fa-plus");
        $(".deroul").addClass("fa-minus");
    }
});
