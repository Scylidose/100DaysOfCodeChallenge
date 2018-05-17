var users = ["freecodecamp", "nerddowndillon", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "OgamingSC2", "cretetion"];

$(document).ready(function () {

    for (var i = 0; i < users.length; i++) {
        var utilisateur = users[i];

        $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + utilisateur, function (data) {
            if (data.stream != null) {
                $("#live").append("<div class='user img-fluid' style='background-image:url(" + data.stream.preview.medium + ")'><a target='_blank' href=" + data.stream.channel.url + "><h5>" + data.stream.channel.display_name + "</h5><p>" + data.stream.channel.status + "</p></a></div>");
            } else {
                var lastword = data._links.self.split("/").pop();
                $("#live").append("<div class='user img-fluid' style='background-image:url(img/twitch-offline.jpg)'><a target='_blank' href='https://www.twitch.tv/" + lastword + "'><h5>" + lastword + "</h5></a></div>");
            }
        });
    }
    $("#search").fadeIn(2000);
    $("#live").fadeIn(5000);

    $("#search").submit(function (e) {
        e.preventDefault();
        $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + $("#words").val(), function (data) {
            $(".user").remove();
            if (data.stream != null) {
                $("#live").append("<div class='user img-fluid' style='background-image:url(" + data.stream.preview.medium + ")'><a target='_blank' href=" + data.stream.channel.url + "><h5>" + data.stream.channel.display_name + "</h5><p>" + data.stream.channel.status + "</p></a></div>").hide().fadeIn(1000);
            } else {
                var lastword = data._links.self.split("/").pop();
                $("#live").append("<div class='user img-fluid' style='background-image:url(img/twitch-offline.jpg)'><a target='_blank' href='https://www.twitch.tv/" + lastword + "'><h5>" + lastword + "</h5></a></div>").hide().fadeIn(1000);
            }
        });
    });

});

