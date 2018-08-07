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

function changeColor(element){
    if($(element).css("background-color") == "red"){
        $(element).css("background-color", "blue");
    } else {
        $(element).css("background-color", "red");
    }
}