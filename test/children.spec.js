import loadMochaFixture from './helpers/loadMochaFixture';
import forIn from 'lodash/_baseForIn';

import Elements from '../src/elements';

describe('children', () => {
  let fixture;
  beforeEach(() => {
    loadMochaFixture('fixtures/test.html');
    fixture = document.getElementById('fixture');
  });

  forIn({
    main: 3,
    article: 45,
    ul: 33,
    li: 33,
    span: 0,
  }, (count, selector) => {
    describe(`new Element(${selector}).children()`, () => {
      it('returns an instance of Elements', () => {
        const subject = new Elements(fixture.querySelectorAll(selector)).children();
        expect(subject).to.be.an.instanceof(Elements);
      });

      it(`finds ${count} elements`, () => {
        const subject = new Elements(fixture.querySelectorAll(selector)).children();
        expect(subject)
          .to.be.an('array')
          .that.has.length(count);
      });
    });
  });
});
