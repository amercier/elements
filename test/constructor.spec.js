import slice from '../src/helpers/slice';
import Elements from '../src/elements';

describe('constructor', () => {

  describe('new Elements()', () => {

    it('doesn\'t fail', () => {
      expect(() => {
        new Elements();
      }).not.to.throw();
    });
  });

  describe('new Elements(document)', () => {

    it('doesn\'t fail', () => {
      expect(() => {
        new Elements(document);
      }).not.to.throw();
    });
  });

  describe('new Elements(NodeList)', () => {

    it('doesn\'t fail', () => {
      expect(() => {
        new Elements(document.querySelectorAll('div'));
      }).not.to.throw();
    });

    it('contains all given elements', () => {
      const subject = new Elements(document).find('div');
      expect(subject)
        .to.have.property('elements')
        .that.is.an('array')
        .that.has.length(document.querySelectorAll('div').length);
    });
  });

  describe('new Elements(HTMLElement[])', () => {

    it('doesn\'t fail', () => {
      expect(() => {
        new Elements(slice(document.querySelectorAll('div')));
      }).not.to.throw();
    });
  });

  describe('new Elements(String)', () => {

    it('doesn\'t fail', () => {
      expect(() => {
        new Elements('div');
      }).not.to.throw();
    });
  });

  describe('new Elements({})', () => {

    it('fails', () => {
      expect(() => {
        new Elements({});
      }).to.throw('Expected input to be a Node or an array-like object, got [object Object]');
    });
  });

});
