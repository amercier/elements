import loadFixture from './loadFixture';

/**
 * Loads a fixture for mocha-based tests.
 * @param {String} href URL of the HTML fixture
 * @returns {HTMLElement} Element that the fixture was rendered into
 */
export default function loadMochaFixture(href) {

  let fixture = document.getElementById('fixture');

  if (fixture === null) {
    fixture = document.createElement('div');
    fixture.id = 'fixture';
    fixture.style.position = 'absolute';
    fixture.style.top = '-10000px';
    fixture.style.left = '-10000px';
    document.body.appendChild(fixture);
  }

  return loadFixture(href, fixture);
}
