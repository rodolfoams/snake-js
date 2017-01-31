var canvas;
var context;
var unitSize = 10;
var snakeHead;
var xSpeed = unitSize;
var ySpeed = 0;
var left = 37;
var right = 39;
var up = 38;
var down = 40;
var food;
var direction = "horizontal";

function draw(piece, style){
    context.fillStyle = style;
    context.beginPath();
    context.rect(piece.x, piece.y, unitSize, unitSize);
    context.fill();
}

function updateGame(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    snakeHead.x = snakeHead.x + xSpeed;
    snakeHead.y = snakeHead.y + ySpeed;
    draw(snakeHead, "black");
    draw(food, "red");
    if (xSpeed != 0) direction = "horizontal";
    if (ySpeed != 0) direction = "vertical";
}

function generateRandomPosition(){
    numColumns = canvas.width/unitSize;
    numRows = canvas.height/unitSize;
    var posX = Math.floor(Math.random() * numColumns) * unitSize;
    var posY = Math.floor(Math.random() * numRows) * unitSize;
    return {x:posX, y:posY};
}

function generateFoodPosition(){
    newPos = snakeHead;
    while (newPos.x == snakeHead.x && newPos.y == snakeHead.y){
        newPos = generateRandomPosition();
    }
    return newPos;
}

function handleKeyPress(evt){
    if (evt.keyCode == left && direction == "vertical"){
        xSpeed -= unitSize;
        ySpeed = 0;
    }
    if (evt.keyCode == right && direction == "vertical"){
        xSpeed += unitSize;
        ySpeed = 0;
    }
    if (evt.keyCode == up && direction == "horizontal"){
        xSpeed = 0;
        ySpeed -= unitSize;
    }
    if (evt.keyCode == down && direction == "horizontal"){
        xSpeed = 0;
        ySpeed += unitSize;
    }
}

function startGame(){
    snakeHead = {x:0, y:0};
    draw(snakeHead, "black");

    food = generateFoodPosition();
    draw(food, "red");

    setInterval(updateGame, 300);
}

window.onload = function(){
    canvas = document.getElementById("mainCanvas");
    context = canvas.getContext('2d');
    startGame();
    document.addEventListener('keydown', handleKeyPress);
};
