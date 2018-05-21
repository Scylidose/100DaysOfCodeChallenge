var numSquares = 9;

var colors = [];

var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("pickedColor");
var messageDisplay = document.querySelector("#message");
var header = document.querySelector(".header");
var resetButton = document.querySelector("#reset");

var modeButtons = document.querySelectorAll(".mode");

var score = 0;
var attempts = 5;
var reseted = true;

init();

function init() {
	
	setUpButtons();

	setUpSquares();

	reset();
}

function setUpButtons(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function () {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");

			if (this.textContent === "EASY") {
				numSquares = 3;
			} else if (this.textContent === "MEDIUM") {
				numSquares = 6;
			} else {
				numSquares = 9;
			}

			attempts = 5;
			score = 0;
			$("#number").text(score);
			$("#lives").text(attempts);

			reset();
		});
	}
}

function setUpSquares(){
	for (var i = 0; i < squares.length; i++) {
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
				this.style.backgroundColor = "#232323";
				this.style.border = "2px #232323 solid";
				messageDisplay.textContent = "Try Again";
				if (attempts > 0) {
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
}

resetButton.addEventListener("click", function () {
	reset();
})

function reset() {

	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";

	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.border = "2px white solid";
		} else {
			squares[i].style.display = "none";
		}
	}
	header.style.backgroundColor = "#232323";
	reseted = true;
	if (attempts == 0) {
		attempts = 5;
		$("#lives").text(attempts);
		score = 0;
		$("#number").text(score);
	}
}

colorDisplay.textContent = pickedColor;

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
