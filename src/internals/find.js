import slice from '../helpers/slice';

export default function find(element, selector) {
  return slice(element.querySelectorAll(selector));
}
