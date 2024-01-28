import { fillWithSquares } from "./modules/fillWithSquares.js";

import { findHead } from "./modules/findHead.js";
import { findBody } from "./modules/findBody.js";
import { addApple } from "./modules/addApple.js";

import { updateHead } from "./modules/updateHead.js";
import { updateBody } from "./modules/updateBody.js";

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
    col: 7,
    row: 8,
    length: 3,
    dir: "right",
    head: { square: null, index: null },
    body: [],
    apple: null,
    score: 0,
    // methods
    findHead: findHead(),
    findBody: findBody(),
    addApple,
    changeDirection,
    updateHead,
    updateBody,
    // additional properties
    grid: +document.body.dataset.grid,
    squares: fillWithSquares(field, squaresInRow),
  };

  snake.findHead();
  snake.findBody();
  snake.addApple();

  document.addEventListener("keydown", (e) => {
    snake.changeDirection(e.key);
  });

  return snake;
}

function playGame() {
  let gameInterval = setInterval(() => {
    snake.updateBody();
    snake.updateHead();

    snake.findBody();
    snake.findHead();

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
  document.removeEventListener("keydown", changeDirectionEventHandler);
  field.classList.add("game-over");
}
