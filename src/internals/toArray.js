import slice from '../helpers/slice';
import uniq from 'lodash/internal/baseUniq';

export default function toArray(input) {
  if (!input) {
    return [];
  } else if (input instanceof Node) {
    return [input];
  } else if (input.length !== undefined) {
    return uniq(slice(input));
  }
  throw new Error(
    `Expected input to be a Node or an array-like object, got ${toString.call(input)}`
  );
}
