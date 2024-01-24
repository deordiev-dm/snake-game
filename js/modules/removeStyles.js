export function removeStyles(squares, ...styles) {
  for (let square of squares) {
    for (let style of styles) {
      if (square.classList.contains(style)) {
        square.classList.remove(style);
      }
    }
  }
}
