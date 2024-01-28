import { fillWithSquares } from "./modules/fillWithSquares.js";

import { HandleHeadClass } from "./modules/handleHeadClass.js";
import { handleBodyClass } from "./modules/handleBodyClass.js";
import { addApple } from "./modules/addApple.js";

import { updateCoordinates } from "./modules/updateCoordinates.js";
import { updateBody } from "./modules/updateBody.js";
import { updateHead } from "./modules/updateHead.js";

import { changeDirection } from "./modules/changeDirection.js";

const scoreCounter = document.getElementById("score-count");
const resfreshSpeed = +document.body.dataset.speed;
const squaresInRow = +document.body.dataset.grid;
const field = document.querySelector(".game-field");

// game
const snake = setGame();
playGame();

function setGame() {
  const snake = {
    col: 10,
    row: 10,
    length: 3,
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
    squares: fillWithSquares(field, squaresInRow),
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
}

function keyboardEventHandler(e) {
  const arrows = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

  if (arrows.includes(e.key) && snake.pressedKeys.at(-1) !== e.key) {
    snake.pressedKeys.push(e.key);
  }
}
