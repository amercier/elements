import children from './internals/children';
import find from './internals/find';
import mapMany from './internals/mapMany';
import matches from './internals/matches';
import on from './internals/on';
import toArray from './internals/toArray';

import create from 'lodash/object/create';

export default function Elements(input) {
  const instance = toArray(input);
  instance.__proto__ = Elements.prototype; // eslint-disable-line no-proto
  return instance;
}

Elements.prototype = create(Array.prototype, {

  find: function(selector) {
    return new Elements(mapMany(this, element => find(element, selector)));
  },

  children: function() {
    return new Elements(mapMany(this, children));
  },

  matching: function(selector) {
    return this.filter(element => matches(element, selector));
  },

  on: function(eventType, selector, listener) {
    return this.forEach(element => on(element, eventType, selector, listener));
  }
});

[
  // 'concat',
  'every',
  'filter',
  'forEach',
  // 'indexOf',
  // 'join',
  // 'lastIndexOf',
  'map',
  // 'pop',
  'push',
  'reduce',
  'reduceRight',
  'reverse',
  'shift',
  'slice',
  'some',
  'sort',
  'splice',
  // 'toLocaleString',
  // 'toString',
  'unshift'
].forEach(name => {
  const method = Array.prototype[name];
  Elements.prototype[name] = function() {
    const result = method.apply(this, arguments);
    return result === undefined ? this : new Elements(result);
  };
});
