import eventMatches from './eventMatches';

export default function on(element, eventType, selector, listener) {

  if (listener === undefined) {
    listener = selector;
    selector = undefined;
  }

  element.addEventListener(eventType, !selector ? listener : event => {
    if (eventMatches(event, selector)) {
      listener(event, event.data);
    }
  });
}
