import union from '../helpers/union';

const map = Array.prototype.map;

export default function mapMany(elements, ...args) {
  return union(map.apply(elements, args));
}
