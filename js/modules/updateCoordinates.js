export function updateCoordinates(dir, col, row) {
  switch (dir) {
    case "up":
      row++;
      break;
    case "right":
      col++;
      break;
    case "down":
      row--;
      break;
    case "left":
      col--;
      break;
  }

  return [col, row];
}
