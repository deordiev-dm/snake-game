export function updateBody() {
  this.body.unshift(this.head.square);
  let deletedSq = this.body.pop();
  deletedSq.classList.remove("snake-body");
}
