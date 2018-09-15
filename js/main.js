let settings = {
    speed: 20,
    size: 80
};

let game = {
    score: 0,
    pause: false
};

let snake = {
    size: 10,
    arr: [],
    direction: 'r'
};

let  interval;
let field = [];
let food = {};


$(document).ready(function () { 

    $('#snakeGround').css({
        'width': settings.size * 10,
        'height': settings.size * 10
    });

    $('html').keydown(function(e){
        if(e.which === 40 && snake.direction !== 'd')
            snake.direction = 'u';
        else if(e.which === 38 && snake.direction !== 'u')
            snake.direction = 'd';
        else if(e.which === 37 && snake.direction !== 'r')
            snake.direction = 'l';
        else if(e.which === 39 && snake.direction !== 'l')
            snake.direction = 'r';
        else if(e.which === 32){
            game.pause = !game.pause;
            $('.pause').toggle(game.pause);
        }
    });

    startGame();
});

function startGame() { 
    game.pause = false;
    snake.arr = [];
    snake.size = 10;
    game.score = 0;
    snake.direction = 'r';
    field = [];
    $('.score').html(0);

    let randomXPos = Math.floor(Math.random() * settings.size);
    let randomYpos = Math.floor(Math.random() * settings.size);
    for(var i = snake.size - 1; i >= 0; i--){
        snake.arr.push({x: i + randomXPos, y: randomYpos});
    }
    fill();

    clearInterval(interval);
    interval = setInterval(() => {
        if(!game.pause)
            moveSnake();
    }, 1000 / settings.speed);
}

function fill(){
    $('#snakeGround').html('');
    for(let i = 0; i < settings.size; i++){
        field[i] = [];
        row = $("<div>", { 'class': 'row' }).appendTo("#snakeGround");

        for(let j = 0; j < settings.size; j++){
            field[i][j] = $("<div>", { 'class': 'pixel' }).appendTo(row);                
        }
    }
    placeFood();
}

function drawSnake(){
    $(".pixel").removeClass('snake');

    for(let i = 0; i < snake.size; i++){
        field[snake.arr[i].y][snake.arr[i].x].addClass('snake');
    }
}

function moveSnake(){
    let sx = snake.arr[0].x;
    let sy = snake.arr[0].y;

    switch(snake.direction){
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

    let tail = snake.arr.pop();

    // go thought the walls
    if(sx >= field.length)
        sx = 0;

    if(sx < 0)
        sx = field.length - 1;
    
    if(sy >= field.length)
        sy = 0;
    
    if(sy < 0)
        sy = field.length - 1;

    // eat food
    if (sx == food.x && sy == food.y) {
        snake.size++;
        snake.arr.push({ x: tail.x, y: tail.y });
        $(".pixel").removeClass('food');
        game.score++;
        $('.score').text(game.score);
        placeFood();
    }
    
    tail.x = sx;
    tail.y = sy;
    
    if(checkGameOver(tail)){
        snake.arr = [];
        startGame();
    } else {
        snake.arr.unshift(tail);
        drawSnake();
    }
}

function placeFood(){
    do {
        food = getRandomFoodPlace();
    } while (checkGameOver(food));
    field[food.y][food.x].addClass('food');
}

function getRandomFoodPlace(){
    return {
        x: Math.floor(Math.random() * settings.size), 
        y: Math.floor(Math.random() * settings.size)
    };
}

function checkGameOver(head){
    for(let i = 0; i < snake.arr.length; i++){
        if(snake.arr[i].x === head.x && snake.arr[i].y === head.y){
            return true;
        }
    }

    return false;
}