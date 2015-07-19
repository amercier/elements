const call = Function.prototype.call;

/**
 * Converts a method normally defined on a prototype into one that can be
 * called with the target context as the first parameter.
 *
 * E.g.:
 *
 *     let slice = imperative(Array.prototype.slice);
 *     let nodeArray = slice(document.querySelectorAll('.foo'))
 *     nodeArray instanceof Array; // => true
 *
 * @param {function} method Method to convert to imperative
 * @returns {function} Function that accepts the context as the first argument, and passes the rest onto the method
 */
export default function imperative(method) {
  return function() {
    return call.apply(method, arguments);
  };
}
