var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HIGHT = canvas.height;
var BOX_SIZE = 20;
var NBR_BOX_H = SCREEN_WIDTH / BOX_SIZE;
var NBR_BOX_V = SCREEN_HIGHT / BOX_SIZE;

var score = 0;
var oldScore = 0;

var directions = {up: 38, down: 40, left: 37, right: 39};

var snake;
var food;
var dir;


function init() {
	snake = [];
	snake.push({posx: 4, posy: 4});
	dir = directions.right;
	food = {posx: 2, posy: 2};
	oldScore = score;
	score = 0;
}

init();

function keyBoardHandler(event) {
	console.log(event.keyCode);
	dir = event.keyCode;
}

document.addEventListener("keydown", keyBoardHandler);

function clearScreen() {
	ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HIGHT);
}


function drawGrid() {
	for(var i = 0; i < NBR_BOX_V; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i * BOX_SIZE);
		ctx.lineTo(SCREEN_WIDTH , i * BOX_SIZE);
		ctx.stroke();
	}
	for(var i = 0; i < NBR_BOX_H; i++) {
		ctx.beginPath();
		ctx.moveTo(i * BOX_SIZE, 0);
		ctx.lineTo(i * BOX_SIZE, SCREEN_HIGHT);
		ctx.stroke();
	}
}

function drawSnake() {
	ctx.fillStyle = "red";
	for(var i = 0; i < snake.length; i++) {
		ctx.fillRect(snake[i].posx * BOX_SIZE, snake[i].posy * BOX_SIZE, BOX_SIZE , BOX_SIZE);
	}	
}

function drawFood() {
	ctx.fillStyle = "yellow";
	ctx.fillRect(food.posx * BOX_SIZE, food.posy * BOX_SIZE, BOX_SIZE , BOX_SIZE);	
}


function drawScore() {
	document.getElementById("score").innerHTML = score;
	document.getElementById("oldScore").innerHTML = oldScore;
}

function updateSnake() {
	var queue = snake[snake.length -1];
	queue.posx = snake[0].posx;
	queue.posy = snake[0].posy;
	snake.pop();
	switch(dir) {
		case directions.left:
			queue.posx--;
			break;
		case directions.right:
			queue.posx++;
			break;
		case directions.down:
			queue.posy++
			break;
		case directions.up:
			queue.posy--;
			break;
	}
	if(queue.posx >= NBR_BOX_H) {
		queue.posx = 0;
	}
	if(queue.posx < 0) { 
		queue.posx = NBR_BOX_H -1;
	}
	if(queue.posy >= NBR_BOX_V) {
		queue.posy = 0;
	}
	if(queue.posy < 0) { 
		queue.posy = NBR_BOX_V -1;
	}
	snake.unshift(queue);
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function generateFood() {
	food.posx = getRandomInt(NBR_BOX_H);
	food.posy = getRandomInt (NBR_BOX_V);
}

function checkCollisionWithFood() {
	if(snake[0].posx == food.posx && snake[0].posy == food.posy) {
		snake.push({posx: -1, posy: -1});
		score++;
		generateFood();
	}
}

function checkCollisionWithBody() {
	var head = snake[0];
	if(snake.length > 1) {
		for(var i = 1; i < snake.length; i++) {
			if(snake[i].posx == head.posx && snake[i].posy == head.posy) {
				init();
				break;
			}
		}
	}
}

function gameLoop() {
	clearScreen();
	updateSnake();
	drawGrid();
	drawSnake();
	drawFood();
	drawScore();
	checkCollisionWithFood();
	checkCollisionWithBody();
}

setInterval(gameLoop, 100);