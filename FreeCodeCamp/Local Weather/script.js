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
        $("#weather p").text(temp.toFixed(2) + ' °C');
        celsius = false;
    } else {
        $("#weather p").text((temp * (9 / 5) + 32).toFixed(2) + ' °F');
        celsius = true;
    }
}

function showPosition(position) {
    $.getJSON('https://fcc-weather-api.glitch.me/api/current?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude, function (data) {
        $("#weather").prepend('<img src=\"' + data.weather[0].icon + '\">');
        temp = data.main.temp;
        setDegrees();
    });
}

