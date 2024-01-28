export function updateBody() {
  this.body.unshift(this.head.square);
  this.deletedSq = this.body.pop();
}
