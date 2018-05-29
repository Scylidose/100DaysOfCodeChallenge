var player = "X";

$(document).ready(function () {

    $("#top-left").click(function () {
        if($("#top-left").text() == ""){
            $("#top-left").text(player);
            changePlayer();
        }
    });

    $("#top-middle").click(function () {
        if($("#top-middle").text() == ""){
            $("#top-middle").text(player);
            changePlayer();
        }
    });

    $("#top-right").click(function () {
        if($("#top-right").text() == ""){
            $("#top-right").text(player);
            changePlayer();
        }
    });

    $("#middle-left").click(function () {
        if($("#middle-left").text() == ""){
            $("#middle-left").text(player);
            changePlayer();
        }
    });

    $("#middle-middle").click(function () {
        if($("#middle-middle").text() == ""){
            $("#middle-middle").text(player);
            changePlayer();
        }
    });

    $("#middle-right").click(function () {
        if($("#middle-right").text() == ""){
            $("#middle-right").text(player);
            changePlayer();
        }
    });

    $("#bottom-left").click(function () {
        if($("#bottom-left").text() == ""){
            $("#bottom-left").text(player);
            changePlayer();
        }
    });

    $("#bottom-middle").click(function () {
        if($("#bottom-middle").text() == ""){
            $("#bottom-middle").text(player);
            changePlayer();
        }
    });

    $("#bottom-right").click(function () {
        if($("#bottom-right").text() == ""){
            $("#bottom-right").text(player);
            changePlayer();
        }
    });
});

function changePlayer(){
    if(player == "X"){
        player = "O";
    } else {
        player = "X";
    }
}