import flatten from 'lodash/internal/baseFlatten';
import uniq from 'lodash/internal/baseUniq';

export default function union(arrays) {
  return uniq(flatten(arrays, false, true));
}
