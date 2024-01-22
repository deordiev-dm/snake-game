export function createSnakeObj(initX, initY, length) {
  let snake = {
    x: initX,
    y: initY,
    bodyLength: length,
    moveDir: "right",
  };

  return snake;
}
