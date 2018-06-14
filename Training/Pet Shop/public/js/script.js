var verif = false;
var route = "/ajax-fail";

function valider() {
    var nom = $("#nom").val();
    var prenom = $("#prenom").val();
    var utilisateur = $("#utilisateur").val();
    var telephone = $("#telephone").val();
    var adresse = $("#adresse").val();
    var courriel = $("#courriel").val();
    var courriel2 = $("#courriel2").val();
    var passe = $("#password").val();

    var verif_courriel = false;
    for (var i = 1; i < len(courriel); j++) {
        if (courriel.charAt(i) == '@') {
            verif_courriel = true;
        }
    }

    var verif_telephone = true;
    for (var i = 0; i < len(telephone); i++) {
        if (telephone[i].isNaN) {
            verif_telephone = false;
        }
    }

    if (nom == "" || prenom == "" || utilisateur == "" || telephone == "" ||
        adresse == "" || courriel == "" || courriel2 == "" || passe == "") {
        $("#champs_vides").attr("display", "block");
        return false;
    } else if (!verif_courriel) {
        $("#courriel_inval").attr("display", "block");
        return false;
    } else if (!verif_telephone) {
        $("#telephone_inval").attr("display", "block");
        return false;
    } else if (courriel != courriel2) {
        $("#courriel_diff").attr("display", "block");
        return false;
    } else if (len(courriel) > 254 || len(telephone) > 22) {
        $("#champs_long").attr("display", "block");
    } else {
        return true;
    }
}

function verifCourriel() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("ajax-bloc").innerHTML = xhr.responseText;
                route = "/ajax-success";
                verif = true;
            }
        }
    };
    xhr.open("GET", route, true);
    xhr.send();
    return verif;
}