import matches from './matches';

export default function eventMatches(event, selector) {
  const currentTarget = event.currentTarget;
  for (let target = event.target; target && target !== currentTarget; target = target.parentNode) {
    if (matches(target, selector)) {
      return true;
    }
  }
  return false;
}
