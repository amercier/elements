import matches from './helpers/matches';
import slice from './helpers/slice';
import union from './helpers/union';
import flatten from 'lodash/internal/baseFlatten';

import toArray from './internals/toArray';

export default class Elements {

  /**
   * Create an instance of `Elements`.
   *
   * @param {Node|Node[]|NodeList|null} input Input DOM node, or array of nodes.
   */
  constructor(input) {
    this.elements = toArray(input instanceof Elements ? input.elements : input);
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

  on(eventType, selector, listener) {
    if (listener === undefined) {
      listener = selector;
      selector = undefined;
    }

    this.elements.forEach(element => {
      element.addEventListener(eventType, !selector ? listener : event => {
        if (element !== event.target && matches(event.target, selector)) {
          listener(event, event.data);
        }
      });
    });
    return this;
  }
}
