import extend from './extend';
import mapMany from './internals/mapMany';

export default extend(function children() {
  return mapMany(this, children);
});
