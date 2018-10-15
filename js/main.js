(() => {
  const settings = {
    speed: 20,
    size: 80,
  };

  const game = {
    score: 0,
    pause: false,
  };

  const snake = {
    size: 10,
    arr: [],
    direction: 'r',
  };

  let interval = null;
  let field = [];
  let food = {};

  document.addEventListener('keydown', (e) => { onKey(e); }, false);

  const snakeGround = document.querySelector('.snakeGround');
  const pause = document.querySelector('.pause');
  const score = document.querySelector('.score');

  window.onload = () => {
    snakeGround.style.width = `${settings.size * 10}px`;
    snakeGround.style.height = `${settings.size * 10}px`;
    startGame();
  };

  const onKey = (e) => {
    if (e.which === 40 && snake.direction !== 'd') {
      snake.direction = 'u';
    }
    if (e.which === 38 && snake.direction !== 'u') {
      snake.direction = 'd';
    }
    if (e.which === 37 && snake.direction !== 'r') {
      snake.direction = 'l';
    }
    if (e.which === 39 && snake.direction !== 'l') {
      snake.direction = 'r';
    }
    if (e.keyCode === 32) {
      game.pause = !game.pause;
      pause.style.display = game.pause ? 'block' : 'none';
    }
  };

  const startGame = () => {
    game.pause = false;
    snake.arr = [];
    snake.size = 10;
    game.score = 0;
    snake.direction = 'r';
    field = [];
    score.textContent = '0';

    let randomXPos = Math.floor(Math.random() * settings.size);
    let randomYpos = Math.floor(Math.random() * settings.size);
    for (var i = snake.size - 1; i >= 0; i--) {
      snake.arr.push({x: i + randomXPos, y: randomYpos});
    }
    fill();

    clearInterval(interval);
    interval = setInterval(() => {
      if (!game.pause)
        moveSnake();
    }, 1000 / settings.speed);
  };

  const fill = () => {
    snakeGround.innerHTML = '';
    for (let i = 0; i < settings.size; i++) {
      field[i] = [];
      snakeGround.appendChild(document.createElement('div'));
      snakeGround.lastChild.classList.add('row');

      for (let j = 0; j < settings.size; j++) {
        field[i][j] = snakeGround.lastChild.appendChild(document.createElement('div'));
        snakeGround.lastChild.lastChild.classList.add('pixel');
      }
    }
    placeFood();
  };

  const drawSnake = () => {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => pixel.classList.remove('snake'));
    snake.arr.forEach(item => field[item.y][item.x].classList.add('snake'));
  };

  const moveSnake = () => {
    let sx = snake.arr[0].x;
    let sy = snake.arr[0].y;

    switch(snake.direction) {
      case 'r':
        sx += 1;
        break;
      case 'd':
        sy -= 1;
        break;
      case 'l':
        sx -= 1;
        break;
      case 'u':
        sy += 1;
        break;
    }

    let tail = snake.arr.pop();

    // go thought the walls
    if (sx >= field.length) { sx = 0; }
    if (sx < 0) { sx = field.length - 1; }
    if (sy >= field.length) { sy = 0; }
    if (sy < 0) { sy = field.length - 1; }

    // eat food
    if (sx == food.x && sy == food.y) {
      snake.size += 1;
      snake.arr.push({ x: tail.x, y: tail.y });
      const pixels = document.querySelectorAll('.pixel');
      pixels.forEach(pixel => pixel.classList.remove('food'));
      game.score += 1;
      score.textContent = game.score;
      placeFood();
    }

    tail.x = sx;
    tail.y = sy;

    if (checkGameOver(tail)) {
      snake.arr = [];
      startGame();
    } else {
      snake.arr.unshift(tail);
      drawSnake();
    }
  };

  const placeFood = () => {
    do {
      food = getRandomFoodPlace();
    } while (checkGameOver(food));
    field[food.y][food.x].classList.add('food');
  }

  const getRandomFoodPlace = () => ({
    x: Math.floor(Math.random() * settings.size),
    y: Math.floor(Math.random() * settings.size),
  });

  const checkGameOver = head => snake.arr.some(item => item.x === head.x && item.y === head.y);
;
})();
