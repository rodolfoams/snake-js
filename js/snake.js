function startGame(){
    var canvas = document.getElementById("mainCanvas");
    var context = canvas.getContext('2d');
    
    snakeHead = {x:0, y:0};
    context.fillStyle = "black";
    context.beginPath();
    context.rect(snakeHead.x, snakeHead.y, 10, 10);
    context.fill();
}
