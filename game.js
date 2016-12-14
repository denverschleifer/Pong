/*
Problem Statement:

Create a game with a grid that has two paddles and a sphere that moves when it hits a paddle. Make the ball reset if the player or cpu misses the ball. The grid that has two paddles on each side of the screen. On one side of the screen, make the first paddle moveable with your computer mouse. Put the first paddle on the left side of the grid. Make the second paddle on the right side of the grid that is controlled by a computer player. Begin making the sphere for the two paddles to play with. Make an appropriate speed for the ball traveling when bouncing from paddle to paddle. 
This game should run just like the Atari game “Pong”.  When opened, this game will start with the ball at (0,0) and will go towards the cpu player and eventually find its way back to the human player. 

Nouns: paddle 1, paddle 2, ball, grid

Verbs: bouncing, mouse, computer movement, collison 

Test Plans: for frames per second of cpu player and ball

If I change The value of framesPerSecond it will change the speed of the ball and cpu player	
The framesPerSecond variable is set to 30.
setInterval(function () {
			moveEverything();
			drawEverything();
		}, 700 / framesPerSecond);
		
Expected: 700 / 30 = 23.3 frames per second
Output: 700 / 30 = 23.3 frames per second as calculated in the fuction. 

setInterval(function () {
			moveEverything();
			drawEverything();
		}, 1000 / framesPerSecond);
		
Expected: 1000 / 30 = 33.3 frames per second
Output: 1000 / 30 = 33.3 frames per second as calculated in the fuction.

Test Plans: For the function drawEverything

function drawEverything() {
	colorRect(0, 0, canvas.width, canvas.height, 'salmon'); 
	colorRect(canvas.width - paddleThick, paddle2Y, paddleThick, paddleHeight, 'grey');
	colorCircle(ballX, ballY, 10, 'grey');
}

Expected: If the first colorRect has the inputs of (100,100) and the colorCircle has a 10px size, the ball will be 10px big and the paddles will move up coloring past the grid along with the ball. 
Output: The ball bounces out of the grid and colors the background. The ball is 10px big. The paddles went above the grid and left their color on the backgroun. 

Expected: If the first colorRect has the inputs of (0,0) and the colorCircle has a 25px size, the ball will be 10px big and the paddles will move up coloring past the grid along with the ball. 
Output: The ball will be 25px big and will start at (0,0) and the paddles won't go above the grid leaving their color behind. 


Pseudocode:

BEGIN
	Init the variables 
	
	Init the constants
	
	Call the funciton: calculateMousePos
	x: mouseX
	y: mouseY
	
	Call the window.addEventListener = function:
	Gets the canvas id 'gameCanvas'
	Gets the context of the canvas ('2d');
	Sets a variable for framesPerSecond
	
	Call the function: Ball Reset
	ballSpeedX = -ballSpeedX
	ballX = canvas.width / 2
	ballY = canvas.height / 2
	
	Computer Movement:
	if (paddle2YCenter < ballY - 30)
		paddle2Y += 6;
	else if (paddle2YCenter < ballY + 30)
		paddle2Y -= 6;
		
	Move Everything:	
	if (ballX > canvas.width) 
		if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight)
			ballSpeedX = -ballSpeedX;
		else 
			ballReset();
			
	if (ballX < 0) 
		if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) 
			ballSpeedX = -ballSpeedX;
		else 
			ballReset();
		
	if (ballY > canvas.height) 
		ballSpeedY = -ballSpeedY;
	if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
		
	Call the funciton: colorCircle
	canvasContext.fillstyle = drawColor
	canvasContext.beginPath()
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
	canvasContext.fill()
	
	Call the function: colorRect
	canvasContext.fillStyle = drawColor
	canvasContext.fillRect(leftX, topY, width, height)
END

*/
// Handles the information on the dimension on the display area
var canvas;
// Graphical information to draw to 
var canvasContext;
// Means the x coordinate of the ball.  
var ballX = 50;
// This will be presented as the speed for the ball
var ballSpeedX = 10;
// Means the y coordinat of the ball. 
var ballY = 50;
// This will be presented as the speed for the ball
var ballSpeedY = 3;
// 
var paddle1Y = 250;
var paddle2Y = 250;
// constant... this won't change
const paddleThick = 10;
const paddleHeight = 100;
/* Calculates the mouse position
evt "event"
This function will fire each time the mouse moves. */
function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX
		, y: mouseY
	};
}
// Added addEventListener to window because window.onload wasn't supportive to Chrome
window.addEventListener = function () {
		// Corresponds to the canvas Id in the HTML file
		canvas = document.getElementById('gameCanvas');
		canvasContext = canvas.getContext('2d');
		var framesPerSecond = 30;
		/* Sets a timer
		Every one second, it will call the drawEverything function.
		Can't be moved anywhere else*/
		setInterval(function () {
			moveEverything();
			drawEverything();
			// Frames per second for the ball and cpu
		}, 700 / framesPerSecond);
		/* evt mouses information to calcualte the mouse position. 
		Returns y position of the mouse coordinate. */
		canvas.addEventListener('mousemove', function (evt) {
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (paddleHeight / 2)
		});
	}
	// This will reset the ball when it touches the edges of the canvas 
function ballReset() {
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
}

// Function calculates the computer movement 
function computerMovement() {
	var paddle2YCenter = paddle2Y + (paddleHeight / 2);
	if (paddle2YCenter < ballY - 30) {
		paddle2Y += 6;
	}
	else if (paddle2YCenter < ballY + 30) {
		paddle2Y -= 6;
	}
}

function moveEverything() {
	computerMovement()
		// The value on the right side and saves it into the label on the left
	ballX += ballSpeedX;
	// The value on the right side and saves it into the label on the left
	ballY += ballSpeedY;
	// If ballX is greater than the width, this will make it bounce back from the right
	if (ballX > canvas.width) {
		if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
			ballSpeedX = -ballSpeedX;
		}
		else {
			ballReset();
		}
	}
	// If ballX is less than 0 on the canvas, it will bounce back from the left
	if (ballX < 0) {
		if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
			ballSpeedX = -ballSpeedX;
		}
		else {
			ballReset();
		}
	}
	// If ballY is greater than the height, it will bounce up
	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
	// // If ballY is less than the height, it will bounce down
	if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
}
// This will be used as a label to call it anywhere else in the code
function drawEverything() {
	/* Fills the canvas with a color.
	0,0 are x,y coordinates on the top left... 
	canvas.width = 800px 
	canvas.height = 600px
	Adding values to fillRect can draw on rectangle within the canvas */
	colorRect(0, 0, canvas.width, canvas.height, 'salmon');
	// Creates the white rectangle at the given position (left player) 
	colorRect(0, paddle1Y, paddleThick, paddleHeight, 'grey');
	// Creates the white rectangle at the given position (right player)
	colorRect(canvas.width - paddleThick, paddle2Y, paddleThick, paddleHeight, 'grey');
	/* Creates the ball and gives it a white color
	The ball will be able to move up, down, left, or right depending on where it hits */
	colorCircle(ballX, ballY, 10, 'grey');
}
// This function creates the ball, its color, and where it starts. (x,y) top left of grid. 
function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}
// This function creates and fills in the rectangle 
function colorRect(leftX, topY, width, height, drawColor) {
	// drawColor is the string
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}