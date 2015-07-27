import children from './internals/children';
import find from './internals/find';
import mapMany from './internals/mapMany';
import matches from './internals/matches';
import toArray from './internals/toArray';

const filter = Array.prototype.filter;
const forEach = Array.prototype.forEach;
const map = Array.prototype.map;

export default class Elements {

  /**
   * Create an instance of `Elements`.
   *
   * @param {Node|Node[]|NodeList|null} input Input DOM node, or array of nodes.
   */
  constructor(input) {
    this.elements = toArray(input instanceof Elements ? input.elements : input);
  }

  filter() {
    return new this.constructor(
      filter.apply(this.elements, arguments)
    );
  }

  forEach() {
    forEach.apply(this.elements, arguments);
    return this;
  }

  map() {
    return new this.constructor(map.apply(this.elements, arguments));
  }

  find(selector) {
    return new this.constructor(mapMany(this.elements, element => find(element, selector)));
  }

  children() {
    return new this.constructor(mapMany(this.elements, children));
  }

  matching(selector) {
    return this.filter(element => matches(element, selector));
  }

  on(eventType, selector, listener) {
    if (listener === undefined) {
      listener = selector;
      selector = undefined;
    }

    this.forEach(element => {
      element.addEventListener(eventType, !selector ? listener : event => {
        if (element !== event.target && matches(event.target, selector)) {
          listener(event, event.data);
        }
      });
    });
    return this;
  }
}
