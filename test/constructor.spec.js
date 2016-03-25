import loadMochaFixture from './helpers/loadMochaFixture';

import slice from '../src/helpers/slice';
import Elements from '../src/elements';

describe('constructor', () => {
  let fixture;
  beforeEach(() => {
    loadMochaFixture('fixtures/test.html');
    fixture = document.getElementById('fixture');
  });

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
        .to.be.an('array')
        .that.has.length(1);
    });
  });

  describe('new Elements(NodeList)', () => {
    it('doesn\'t fail', () => {
      const input = fixture.querySelectorAll('p');
      expect(() => {
        new Elements(input);
      }).not.to.throw();
    });

    it('contains all given elements', () => {
      const input = fixture.querySelectorAll('p');
      const length = input.length;
      expect(new Elements(input))
        .to.be.an('array')
        .that.has.length(length);
    });
  });


  describe('new Elements(HTMLElement[])', () => {
    it('doesn\'t fail', () => {
      expect(() => {
        new Elements(slice(fixture.querySelectorAll('p')));
      }).not.to.throw();
    });

    it('contains all elements', () => {
      const input = slice(fixture.querySelectorAll('p'));
      const subject = new Elements(input);
      expect(subject)
        .to.be.an('array')
        .that.has.length(input.length);
    });

    it('deduplicates input', () => {
      const input = [].concat(
        slice(fixture.querySelectorAll('p')),
        slice(fixture.querySelectorAll('p'))
      );
      const length = input.length / 2;
      const subject = new Elements(input);
      expect(subject)
        .to.be.an('array')
        .that.has.length(length);
    });
  });


  describe('new Elements({})', () => {
    it('fails', () => {
      expect(() => {
        new Elements({});
      }).to.throw('Expected input to be a Node or an array-like object, got [object Object]');
    });
  });


  describe('new Elements(Elements)', () => {
    it('doesn\'t fail', () => {
      const input = new Elements(fixture.querySelectorAll('p'));
      expect(() => {
        new Elements(input);
      }).not.to.throw();
    });

    it('contains the same elements', () => {
      const input = new Elements(fixture.querySelectorAll('p'));
      expect(new Elements(input))
        .to.be.an('array')
        .that.has.length(input.length);
    });

    it('does not references the same array', () => {
      const input = new Elements(fixture.querySelectorAll('p'));
      expect(new Elements(input)).not.to.equal(input);
    });
  });
});
