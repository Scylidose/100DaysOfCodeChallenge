var celsius = true;
var temp;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function setDegrees() {
    if (celsius) {
        $("#weather #type").text(temp.toFixed(2) + ' °C');
        celsius = false;
    } else {
        $("#weather #type").text((temp * (9 / 5) + 32).toFixed(2) + ' °F');
        celsius = true;
    }
}

function showPosition(position) {
    $.getJSON('https://fcc-weather-api.glitch.me/api/current?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude, function (data) {
        $("#weather").prepend('<img src=\"' + data.weather[0].icon + '\">');
        temp = data.main.temp;
        var speed = (data.wind.speed*1.852).toFixed(2);
        setDegrees();
        $("#weather").prepend('<p><b>'+data.sys.country+' <span style="margin-left:5px;" class="flag-icon flag-icon-'+data.sys.country.toLowerCase()+'"></span></b></p>');
        $("#weather").prepend('<p><b>'+data.name+'</b></p>');

        $("#weather").append('<hr style="border: 1px black solid;">');
        $("#weather").append('<h4><i>Beaufort scale (wind speed)</i></h4>');

        if(speed < 1){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:white;"><b>CALM</p>');

        } else if(speed < 5){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#CEFFFE;"><b>LIGHT AIR</b></p>');

        } else if(speed < 11){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#9CFECD;"><b>LIGHT BREEZE</b></p>');

        } else if(speed < 19){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#9CFD9D;"><b>GENTLE BREEZE</b></p>');

        } else if(speed < 28){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#9CFD6F;"><b>MODERATE BREEZE</b></p>');

        } else if(speed < 38){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#CDFD34;"><b>FRESH BREEZE</b></p>');

        } else if(speed < 49){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#FFFD38"><b>STRONG BREEZE</b></p>');

        } else if(speed < 61){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#FFFD38"><b>HIGH WIND, MODERATE GALE, NEAR GALE</b></p>');

        } else if(speed < 74){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#FECB2F"><b>GALE, FRESH GALE</b></p>');

        } else if(speed < 88){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#FD9827"><b>STRONG GALE</b></p>');

        } else if(speed < 102){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#FC6621"><b>STORM, WHOLE GALE</b></p>');

        } else if(speed < 117){
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#FC361D"><b>VIOLENT STORM</b></p>');

        } else {
            $("#weather").append('<p style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:#FC0D1C"><b>HURRICANE FORCE</b></p>');

        }
        $("#weather").append('<p id="speed">'+speed+' km/h</p>');
    });
}

