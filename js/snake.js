var canvas;
var context;
var unitSize = 10;
var snakeHead;
var xSpeed = unitSize;
var ySpeed = 0;
var food;

function draw(piece){
    context.fillStyle = "black";
    context.beginPath();
    context.rect(piece.x, piece.y, unitSize, unitSize);
    context.fill();
}

function updateGame(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    snakeHead.x = snakeHead.x + xSpeed;
    snakeHead.y = snakeHead.y + ySpeed;
    draw(snakeHead);
    draw(food);
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

function startGame(){
    canvas = document.getElementById("mainCanvas");
    context = canvas.getContext('2d');
    
    snakeHead = {x:0, y:0};
    draw(snakeHead);

    food = generateFoodPosition();
    draw(food);

    setInterval(updateGame, 300);
}
