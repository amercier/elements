import assign from '../internals/assign';
import Elements from '../elements';

export default function extend(newMethods) {
  return assign(Elements.prototype, newMethods);
}
