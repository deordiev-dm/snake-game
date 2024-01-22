import { fillFieldWithSquares, addDarkSquares } from "./modules/grid.js";
import { createSnakeObj } from "./modules/createSnakeObj.js";

const INITIAL_X = 5;
const INITIAL_Y = 5;
const INITIAL_LENGTH = 3;

const squaresInRow = +document.body.dataset.grid;
const field = document.querySelector(".game-field");

fillFieldWithSquares(field, squaresInRow);

const squares = document.getElementsByClassName("square");

addDarkSquares(squares);

const snake = createSnakeObj(INITIAL_X, INITIAL_Y, INITIAL_LENGTH);
