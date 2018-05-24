$(document).ready(function () {
    $("#search").fadeIn(3000);
    $("#random").fadeIn(8000);
});

$(document).ready(function () {
    $("#search").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php',
            data: { action: 'opensearch', search: $("#words").val(), format: 'json' },
            dataType: 'jsonp',
            success: show
        });
    });
});

function show(data) {
    $(".result").remove();

    for (let i = 0; i < data.length; i++) {
        setTimeout(function timer() {
            if(data[3][i] != undefined){
                $("#results").append("<div class='result'><a target='_blank' href='" + data[3][i] + "'><h4><i><b>" + data[1][i] + "</b></i></h4><p>" + data[2][i] + "</p></a></div>");
                $(".result").fadeIn(3000);
            }
        }, i * 500);
    }
}