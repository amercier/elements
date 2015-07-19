import imperative from './imperative';

const elementProto = HTMLElement && HTMLElement.prototype || {};

export default imperative(
  elementProto.matches
  || elementProto.webkitMatchesSelector
  || elementProto.mozMatchesSelector
  || elementProto.msMatchesSelector
  || function(selector) {
    return Array.prototype.indexOf.call(document.querySelectorAll(selector), this) !== -1;
  }
);
