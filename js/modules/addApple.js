export function addApple() {
  let freeSquares = findFreeSquares(this.squares);

  let x = chooseRandomSquare(freeSquares);
  this.apple = freeSquares[x];
  this.apple.classList.add("apple");
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
