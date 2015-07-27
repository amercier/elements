import matches from './matches';

export default function matchesDelegate(target, currentTarget, selector) {
  for (let currentNode = target; target && currentNode !== currentTarget; currentNode = currentNode.parentNode) {
    if (matches(currentNode, selector)) {
      return true;
    }
  }
  return false;
}
