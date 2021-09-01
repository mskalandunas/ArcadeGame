const COLORS = {
  BLACK: "black",
  GREEN: "green",
  RED: "red",
  SLATE_GREY: "slategrey",
};

const COLOR_APPLICATIONS = {
  BOARD_BORDER: COLORS.BLACK,
  BOARD_BACKGROUND: COLORS.SLATE_GREY,
  SNAKE_COLOR: COLORS.GREEN,
  SNAKE_BORDER: COLORS.BLACK,
  APPLE_COLOR: COLORS.RED,
  APPLE_BORDER: COLORS.BLACK,
};

const KEYS = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  ARROW_UP: 38,
  ARROW_DOWN: 40
}

const gameState = {
  horizontalVelocity: 10,
  verticalVelocity: 0,
  appleX: null,
  appleY: null,
  score: 0,
  snake: [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
  ],
};

const gameboard = document.getElementById("gameboard");

const gameboardContext = gameboard.getContext("2d");

function onTick() {
  clearCanvas();
  drawApple();
  moveSnake();
  drawSnake();
  runGameplayLoop();
}

function runGameplayLoop() {
  if (gameover()) {
    document.removeEventListener("keydown", direction);

    return;
  }

  setTimeout(onTick, 100);
}

function clearCanvas() {
  gameboardContext.fillStyle = COLOR_APPLICATIONS.BOARD_BACKGROUND;
  gameboardContext.strokestyle = COLOR_APPLICATIONS.BOARD_BORDER;
  gameboardContext.fillRect(0, 0, gameboard.width, gameboard.height);
  gameboardContext.strokeRect(0, 0, gameboard.width, gameboard.height);
}

function drawSnakePart(snakePart) {
  gameboardContext.fillStyle = COLOR_APPLICATIONS.SNAKE_COLOR;
  gameboardContext.strokestyle = COLOR_APPLICATIONS.SNAKE_BORDER;
  gameboardContext.fillRect(snakePart.x, snakePart.y, 10, 10);
  gameboardContext.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  gameState.snake.forEach(drawSnakePart);
}

function moveSnake() {
  const head = {
    x: gameState.snake[0].x + gameState.horizontalVelocity,
    y: gameState.snake[0].y + gameState.verticalVelocity,
  };
  gameState.snake.unshift(head);
  const ate_food =
    gameState.snake[0].x === gameState.appleX &&
    gameState.snake[0].y === gameState.appleY;
  if (ate_food) {
    gameState.score += 1;
    document.getElementById("score").innerHTML = gameState.score;
    generateApple;
  } else {
    gameState.snake.pop();
  }
}

function direction(event) {
  const keyPressed = event.keyCode;
  const up = gameState.verticalVelocity === -10;
  const down = gameState.verticalVelocity === 10;
  const right = gameState.horizontalVelocity === 10;
  const left = gameState.horizontalVelocity === -10;

  if (keyPressed === KEYS.ARROW_LEFT && !right) {
    gameState.horizontalVelocity = -10;
    gameState.verticalVelocity = 0;
  }

  if (keyPressed === KEYS.ARROW_UP && !down) {
    gameState.horizontalVelocity = 0;
    gameState.verticalVelocity = -10;
  }

  if (keyPressed === KEYS.ARROW_RIGHT && !left) {
    gameState.horizontalVelocity = 10;
    gameState.verticalVelocity = 0;
  }

  if (keyPressed === KEYS.ARROW_DOWN && !up) {
    gameState.horizontalVelocity = 0;
    gameState.verticalVelocity = 10;
  }
}

function gameover() {
  const SNAKE_HEAD_INDEX = 0;

  for (let i = 4; i < gameState.snake.length; i++) {
    if (
      gameState.snake[i].x === gameState.snake[SNAKE_HEAD_INDEX].x &&
      gameState.snake[i].y === gameState.snake[SNAKE_HEAD_INDEX].y
    ) {
      return true;
    }
  }

  const hitLeft = gameState.snake[SNAKE_HEAD_INDEX].x < 0;
  const hitRight = gameState.snake[SNAKE_HEAD_INDEX].x > gameboard.width - 10;
  const hitTop = gameState.snake[SNAKE_HEAD_INDEX].y < 0;
  const hitBottom = gameState.snake[SNAKE_HEAD_INDEX].y > gameboard.height - 10;

  return hitLeft || hitRight || hitTop || hitBottom;
}

function spawn_apple(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function generateApple() {
  gameState.appleX = spawn_apple(0, gameboard.width - 10);
  gameState.appleY = spawn_apple(0, gameboard.height - 10);
  gameState.snake.forEach(function apple_ate(part) {
    const ate = part.x == gameState.appleX && part.y == gameState.appleY;
    if (ate) spawn_apple();
  });
}

function drawApple() {
  gameboardContext.fillStyle = COLOR_APPLICATIONS.APPLE_COLOR;
  gameboardContext.strokestyle = COLOR_APPLICATIONS.APPLE_BORDER;
  gameboardContext.fillRect(gameState.appleX, gameState.appleY, 10, 10);
  gameboardContext.strokeRect(gameState.appleX, gameState.appleY, 10, 10);
}

function startGame() {
  document.addEventListener("keydown", direction);

  generateApple();
  runGameplayLoop();
}

startGame();