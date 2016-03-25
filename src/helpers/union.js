import flatten from 'lodash/_baseFlatten';
import uniq from 'lodash/_baseUniq';

export default function union(arrays) {
  return uniq(flatten(arrays, false, true));
}
