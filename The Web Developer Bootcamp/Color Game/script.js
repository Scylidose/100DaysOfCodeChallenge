var colors = generateRandomColors(6);

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("pickedColor");
var messageDisplay = document.querySelector("#message");
var header = document.querySelector(".header");
var resetButton = document.querySelector("#reset");

var score = 0;
var attempts = 5;
var reseted = true;

resetButton.addEventListener("click", function () {
	colors = generateRandomColors(6);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.border = "2px white solid";
		squares[i].style.opacity = 500;
	}
	header.style.backgroundColor = "#232323";
	reseted = true;
	if (attempts == 0) {
		attempts = 5;
		$("#lives").text(attempts);
		score = 0;
		$("#number").text(score);
	}
});

colorDisplay.textContent = pickedColor;

for (var i = 0; i < squares.length; i++) {

	squares[i].style.backgroundColor = colors[i];

	squares[i].addEventListener("click", function () {
		var clickedColor = this.style.backgroundColor;

		if (clickedColor === pickedColor) {
			if (reseted) {
				score++;
				$("#number").text(score);
			}
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again?";
			changeColors(clickedColor);
			header.style.backgroundColor = clickedColor;
			reseted = false;
		} else {
			$(this).fadeTo(500, 0, function () {
				this.style.backgroundColor = "#232323";
				this.style.border = "2px #232323 solid";
			});
			messageDisplay.textContent = "Try Again";
			if(attempts > 0){
				attempts--;

			}

			$("#lives").text(attempts);
			if (attempts == 0) {
				messageDisplay.textContent = "Game Over!";
				changeColors("#232323");
				for (var i = 0; i < squares.length; i++) {
					squares[i].style.border = "2px #232323 solid";
				}
			}
		}
	});
}

function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
		squares[i].style.border = "2px white solid";
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor() {
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}
