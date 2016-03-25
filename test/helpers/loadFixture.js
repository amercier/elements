/**
 * Loads a fixture's HTML into an element on the page.
 * @param {String}      href   URL of the HTML fixture
 * @param {HTMLElement} target Element to render fixture into
 * @returns {HTMLElement} Element that fixture was rendered into
 */
export default function loadFixture(href, target) {
  const html = window.__html__[`test/${href}`]; // eslint-disable-line no-underscore-dangle

  if (!html) {
    throw new Error(`Cannot find fixture ${href}`);
  }

  target.innerHTML = html; // eslint-disable-line no-param-reassign
  return target;
}
