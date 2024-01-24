export function fillFieldWithSquares(container, squaresInRow) {
  const fieldWidth = parseFloat(window.getComputedStyle(container).width);
  const squareWidth = fieldWidth / squaresInRow;

  container.style.gridTemplateColumns = `repeat(${squaresInRow}, 
    ${squareWidth}px)`;

  for (let i = 1; i <= squaresInRow; i++) {
    for (let j = 1; j <= squaresInRow; j++) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="square" data-col=${j} data-row=${i}></div>`
      );
    }
  }

  const squares = document.querySelectorAll(".square");

  addDarkSquares(squares);

  return squares;
}

function addDarkSquares(squareCollection) {
  for (const square of squareCollection) {
    let col = +square.dataset.col;
    let row = +square.dataset.row;

    if ((col % 2 === 0 && row % 2 === 0) || (col % 2 !== 0 && row % 2 !== 0)) {
      square.classList.add("dark");
    }
  }
}
