import { fillFieldWithSquares } from "./modules/grid.js";
import { determineSnakePosition } from "./modules/determineSnakePosition.js";
import { changeDirection } from "./modules/changeDirection.js";
import { updateCoordinates } from "./modules/updateCoordinates.js";
import { removeStyles } from "./modules/removeStyles.js";

// =====

const snakeSpeed = +document.body.dataset.speed;
const squaresInRow = +document.body.dataset.grid;
const field = document.querySelector(".game-field");
const squares = fillFieldWithSquares(field, squaresInRow);
let direction = "right";

playGame();

// local functions
function changeDirectionEventHandler(e) {
  const arrows = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

  if (arrows.includes(e.key)) {
    direction = changeDirection(e.key, direction);
    console.log(direction); // !temp
  }
}

// * ============================
function playGame() {
  let coordinates = determineSnakePosition(squares);

  document.addEventListener("keydown", changeDirectionEventHandler);

  let gameIteration = setInterval(() => {
    // todo: написати перевірку
    // перевірка на те чи змія знаходиться в межах контейнеру
    // продовжити або закінчити гру

    coordinates = updateCoordinates(direction, ...coordinates);

    removeStyles(squares, "snake-head", "snake-body");

    determineSnakePosition(squares, ...coordinates); // ? length
  }, snakeSpeed);
}
// * ============================

function stopGame() {
  document.removeEventListener("keydown", changeDirectionEventHandler);
}

// ! 🛑 danger modules under the construction
