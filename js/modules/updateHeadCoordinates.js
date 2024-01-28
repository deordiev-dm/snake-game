const squaresInRow = +document.body.dataset.grid;

export function updateHeadCoordinates(dir, col, row) {
  switch (dir) {
    case "up":
      if (row === 1) {
        row = squaresInRow;
      } else {
        row--;
      }
      break;
    case "right":
      if (col === squaresInRow) {
        col = 1;
      } else {
        col++;
      }
      break;
    case "down":
      if (row === squaresInRow) {
        row = 1;
      } else {
        row++;
      }
      break;
    case "left":
      if (col === 1) {
        col = squaresInRow;
      } else {
        col--;
      }
      break;
  }

  return [col, row];
}
