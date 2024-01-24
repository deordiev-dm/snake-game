export function changeDirection(key, dir) {
  if (dir === "left" || dir === "right") {
    if (key === "ArrowDown") {
      return (dir = "down");
    } else if (key === "ArrowUp") {
      return (dir = "up");
    }
  } else if (dir === "up" || dir === "down") {
    if (key === "ArrowLeft") {
      return (dir = "left");
    } else if (key === "ArrowRight") {
      return (dir = "right");
    }
  }
  return dir;
}
