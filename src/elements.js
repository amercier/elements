import children from './internals/children';
import find from './internals/find';
import mapMany from './internals/mapMany';
import matches from './internals/matches';
import on from './internals/on';
import toArray from 'lodash/toArray';

import create from 'lodash/create';

export default function Elements(input) {
  const instance = toArray(input);
  instance.__proto__ = Elements.prototype; // eslint-disable-line no-proto
  return instance;
}
Elements.prototype = Object.create(Array.prototype);

Elements.prototype.find = function find(selector) {
  return new Elements(mapMany(this, element => find(element, selector)));
};

Elements.prototype.children = function children() {
  return new Elements(mapMany(this, children));
};

Elements.prototype.matching = function matching(selector) {
  return this.filter(element => matches(element, selector));
};

Elements.prototype.on = function on(eventType, selector, listener) {
  return this.forEach(element => on(element, eventType, selector, listener));
};

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
  'unshift',
].forEach(name => {
  const method = Array.prototype[name];
  Elements.prototype[name] = () => {
    const result = method.apply(this, arguments);
    return result === undefined ? this : new Elements(result);
  };
});
