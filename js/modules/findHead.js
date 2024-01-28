export function findHead() {
  let oldSquare;

  return function () {
    for (let square of this.squares) {
      const squareCol = +square.dataset.col;
      const squareRow = +square.dataset.row;

      const isHead = squareCol === this.col && squareRow === this.row;

      if (isHead) {
        this.head.square = square;
        this.head.square.classList.add("snake-head");
        this.head.index = +square.dataset.index;

        if (oldSquare) oldSquare.classList.remove("snake-head");

        oldSquare = square;
      }
    }
  };
}
