export function fillWithSquares(container, squaresInRow) {
  const fieldWidth = parseFloat(window.getComputedStyle(container).width);
  const squareWidth = fieldWidth / squaresInRow;

  container.style.gridTemplateColumns = `repeat(${squaresInRow}, 
    ${squareWidth}px)`;

  let index = 0;

  for (let i = 1; i <= squaresInRow; i++) {
    for (let j = 1; j <= squaresInRow; j++) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="square" data-col=${j} data-row=${i} data-index="${index++}"></div>`
      );
    }
  }

  const squares = Array.from(document.querySelectorAll(".square"));

  addDarkSquares(squares);

  return squares;
}

function addDarkSquares(squares) {
  for (const square of squares) {
    let col = +square.dataset.col;
    let row = +square.dataset.row;

    if ((col % 2 === 0 && row % 2 === 0) || (col % 2 !== 0 && row % 2 !== 0)) {
      square.classList.add("dark");
    }
  }
}
