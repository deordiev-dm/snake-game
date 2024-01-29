import { fillWithSquares } from "./modules/fillWithSquares.js";

import { HandleHeadClass } from "./modules/handleHeadClass.js";
import { handleBodyClass } from "./modules/handleBodyClass.js";
import { addApple } from "./modules/addApple.js";

import { updateCoordinates } from "./modules/updateCoordinates.js";
import { updateBody } from "./modules/updateBody.js";
import { updateHead } from "./modules/updateHead.js";

import { changeDirection } from "./modules/changeDirection.js";

const scoreCounter = document.getElementById("score-count");
const highScoreCounter = document.getElementById("high-score-count");

const resfreshSpeed = +document.body.dataset.speed;
const squaresInRow = +document.body.dataset.grid;
const field = document.querySelector(".game-field");
const popupOver = document.querySelector(".popup-over");
const resetBtn = document.getElementById("reset-btn");

let squares = fillWithSquares(field, squaresInRow);

// game
let snake = setGame();
playGame();

function setGame() {
  let snake = {
    col: 7,
    row: 7,
    length: 5,
    dir: "right",
    head: { square: null, index: null, oldSquare: null },
    body: [],
    apple: null,
    score: 0,
    pressedKeys: [],
    // methods
    changeDirection,
    updateCoordinates,
    HandleHeadClass,
    handleBodyClass: handleBodyClass(),
    updateHead: updateHead(),
    updateBody,
    addApple,
    // additional properties
    grid: +document.body.dataset.grid,
    squares: squares,
  };

  snake.updateHead();
  snake.HandleHeadClass();
  snake.handleBodyClass();

  snake.addApple();

  return snake;
}

function playGame() {
  document.addEventListener("keydown", keyboardEventHandler);

  let gameInterval = setInterval(() => {
    snake.changeDirection();

    snake.updateCoordinates();
    snake.updateBody();
    snake.updateHead();

    for (let square of snake.body) {
      if (square === snake.head.square) {
        stopGame(gameInterval);
        return;
      }
    }

    snake.handleBodyClass();
    snake.HandleHeadClass();

    if (snake.head.square === snake.apple) {
      snake.length++;

      snake.score++;
      scoreCounter.innerHTML = snake.score;

      snake.body.push(snake.squares[0]);

      snake.apple.classList.remove("apple");
      snake.addApple();
    }
  }, resfreshSpeed);
}

function stopGame(interval) {
  clearInterval(interval);
  document.removeEventListener("keydown", keyboardEventHandler);

  field.classList.add("game-over");
  popupOver.classList.add("active");

  if (snake.score > +highScoreCounter.innerHTML) {
    highScoreCounter.innerHTML = snake.score;
  }

  resetBtn.addEventListener("click", resetGame);
}

function resetGame() {
  removeSnakeClasses(snake);

  field.classList.remove("game-over");
  popupOver.classList.remove("active");

  scoreCounter.innerHTML = "0";

  snake = null;
  snake = setGame();

  playGame();
}

function keyboardEventHandler(e) {
  const arrows = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

  if (arrows.includes(e.key) && snake.pressedKeys.at(-1) !== e.key) {
    snake.pressedKeys.push(e.key);
  }
}

function removeSnakeClasses(snake) {
  for (let square of snake.squares) {
    square.classList.remove("snake-head");
    square.classList.remove("snake-body");
    square.classList.remove("apple");
  }
}
