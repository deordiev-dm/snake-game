export function fillFieldWithSquares(container, squaresInRow) {
  const fieldWidth = parseFloat(window.getComputedStyle(container).width);
  const squareWidth = fieldWidth / squaresInRow;

  container.style.gridTemplateColumns = `repeat(${squaresInRow}, 
    ${squareWidth}px)`;

  for (let i = squaresInRow; i >= 1; i--) {
    for (let j = 1; j <= squaresInRow; j++) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="square" data-x=${j} data-y=${i}></div>`
      );
    }
  }
}

export function addDarkSquares(squareCollection) {
  for (const square of squareCollection) {
    let x = square.dataset.x;
    let y = square.dataset.y;

    if ((y % 2 === 0 && x % 2 === 0) || (y % 2 !== 0 && x % 2 !== 0)) {
      square.classList.add("dark");
    }
  }
}
