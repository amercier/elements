import isString from './helpers/isString';
import matches from './helpers/matches';
import slice from './helpers/slice';
import union from './helpers/union';
import flatten from 'lodash/internal/baseFlatten';
import uniq from 'lodash/internal/baseUniq';

const toString = Object.prototype.toString;

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
      this.elements = [];
    }
    else if (input instanceof Node) {
      this.elements = [input];
    }
    else if (isString(input)) {
      this.elements = new this.constructor(document).find(input).elements;
    }
    else if (input.hasOwnProperty('length')) {
      this.elements = uniq(slice(input));
    }
    else {
      throw new Error('Expected input to be a Node or an array-like object, got ' + toString.call(input));
    }
  }

  find(selector) {
    return new this.constructor(union(this.elements.map(
      element => slice(element.querySelectorAll(selector))
    )));
  }

  children() {
    return new this.constructor(union(this.elements.map(
      element => slice(element.children)
    )));
  }

  matching(selector) {
    return new this.constructor(flatten(this.elements.filter(
      element => matches(element, selector)
    )));
  }
}
