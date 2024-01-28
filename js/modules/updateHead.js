export function updateHead() {
  switch (this.dir) {
    case "up":
      if (this.row === 1) {
        this.row = this.grid;
      } else {
        this.row--;
      }
      break;
    case "right":
      if (this.col === this.grid) {
        this.col = 1;
      } else {
        this.col++;
      }
      break;
    case "down":
      if (this.row === this.grid) {
        this.row = 1;
      } else {
        this.row++;
      }
      break;
    case "left":
      if (this.col === 1) {
        this.col = this.grid;
      } else {
        this.col--;
      }
      break;
  }
}
