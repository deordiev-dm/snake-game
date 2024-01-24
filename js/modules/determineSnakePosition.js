const INITIAL_COL = 6;
const INITIAL_ROW = 8;
const INITIAL_LENGTH = 3;

export function determineSnakePosition(
  squares,
  col = INITIAL_COL,
  row = INITIAL_ROW,
  len = INITIAL_LENGTH
) {
  determineHeadPosition(squares);
  return [col, row];

  function determineHeadPosition(squares) {
    for (const square of squares) {
      if (+square.dataset.col === col) {
        if (+square.dataset.row === row) {
          square.classList.add("snake-head");

          determineBodyPosition(square);
        }
      }
    }
  }
  function determineBodyPosition(headPos) {
    for (let i = 1; i <= len; i++) {
      for (const square of squares) {
        if (+square.dataset.col === +headPos.dataset.col - i) {
          if (+square.dataset.row === +headPos.dataset.row)
            square.classList.add("snake-body");
        }
      }
    }
  }
}
