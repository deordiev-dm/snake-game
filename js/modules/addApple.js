export function addApple() {
  let freeSquares = findFreeSquares(this.squares);

  if (freeSquares.length === 0) {
    this.stopGame();
    this.celebrate();
  } else {
    this.apple = freeSquares[chooseRandomSquare(freeSquares)];
    this.apple.classList.add("apple");
  }
}

function findFreeSquares(squares) {
  let freeSquares = squares.filter((square) => {
    return square.classList.contains("snake-head") || square.classList.contains("snake-body")
      ? false
      : true;
  });

  return freeSquares;
}

function chooseRandomSquare(squares) {
  let num = squares.length;
  return Math.floor(Math.random() * num);
}
