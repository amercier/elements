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

  describe('new Elements(Document)', () => {

    it('doesn\'t fail', () => {
      expect(() => {
        new Elements(document);
      }).not.to.throw();
    });
  });

  describe('new Elements(Document[])', () => {

    it('doesn\'t fail', () => {
      expect(() => {
        new Elements([document, document]);
      }).not.to.throw();
    });

    it('deduplicates input', () => {
      const subject = new Elements([document, document]);
      expect(subject)
        .to.have.property('elements')
        .that.is.an('array')
        .that.has.length(1);
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

    it('contains all elements', () => {
      const input = slice(document.querySelectorAll('div')),
        subject = new Elements(input);
      expect(subject)
        .to.have.property('elements')
        .that.is.an('array')
        .that.has.length(input.length);
    });

    it('deduplicates input', () => {
      const input = [].concat(
          slice(document.querySelectorAll('div')),
          slice(document.querySelectorAll('div'))
        ),
        length = input.length,
        subject = new Elements(input);
      expect(subject)
        .to.have.property('elements')
        .that.is.an('array')
        .that.has.length(length);
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
