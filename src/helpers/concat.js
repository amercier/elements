const arrayConcat = Array.prototype.concat;

export default function concat(...arrays) {
  return arrayConcat.call([], arrays);
}
