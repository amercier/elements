import matchesDelegate from './matchesDelegate';

export default function on(element, eventType, selector, listener) {
  if (listener === undefined) {
    listener = selector; // eslint-disable-line no-param-reassign
    selector = undefined; // eslint-disable-line no-param-reassign
  }

  element.addEventListener(eventType, !selector ? listener : event => {
    if (matchesDelegate(event.target, event.currentTarget, selector)) {
      listener(event, event.data);
    }
  });
}
