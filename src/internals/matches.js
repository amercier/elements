import imperative from '../helpers/imperative';

const elementProto = HTMLElement.prototype;

const matches = imperative(
  elementProto.matches
  || elementProto.webkitMatchesSelector
  || elementProto.mozMatchesSelector
  || elementProto.msMatchesSelector
);

export default matches;
