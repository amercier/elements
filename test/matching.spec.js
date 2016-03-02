import loadMochaFixture from './helpers/loadMochaFixture';
import forIn from 'lodash/internal/baseForIn';

import Elements from '../src/elements';

describe('matching', function () {

  let fixture;
  beforeEach(function () {
    loadMochaFixture('fixtures/test.html');
    fixture = document.getElementById('fixture');
  });

  describe('()', () => {

    it('returns an instance of Elements', function () {
      const subject = new Elements(fixture.querySelectorAll('*')).matching();
      expect(subject).to.be.an.instanceof(Elements);
    });

    it('returns an empty instance of Elements', function () {
      const subject = new Elements(fixture.querySelectorAll('*')).matching();
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
    'main *': 363
  }, function (count, selector) {
    describe('("' + selector + '")', () => {

      it('returns an instance of Elements', function () {
        const subject = new Elements(fixture.querySelectorAll('*')).matching(selector);
        expect(subject).to.be.an.instanceof(Elements);
      });

      it('finds ' + count + ' elements', function () {
        const subject = new Elements(fixture.querySelectorAll('*')).matching(selector);
        expect(subject)
          .to.be.an('array')
          .that.has.length(count);
      });
    });
  });

});
