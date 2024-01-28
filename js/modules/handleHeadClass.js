export function HandleHeadClass() {
  if (this.head.oldSquare) {
    this.head.oldSquare.classList.remove("snake-head");
  }
  this.head.square.classList.add("snake-head");
}
