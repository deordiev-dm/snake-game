export function changeDirection(key) {
  const arrows = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

  if (arrows.includes(key)) {
    if (this.dir == "left" || this.dir === "right") {
      if (key == "ArrowDown") this.dir = "down";
      if (key == "ArrowUp") this.dir = "up";
    }
    if (this.dir == "up" || this.dir === "down") {
      if (key == "ArrowLeft") this.dir = "left";
      if (key == "ArrowRight") this.dir = "right";
    }
  }
}
