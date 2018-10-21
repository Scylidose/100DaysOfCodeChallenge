var zmq = require('zmq'),
    publisher = zmq.socket('pub');

var request = require("request")


setInterval(() => {
    request({
        url: 'https://fcc-weather-api.glitch.me/api/current?lat=45.509498&lon=-73.569394',
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            publisher.send(["weather", body.weather[0].description]);
            publisher.send(["temperature", body.main.temp]);
            publisher.send(["humidity", body.main.humidity]);
            publisher.send(["wind", body.wind.speed]);
        } else {
            console.log("Error something bad occured", error);
        }
    })
}, 2000);