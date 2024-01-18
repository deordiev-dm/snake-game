"use strict";

// fill a container with squares
const gridConatiner = document.getElementById("field-container");
for (let i = 8; i >= 1; i--) {
  for (let j = 1; j <= 8; j++) {
    gridConatiner.insertAdjacentHTML(
      "beforeend",
      `<div class="square" data-x=${j} data-y=${i}></div>`
    );
  }
}

// create dark squares
const squares = document.getElementsByClassName("square");
for (const square of squares) {
  let x = square.dataset.x;
  let y = square.dataset.y;

  if ((y % 2 === 0 && x % 2 === 0) || (y % 2 !== 0 && x % 2 !== 0)) {
    square.classList.add("square--dark");
  }
}

// create snake object
const snake = {
  x: 1,
  y: 5,
  length: 3,
  movementDir: "right",
};

let previousActiveSquare;

for (const square of squares) {
  if (+square.dataset.x === snake.x && +square.dataset.y === snake.y) {
    previousActiveSquare = square;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowDown") snake.movementDir = "down";
  if (event.key === "ArrowUp") snake.movementDir = "up";
  if (event.key === "ArrowLeft") snake.movementDir = "left";
  if (event.key === "ArrowRight") snake.movementDir = "right";
});

const popupBanner = document.querySelector(".popup-banner");

function finishGame() {
  clearInterval(refreshInterval);
  popupBanner.classList.add("active");
}

let refreshInterval = setInterval(() => {
  switch (snake.movementDir) {
    case "right":
      if (snake.x === 8) {
        finishGame();
        break;
      }
      snake.x++;
      break;
    case "left":
      if (snake.x === 1) {
        finishGame();
        break;
      }
      snake.x--;
      break;
    case "up":
      if (snake.y === 8) {
        finishGame();
        break;
      }
      snake.y++;
      break;
    case "down":
      if (snake.y === 1) {
        finishGame();
        break;
      }
      snake.y--;
      break;
  }

  previousActiveSquare.classList.remove("active");

  for (const square of squares) {
    if (+square.dataset.x === snake.x && +square.dataset.y === snake.y) {
      square.classList.add("active");
      previousActiveSquare = square;
    }
  }
}, 300);
