import isString from './helpers/isString';
import matches from './helpers/matches';
import slice from './helpers/slice';
import union from './helpers/union';
import assign from 'lodash/internal/baseAssign';
import flatten from 'lodash/internal/baseFlatten';
import uniq from 'lodash/internal/baseUniq';

const toString = Object.prototype.toString;

export default class Elements {

  /**
   * Create an instance of `Elements`.
   *
   * @param {Node|Node[]|NodeList|null} input Input DOM node, or array of nodes.
   */
  constructor(input) {
    if (!input) {
      this.elements = [];
    }
    else if (input instanceof Elements) {
      this.elements = slice(this.elements);
    }
    else if (input instanceof Node) {
      this.elements = [input];
    }
    else if (input.length !== undefined) {
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

  event(event, properties = {}) {
    if (isString(event)) {
      event = new Event(event);
    }
    assign(event, properties);
    return event;
  }

  on(eventType, selector = undefined, listener) {
    if (listener === undefined) {
      listener = selector;
      selector = undefined;
    }

    listener.delegateCallback = !selector ? listener : event => {
      if (matches(event.target, selector)) {
        listener(event, event.data);
      }
    };

    this.elements.forEach(element => element.addEventListener(eventType, listener.delegateCallback));
  }
}
