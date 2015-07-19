import imperative from './helpers/imperative';
import slice from './helpers/slice';
import toString from './helpers/toString';

export default class Elements {

  /**
   * Create an instance of `Elements`.
   *
   * @param {Node|Node[]|NodeList|null} input Input DOM node, or array of nodes. As a convenience,
   *                                          you can pass a CSS selector:
   *                                          `new Elements('#my-class')`. This is equivalent to:
   *                                          `new Elements(document).find('#my-class')`.
   */
  constructor(input) {
    if (!input) {
      this.element = [];
    }
    else if (input instanceof Node) {
      this.elements = [input];
    }
    else if (input instanceof String) {
      const constructor = this.constructor,
        find = imperative(constructor.prototype.find);
      this.elements = find(new constructor(document), input);
    }
    else if (input.hasOwnProperty('length')) {
      this.elements = slice(input);
    }
    else {
      throw new Error('Expected input to be a Node or an array-like object, got ' + toString(input));
    }
  }

}
