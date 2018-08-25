$(document).ready(function () { 
    var size = 50;
    var arr = [];
    var direction = 'r';
    var snakeSize = 5;
    var field = [];
    var gameSpeed = 10;

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
    });

    
    (function Init() { 
        for(var i = snakeSize - 1; i >= 0; i--){
            arr.push({x: i, y: 0});
        }
        fill();

        setInterval(() => {moveSnake();}, 1000 / gameSpeed);
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
            case 'r': {
                sx++;
                break;
            }
            case 'd': {
                sy--;
                break;
            }
            case 'l': {
                sx--;
                break;
            }
            case 'u': {
                sy++;
                break;
            }
        }

        var tail = arr.pop();
        tail.x = sx;
        tail.y = sy;
        arr.unshift(tail);

        drawSnake();
    }
});