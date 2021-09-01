const COLORS = {
  BLACK: 'black',
  GREEN: 'green',
  RED: 'red',
  SLATE_GREY: 'slategrey'
};

const COLOR_APPLICATIONS = {
  BOARD_BORDER: COLORS.BLACK,
  BOARD_BACKGROUND: COLORS.SLATE_GREY,
  SNAKE_COLOR: COLORS.GREEN,
  SNAKE_BORDER: COLORS.BLACK,
  APPLE_COLOR: COLORS.RED,
  APPLE_BORDER: COLORS.BLACK
};

let dx = 10;
let dy = 0;
let apple_x;
let apple_y;
let score = 0;

let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200},
];

const gameboard = document.getElementById('gameboard');

const gameboard_ctx = gameboard.getContext("2d");

main();

document.addEventListener('keydown', direction)

generate_apple();

function main() {
  if (gameover()) return;

  setTimeout(function onTick() {
    clearCanvas();
    drawApple();
    move_snake();
    drawSnake();
    main();
  }, 100)
}
// Initial game state
function clearCanvas () {
  gameboard_ctx.fillStyle = COLOR_APPLICATIONS.BOARD_BACKGROUND;
  gameboard_ctx.strokestyle = COLOR_APPLICATIONS.BOARD_BORDER;
  gameboard_ctx.fillRect(0, 0, gameboard.width, gameboard.height);
  gameboard_ctx.strokeRect(0, 0, gameboard.width, gameboard.height);
}

function drawSnakePart (snakePart) {
  gameboard_ctx.fillStyle = COLOR_APPLICATIONS.SNAKE_COLOR;
  gameboard_ctx.strokestyle = COLOR_APPLICATIONS.SNAKE_BORDER;
  gameboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  gameboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake () {
  snake.forEach(drawSnakePart);
}

// Render movement
function move_snake () {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  const ate_food = snake[0].x === apple_x && snake[0].y === apple_y;
  if (ate_food) {
    score += 1;
    document.getElementById('score').innerHTML = score;
    generate_apple;
  } else {
    snake.pop();
  }
}

function direction(event) {
  const ArrowLeft = 37;
  const ArrowRight = 39;
  const ArrowUp = 38;
  const ArrowDown = 40;

  const keyPressed = event.keyCode;
  const up = dy === -10;
  const down = dy === 10;
  const right = dx === 10;
  const left = dx === -10;

  if (keyPressed === ArrowLeft && !right) {
    dx = -10;
    dy= 0;
  }
  if (keyPressed === ArrowUp && !down) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === ArrowRight && !right) {
    dx = 10;
    dx = 0;
  }
  if (keyPressed === ArrowDown && !up) {
      dx = 0;
      dy = 10;
  }
}

function gameover() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) 
    return true
  }
  const hitLeft = snake[0].x < 0;
  const hitRight = snake[0].x > gameboard.width - 10;
  const hitTop = snake[0].y < 0;
  const hitBottom = snake[0].y > gameboard.height - 10;
  return hitLeft || hitRight || hitTop || hitBottom
}

function spawn_apple(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) *10;
}

function generate_apple () {
  apple_x = spawn_apple(0, gameboard.width - 10);
  apple_y = spawn_apple(0, gameboard.height - 10);
  snake.forEach (function apple_ate(part) {
    const ate = part.x == apple_x && part.y == apple_y;
    if (ate) spawn_apple();
  });
}

function drawApple () {
  gameboard_ctx.fillStyle = COLOR_APPLICATIONS.APPLE_COLOR;
  gameboard_ctx.strokestyle = COLOR_APPLICATIONS.APPLE_BORDER;
  gameboard_ctx.fillRect(apple_x, apple_y, 10, 10);
  gameboard_ctx.strokeRect(apple_x, apple_y, 10, 10);
}

