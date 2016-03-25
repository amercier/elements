import loadMochaFixture from './helpers/loadMochaFixture';
import forIn from 'lodash/internal/baseForIn';

import Elements from '../src/elements';

describe('find', () => {
  let fixture;
  beforeEach(() => {
    loadMochaFixture('fixtures/test.html');
    fixture = document.getElementById('fixture');
  });

  describe('()', () => {
    it('returns an instance of Elements', () => {
      const subject = new Elements(fixture).find();
      expect(subject).to.be.an.instanceof(Elements);
    });

    it('returns an empty instance of Elements', () => {
      const subject = new Elements(fixture).find();
      expect(subject)
        .to.be.an('array')
        .that.has.length(0);
    });
  });

  forIn({
    p: 67,
    'p *': 97,
    'div *': 427,
    'p > *': 91,
    'article > * > * > *': 69,
    'main *': 363,
  }, (count, selector) => {
    describe(`("${selector}")`, () => {
      it('returns an instance of Elements', () => {
        const subject = new Elements(fixture).find(selector);
        expect(subject).to.be.an.instanceof(Elements);
      });

      it(`finds ${count} elements`, () => {
        const subject = new Elements(fixture).find(selector);
        expect(subject)
          .to.be.an('array')
          .that.has.length(count);
      });
    });
  });
});
