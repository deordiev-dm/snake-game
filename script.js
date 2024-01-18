"use strict";

const INITIAL_X = 5;
const INITIAL_Y = 6;

const squaresInRow = +document.body.dataset.difficulty; // how many squares in a row
const snakeSpeed = +document.body.dataset.speed; // how fast snake is
const gridConatiner = document.getElementById("field-container"); // contains grid
const popupBanner = document.querySelector(".popup-banner"); // you've lost banner
const resetBtn = document.getElementById("reset-btn");

let gameState = "running";

// reset the game event
resetBtn.addEventListener("click", resetGame);

// create a grid
gridConatiner.style.gridTemplateColumns = `repeat(${squaresInRow}, 
  ${600 / squaresInRow}px)`;

// fill a container with squares
for (let i = squaresInRow; i >= 1; i--) {
  for (let j = 1; j <= squaresInRow; j++) {
    gridConatiner.insertAdjacentHTML(
      "beforeend",
      `<div class="square" data-x=${j} data-y=${i}></div>`
    );
  }
}

// HTML collection of all squares
const squares = document.getElementsByClassName("square");

// add dark squares
for (const square of squares) {
  let x = square.dataset.x;
  let y = square.dataset.y;

  if ((y % 2 === 0 && x % 2 === 0) || (y % 2 !== 0 && x % 2 !== 0)) {
    square.classList.add("square--dark");
  }
}

gameBody();

function gameBody() {
  // create snake object
  const snake = {
    x: INITIAL_X,
    y: INITIAL_Y,
    bodyLength: 3,
    movementDir: "right",
  };

  // change snake's movement direction on keypress
  document.addEventListener("keydown", (e) => {
    const key = e.key;
    let direction = snake.movementDir;

    if (key === "ArrowDown" && direction !== "up") {
      snake.movementDir = "down";
    }
    if (key === "ArrowUp" && direction !== "down") {
      snake.movementDir = "up";
    }
    if (key === "ArrowLeft" && direction !== "right") {
      snake.movementDir = "left";
    }

    if (key === "ArrowRight" && direction !== "left") {
      snake.movementDir = "right";
    }
  });

  // determine the initial active square
  let activeSquare;
  for (const square of squares) {
    if (+square.dataset.x === snake.x && +square.dataset.y === snake.y) {
      activeSquare = square;
      activeSquare.classList.add("active");
    }
  }
  let currentX = +activeSquare.dataset.x;
  let currentY = +activeSquare.dataset.y;

  // determine the position of body squares
  let coordinatesOfBody = [];
  for (let i = 1; i <= snake.bodyLength; i++) {
    coordinatesOfBody.push([currentX - i, currentY]);
  }
  // color the body squares
  for (let square of squares) {
    let x = +square.dataset.x;
    let y = +square.dataset.y;

    for (let bodyCoordinate of coordinatesOfBody) {
      if (bodyCoordinate[0] === x && bodyCoordinate[1] === y)
        square.classList.add("body");
    }
  }

  // refresh the state
  let refreshState = setInterval(() => {
    // change position of head depending on movementDirection
    let resultOfUpdate = updateHeadCoordinates(
      snake.movementDir,
      snake,
      refreshState
    );

    if (resultOfUpdate === "finished") {
      return;
    }

    // ===============================
    let previousActive = activeSquare;
    activeSquare.classList.remove("active");

    let prevX = +previousActive.dataset.x;
    let prevY = +previousActive.dataset.y;
    // ===============================

    // update body coordinates array
    let deletedBodySquare = coordinatesOfBody.pop();
    coordinatesOfBody.unshift([prevX, prevY]);

    // find new square coresponding to head position
    for (const square of squares) {
      if (+square.dataset.x === snake.x && +square.dataset.y === snake.y) {
        activeSquare = square;
        square.classList.add("active");
        break;
      }
    }
    // find squares corresponding to body position
    for (let square of squares) {
      let x = +square.dataset.x;
      let y = +square.dataset.y;

      if (x === deletedBodySquare[0] && y === deletedBodySquare[1]) {
        square.classList.remove("body");
      }

      for (let bodyCoordinate of coordinatesOfBody) {
        if (bodyCoordinate[0] === x && bodyCoordinate[1] === y)
          square.classList.add("body");
      }
    }
  }, snakeSpeed);
}

function updateHeadCoordinates(dir, obj, interval) {
  switch (dir) {
    case "right":
      if (obj.x === squaresInRow) {
        finishGame(interval);
        return "finished";
      } else {
        return obj.x++;
      }

    case "left":
      if (obj.x === 1) {
        finishGame(interval);
        return "finished";
      } else {
        return obj.x--;
      }

    case "up":
      if (obj.y === squaresInRow) {
        finishGame(interval);
        return "finished";
      } else {
        return obj.y++;
      }

    case "down":
      if (obj.y === 1) {
        finishGame(interval);
        return "finished";
      } else {
        return obj.y--;
      }
  }
}
function finishGame(interval) {
  clearInterval(interval);
  popupBanner.classList.add("active");
}
function resetGame() {
  gameBody();
  for (let square of squares) {
    if (square.classList.contains("active")) square.classList.remove("active");
    if (square.classList.contains("body")) square.classList.remove("body");
  }
  popupBanner.classList.remove("active");
}
