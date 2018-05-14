$(document).ready(function () {
    $("#search").fadeIn(3000);
});

function rechercher() {
    if(!$(".words").val()){
        alert("test");

        $.getJSON('https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=5', function(data){
        });
    } else {
        alert("test2");

        $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&search=france&limit=1&format=json', function (data) {
        });
    }
}