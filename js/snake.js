var canvas;
var context;
var unitSize = 10;
var INTERVAL = 100;
var snakeHead;
var body;
var xSpeed = unitSize;
var ySpeed = 0;
var LEFT = 37;
var RIGHT = 39;
var UP = 38;
var DOWN = 40;
var RETURN = 13;
var food;
var direction = "horizontal";
var id;
var gameStarted = false;
var highscore = 0;
var score;

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(piece, style){
    context.fillStyle = style;
    context.beginPath();
    context.rect(piece.x, piece.y, unitSize, unitSize);
    context.fill();
}

function drawPiece(p){
    draw(p, 'black')
}

function drawHead(){
    drawPiece(snakeHead);
}

function drawBody(){
    body.forEach(drawPiece);
}

function drawFood(){
    draw(food, 'red');
}

function eat(){
    if (snakeHead.x == food.x && snakeHead.y == food.y){
        score++;
        food = generateFoodPosition();
    }
}

function updateGame(){
    clearCanvas();
    snakeHead.x = snakeHead.x + xSpeed;
    snakeHead.y = snakeHead.y + ySpeed;
    drawHead();
    eat();
    drawFood();
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

function handleKeydown(evt){
    if (gameStarted){
        if (evt.keyCode == LEFT && direction == "vertical"){
            xSpeed -= unitSize;
            ySpeed = 0;
        }
        if (evt.keyCode == RIGHT && direction == "vertical"){
            xSpeed += unitSize;
            ySpeed = 0;
        }
        if (evt.keyCode == UP && direction == "horizontal"){
            xSpeed = 0;
            ySpeed -= unitSize;
        }
        if (evt.keyCode == DOWN && direction == "horizontal"){
            xSpeed = 0;
            ySpeed += unitSize;
        }
    }
    else {
        if (evt.keyCode == RETURN && !gameStarted){
            gameStarted = true;
            startGame();
        }
    }
}

function startGame(){
    clearCanvas();
    snakeHead = {x:0, y:0};
    body = [];
    drawHead();
    drawBody();

    food = generateFoodPosition();
    drawFood();

    id = setInterval(updateGame, INTERVAL);
}

function prepareGame(){
    clearCanvas();
    context.beginPath();
    context.font="30px Georgia";
    var highscoreStr = "Highscore: " + highscore;
    context.fillText(highscoreStr, 110 ,50);
    context.font="15px Verdana";
    context.fillText("- Press RETURN to play -",98, 100 );
    score = 0;
}

window.onload = function(){
    canvas = document.getElementById("mainCanvas");
    context = canvas.getContext('2d');
    prepareGame();
    document.addEventListener('keydown', handleKeydown);
};
