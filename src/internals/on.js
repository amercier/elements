import matchesDelegate from './matchesDelegate';

export default function on(element, eventType, selector, listener) {

  if (listener === undefined) {
    listener = selector;
    selector = undefined;
  }

  element.addEventListener(eventType, !selector ? listener : event => {
    if (matchesDelegate(event.target, event.currentTarget, selector)) {
      listener(event, event.data);
    }
  });
}
