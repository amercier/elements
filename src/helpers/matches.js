import imperative from './imperative';

const elementProto = HTMLElement.prototype;

export default imperative(
  elementProto.matches
  || elementProto.webkitMatchesSelector
  || elementProto.mozMatchesSelector
  || elementProto.msMatchesSelector
);
