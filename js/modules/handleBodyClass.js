export function handleBodyClass() {
  let isFirstRun = true;

  return function () {
    if (isFirstRun) {
      for (let i = 1; i <= this.length; i++) {
        this.body.push(this.squares[this.head.index - i]);
        this.squares[this.head.index - i].classList.add("snake-body");
        isFirstRun = false;
      }
    } else {
      this.deletedSq.classList.remove("snake-body");
      for (let square of this.body) {
        square.classList.add("snake-body");
      }
    }
  };
}
