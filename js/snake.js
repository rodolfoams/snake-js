var canvas;
var context;
var unitSize = 10;
var snakeHead;
var xSpeed = unitSize;
var ySpeed = 0;

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
}

function startGame(){
    canvas = document.getElementById("mainCanvas");
    context = canvas.getContext('2d');
    
    snakeHead = {x:0, y:0};
    draw(snakeHead);
    setInterval(updateGame, 300);
}
