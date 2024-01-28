export function updateHead() {
  return function () {
    this.head.oldSquare = this.head.square;

    for (let square of this.squares) {
      const squareCol = +square.dataset.col;
      const squareRow = +square.dataset.row;

      const isHead = squareCol === this.col && squareRow === this.row;

      if (isHead) {
        this.head.square = square;
        this.head.index = +square.dataset.index;
      }
    }
  };
}
