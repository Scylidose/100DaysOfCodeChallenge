var deVinci = ["Painting is poetry which is seen and not heard, and poetry is a painting which is heard but not seen.", "Let no man who is not a Mathematician read the elements of my work.", "As a well-spent day brings happy sleep, so life well used brings happy death.", "He who does not punish evil commands that it be done.", "Poor is the pupil that does not surpass his master."];
deVinci.name = "deVinci";

var einstein = ["Few are those who see with their own eyes and feel with their own hearts.", "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.", "Great spirits have always encountered violent opposition from mediocre minds.", "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid.", "Life is like riding a bicycle. To keep your balance you must keep moving."];
einstein.name = "einstein";

var freud = ["The mind is like an iceberg, it floats with one-seventh of its bulk above water.", "I prefer the company of animals more than the company of humans. Certainly, a wild animal is cruel. But to be merciless is the privilege of civilized humans.", "We are what we are because we have been what we have been.", "Out of your vulnerabilities will come your strength."];
freud.name = "freud";

var pythagore = ["A fool is known by his speech and a wise man by silence.", "Lust weakens both body and mind.", "Educate the children and it won't be necessary to punish the men.", "The oldest, shortest words - 'yes' and 'no' - are those which require the most thought."];
pythagore.name = "pythagore";

var quotes = [deVinci, einstein, freud, pythagore];

function getQuotes() {
    var tab = quotes[Math.floor(Math.random() * quotes.length)];

    $("#phrase").text(tab[Math.floor(Math.random() * tab.length)]);

    $(".image").remove();
    $("#profil").prepend('<img class="image" src="img/' + tab.name + '.jpg">');
}