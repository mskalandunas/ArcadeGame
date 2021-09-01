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

let horizontalVelocity = 10;
let verticalVelocity = 0;
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

const gameboardContext = gameboard.getContext("2d");

document.addEventListener('keydown', direction)

generate_apple();

function main() {
  if (gameover()) {
    return;
  };

  setTimeout(function onTick() {
    clearCanvas();
    drawApple();
    move_snake();
    drawSnake();
    main();
  }, 100);
}

function clearCanvas () {
  gameboardContext.fillStyle = COLOR_APPLICATIONS.BOARD_BACKGROUND;
  gameboardContext.strokestyle = COLOR_APPLICATIONS.BOARD_BORDER;
  gameboardContext.fillRect(0, 0, gameboard.width, gameboard.height);
  gameboardContext.strokeRect(0, 0, gameboard.width, gameboard.height);
}

function drawSnakePart (snakePart) {
  gameboardContext.fillStyle = COLOR_APPLICATIONS.SNAKE_COLOR;
  gameboardContext.strokestyle = COLOR_APPLICATIONS.SNAKE_BORDER;
  gameboardContext.fillRect(snakePart.x, snakePart.y, 10, 10);
  gameboardContext.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake () {
  snake.forEach(drawSnakePart);
}

// Render movement
function move_snake () {
  const head = {x: snake[0].x + horizontalVelocity, y: snake[0].y + verticalVelocity};
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
  const up = verticalVelocity === -10;
  const down = verticalVelocity === 10;
  const right = horizontalVelocity === 10;
  const left = horizontalVelocity === -10;
  console.log('velocity', horizontalVelocity);
  if (keyPressed === ArrowLeft && !right) {
    horizontalVelocity = -10;
    verticalVelocity= 0;
  }

  if (keyPressed === ArrowUp && !down) {
    horizontalVelocity = 0;
    verticalVelocity = -10;
  }

  if (keyPressed === ArrowRight && !left) {
    horizontalVelocity = 10;
    verticalVelocity = 0;
  }

  if (keyPressed === ArrowDown && !up) {
    horizontalVelocity = 0;
    verticalVelocity = 10;
  }
}

function gameover() {
  const SNAKE_HEAD_INDEX = 0;
    
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[SNAKE_HEAD_INDEX].x && snake[i].y === snake[SNAKE_HEAD_INDEX].y) {
      return true
    }
  }

  const hitLeft = snake[SNAKE_HEAD_INDEX].x < 0;
  const hitRight = snake[SNAKE_HEAD_INDEX].x > gameboard.width - 10;
  const hitTop = snake[SNAKE_HEAD_INDEX].y < 0;
  const hitBottom = snake[SNAKE_HEAD_INDEX].y > gameboard.height - 10;

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
  gameboardContext.fillStyle = COLOR_APPLICATIONS.APPLE_COLOR;
  gameboardContext.strokestyle = COLOR_APPLICATIONS.APPLE_BORDER;
  gameboardContext.fillRect(apple_x, apple_y, 10, 10);
  gameboardContext.strokeRect(apple_x, apple_y, 10, 10);
}

main();