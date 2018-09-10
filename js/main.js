// TODO: Add Pause/GameOver animation
// TODO: Fix food spawn, don't spawn food on the snake
// TODO: Display score
// TODO: Spawn snake at random position

const gameSpeed = 20, size = 80;

let arr, direction, snakeSize, pause, interval, score;
let field = [];
let food = {};


$(document).ready(function () { 

    $('#snakeGround').css({
        'width': size * 10,
        'height': size * 10
    });

    $('html').keydown(function(e){
        if(e.which === 40 && direction !== 'd')
            direction = 'u';
        else if(e.which === 38 && direction !== 'u')
            direction = 'd';
        else if(e.which === 37 && direction !== 'r')
            direction = 'l';
        else if(e.which === 39 && direction !== 'l')
            direction = 'r';
        else if(e.which === 32)
            pause = !pause;
    });

    startGame();
});

function startGame() { 
    pause = false;
    arr = [];
    snakeSize = 10, score = 0;
    direction = 'r';
    field = [];
    for(var i = snakeSize - 1; i >= 0; i--){
        arr.push({x: i, y: 0});
    }
    fill();

    clearInterval(interval);
    interval = setInterval(() => {
        if(!pause)
            moveSnake();
    }, 1000 / gameSpeed);
}

function fill(){
    $('#snakeGround').html('');
    for(let i = 0; i < size; i++){
        field[i] = [];
        row = $("<div>", { 'class': 'row' }).appendTo("#snakeGround");

        for(let j = 0; j < size; j++){
            field[i][j] = $("<div>", { 'class': 'pixel' }).appendTo(row);                
        }
    }
    placeFood();
}

function drawSnake(){
    $(".pixel").removeClass('snake');

    for(let i = 0; i < snakeSize; i++){
        field[arr[i].y][arr[i].x].addClass('snake');
    }
}

function moveSnake(){
    let sx = arr[0].x;
    let sy = arr[0].y;

    switch(direction){
        case 'r': 
            sx++;
            break;
        case 'd': 
            sy--;
            break;
        case 'l': 
            sx--;
            break;
        case 'u': 
            sy++;
            break;
    }

    let tail = arr.pop();

    // eat food
    if(sx == food.x && sy == food.y){
        snakeSize++;
        arr.push({x: tail.x, y: tail.y});
        $(".pixel").removeClass('food');
        score++;
        console.log(score);
        placeFood();
    }

    // go thought the walls
    if(sx >= field.length)
        sx = 0;

    if(sx < 0)
        sx = field.length - 1;
    
    if(sy >= field.length)
        sy = 0;
    
    if(sy < 0)
        sy = field.length - 1;
    

    tail.x = sx;
    tail.y = sy;
    
    if(checkGameOver(tail)){
        arr = [];
        startGame();
    } else {
        arr.unshift(tail);
        drawSnake();
    }
}

function placeFood(){
    food = {x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size)};
    field[food.y][food.x].addClass('food');
}

function checkGameOver(head){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].x === head.x && arr[i].y === head.y){
            return true;
        }
    }

    return false;
}