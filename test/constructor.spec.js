import Elements from '../src/elements';
import slice from '../src/helpers/slice';

describe('new Elements()', () => {

  it('doesn\'t fail', function() {
    expect(() => {
      new Elements();
    }).not.to.throw();
  });
});

describe('new Elements(document)', () => {

  it('doesn\'t fail', function() {
    expect(() => {
      new Elements(document);
    }).not.to.throw();
  });
});

describe('new Elements(NodeList)', () => {

  it('doesn\'t fail', function() {
    expect(() => {
      new Elements(document.querySelectorAll('*'));
    }).not.to.throw();
  });
});

describe('new Elements(HTMLElement[])', () => {

  it('doesn\'t fail', function() {
    expect(() => {
      new Elements(slice(document.querySelectorAll('*')));
    }).not.to.throw();
  });
});

describe('new Elements(String)', () => {

  it('doesn\'t fail', function() {
    expect(() => {
      new Elements('*');
    }).not.to.throw();
  });
});

describe('new Elements({})', () => {

  it('fails', function() {
    expect(() => {
      new Elements({});
    }).to.throw('Expected input to be a Node or an array-like object, got [object Object]');
  });
});
