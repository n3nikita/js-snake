$(document).ready(function () { 
    var size = 70;
    var arr = [];
    var direction = 'r';
    var snakeSize = 5;
    var field = [];
    var gameSpeed = 10;
    var food = {};
    var pause = false;

    $('#snakeGround').css({
        'width': size * 10,
        'height': size * 10
    });

    $('html').keydown(function(e){
        if(e.which === 40)
            direction = 'u';
        else if(e.which === 38)
            direction = 'd';
        else if(e.which === 37)
            direction = 'l';
        else if(e.which === 39)
            direction = 'r';
        else if(e.which === 32)
            pause = !pause;
    });

    
    (function Init() { 
        for(var i = snakeSize - 1; i >= 0; i--){
            arr.push({x: i, y: 0});
        }
        fill();

        
        setInterval(() => {
            if(!pause)
                moveSnake();
        }, 1000 / gameSpeed);
    })();

    function fill(){
        $('#snakeGround').html('');

        for(var i = 0; i < size; i++){
            field[i] = [];
            row = $("<div>", { 'class': 'row' }).appendTo("#snakeGround");

            for(var j = 0; j < size; j++){
                field[i][j] = $("<div>", { 'class': 'pixel' }).appendTo(row);                
            }
        }
        placeFood();
    }

    function drawSnake(){
        $(".pixel").removeClass('snake');

        for(var i = 0; i < snakeSize; i++){
            field[arr[i].y][arr[i].x].addClass('snake');
        }
    }

    function moveSnake(){
        var sx = arr[0].x;
        var sy = arr[0].y;

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

        var tail = arr.pop();

        // eat food
        if(sx == food.x && sy == food.y){
            snakeSize++;
            arr.push({x: tail.x, y: tail.y});
            $(".pixel").removeClass('food');
            placeFood();
        }

        // go thought the walls
        if(sx >= 70)
            sx = 0;

        if(sx < 0)
            sx = 69;
        
        if(sy >= 70)
            sy = 0;
        
        if(sy < 0)
            sy = 69;
        

        tail.x = sx;
        tail.y = sy;
        arr.unshift(tail);
        drawSnake();
    }

    function placeFood(){
        food = {x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size)};
        field[food.y][food.x].addClass('food');
    }
});