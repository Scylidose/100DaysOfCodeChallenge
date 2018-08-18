$(document).ready(function () {
    $(".sidenav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

    setInterval(function () {
        $('.nav-item a').toggleClass("bounce");
    }, 5000);
});

function changeColor(element) {
    $(element).toggleClass("clicked");
}

function getTrade() {
    var tradeList = [];
    var chooseList = [];
    var user = $(".userTitle").attr('id');

    $('.tradePkm.clicked').each(function () {
        tradeList.push($(this).attr("id"));
    });

    $('.choosePkm.clicked').each(function () {
        chooseList.push($(this).attr("id"));
    });

    document.location.href="/trade/"+user+"/"+tradeList+"/"+chooseList;
}