export function changeDirection() {
  if (this.pressedKeys.length > 0) {
    let key = this.pressedKeys[0];

    if (this.dir === "left" || this.dir === "right") {
      if (key === "ArrowDown") this.dir = "down";
      if (key === "ArrowUp") this.dir = "up";
    }
    if (this.dir === "up" || this.dir === "down") {
      if (key === "ArrowLeft") this.dir = "left";
      if (key === "ArrowRight") this.dir = "right";
    }

    this.pressedKeys.shift();
  }
}
