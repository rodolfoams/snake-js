var canvas;
var context;
var unitSize = 20;
var unitOffset = 1;
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
var hasEaten = false;
var direction = "horizontal";
var id;
var gameStarted = false;
var highscore = 0;
var score;
var hasBeatenHighscore = false;

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(piece, style){
    context.fillStyle = style;
    context.beginPath();
    context.rect(piece.x+unitOffset, piece.y + unitOffset,
                 unitSize- 2*unitOffset, unitSize-2*unitOffset);
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
    dx = xSpeed;
    dy = ySpeed;
    if (snakeHead.x + dx == food.x && snakeHead.y + dy == food.y){
        score++;
        food = generateFoodPosition();
        body.push({x: snakeHead.x, y:snakeHead.y});
        snakeHead = {x: snakeHead.x + dx, y: snakeHead.y + dy};
        hasEaten = true;
    }
}

function updateBody(){
    if (body.length == 0) return;
    var i=0;
    while (i<body.length-1){
        var tmp = body[i+1];
        body[i] = { x:tmp.x, y:tmp.y };
        i++;    
    }
    body[i] = { x:snakeHead.x, y:snakeHead.y};
}

function gameOver(){
    if (snakeHead.x < 0 || snakeHead.x >= canvas.width || 
        snakeHead.y < 0 || snakeHead.y >= canvas.height) return true;

    for (var i = 0; i<body.length; i++){
        if (snakeHead.x == body[i].x && snakeHead.y == body[i].y) return true;
    }
    return false;
}

function updateGame(){
    clearCanvas();
    eat();
    if (!hasEaten){
        updateBody();
        snakeHead.x = snakeHead.x + xSpeed;
        snakeHead.y = snakeHead.y + ySpeed;
    }
    if (gameOver()){
        clearInterval(id);
        if (score > highscore) {
            highscore = score;
            hasBeatenHighscore = true;
        }
        prepareGame();
        return;
    }
    drawHead();
    drawBody();
    drawFood();
    if (xSpeed != 0) direction = "horizontal";
    if (ySpeed != 0) direction = "vertical";
    hasEaten = false;
}

function generateRandomPosition(){
    numColumns = canvas.width/unitSize;
    numRows = canvas.height/unitSize;
    var posX = Math.floor(Math.random() * numColumns) * unitSize;
    var posY = Math.floor(Math.random() * numRows) * unitSize;
    return {x:posX, y:posY};
}

function isFree(pos){
    if (pos.x == snakeHead.x && pos.y == snakeHead.y) return false;
    for (var i=0; i<body.length; i++){
        if (pos.x == body[i].x && pos.y == body[i].y) return false;
    }
    return true;
}

function generateFoodPosition(){
    newPos = snakeHead;
    while (!isFree(newPos)){
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
    food = generateFoodPosition();

    drawHead();
    drawBody();
    drawFood();

    id = setInterval(updateGame, INTERVAL);
}

function prepareGame(){
    clearCanvas();
    context.beginPath();
    context.fillStyle = "black";
    gameStarted = false;
    xSpeed = unitSize;
    ySpeed = 0;
    if (hasBeatenHighscore){
        context.font = "20px Arial";
        context.fillText("New record!", 145, 30);
    }
    context.font="30px Georgia";
    var highscoreStr = "Highscore: " + highscore;
    context.fillText(highscoreStr, 110 ,80);
    context.font="15px Verdana";
    context.fillText("- Press RETURN to play -",98, 130 );
    score = 0;
    hasBeatenHighscore = false;
}

window.onload = function(){
    canvas = document.getElementById("mainCanvas");
    context = canvas.getContext('2d');
    prepareGame();
    document.addEventListener('keydown', handleKeydown);
};
