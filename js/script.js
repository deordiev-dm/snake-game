import { showConfetti } from "./modules/confetti.js";
import { fillWithSquares } from "./modules/fillWithSquares.js";

import { HandleHeadClass } from "./modules/handleHeadClass.js";
import { handleBodyClass } from "./modules/handleBodyClass.js";
import { addApple } from "./modules/addApple.js";

import { updateCoordinates } from "./modules/updateCoordinates.js";
import { updateBody } from "./modules/updateBody.js";
import { updateHead } from "./modules/updateHead.js";

import { changeDirection } from "./modules/changeDirection.js";

const resfreshSpeed = +document.body.dataset.speed;
const squaresInRow = +document.body.dataset.grid;
const field = document.querySelector(".game-field");
const popupOver = document.querySelector(".popup--over");
const popupWin = document.querySelector(".popup--win");
const resetBtns = Array.from(document.querySelectorAll(".popup__reset"));

const scoreCounter = document.getElementById("score-count");
const highScoreCounter = document.getElementById("high-score-count");

highScoreCounter.innerHTML = localStorage.getItem("highestScore") || 0;

let squares = fillWithSquares(field, squaresInRow);

// game
let snake = setGame();
snake.playGame();

function setGame() {
  let snake = {
    col: 5,
    row: 5,
    length: 3,
    dir: "right",
    head: { square: null, index: null, oldSquare: null },
    body: [],
    apple: null,
    score: 0,
    pressedKeys: [],
    win: false,
    failed: false,
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
    // handle game states
    playGame,
    stopGame,
    resetGame,
    celebrate,
    gameOver,
  };

  snake.updateHead();
  snake.HandleHeadClass();
  snake.handleBodyClass();
  snake.addApple();

  return snake;
}

function playGame() {
  document.addEventListener("keydown", keyboardEventHandler);

  this.interval = setInterval(() => {
    this.changeDirection();

    this.updateCoordinates();
    this.updateBody();
    this.updateHead();

    for (let square of this.body) {
      if (square === this.head.square) {
        this.stopGame();
        this.gameOver();
      }
    }

    this.handleBodyClass();
    this.HandleHeadClass();

    if (this.head.square === this.apple) {
      this.length++;

      this.score++;
      scoreCounter.innerHTML = this.score;

      this.body.push(this.squares[0]);

      this.apple.classList.remove("apple");
      this.addApple();
    }

    if (this.win) {
      this.celebrate();
      return;
    }
  }, resfreshSpeed);
}

function stopGame() {
  clearInterval(this.interval);
  document.removeEventListener("keydown", keyboardEventHandler);
}

function resetGame() {
  removeSnakeClasses(snake);

  clearInterval(this.confettiInterval);

  field.classList.remove("game-over");
  popupOver.classList.remove("active");
  popupWin.classList.remove("active");

  scoreCounter.innerHTML = "0";

  snake = null;
  snake = setGame();

  snake.playGame();
}

function celebrate() {
  popupWin.classList.add("active");

  this.confettiInterval = setInterval(() => {
    showConfetti();
  }, 300);
}

function gameOver() {
  field.classList.add("game-over");
  popupOver.classList.add("active");

  if (this.score > +highScoreCounter.innerHTML) {
    localStorage.setItem("highestScore", this.score);
    highScoreCounter.innerHTML = this.score;
  }
}

document.addEventListener("click", (e) => {
  if (resetBtns.includes(e.target)) {
    snake.resetGame();
  }
});

// * ==========================

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
