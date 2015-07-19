import loadMochaFixture from './helpers/loadMochaFixture';
import forIn from 'lodash/internal/baseForIn';

import Elements from '../src/elements';

describe('children', function() {

  let fixture;
  beforeEach(function() {
    loadMochaFixture('fixtures/test.html');
    fixture = document.getElementById('fixture');
  });

  forIn({
    main: 3,
    article: 45,
    ul: 33,
    li: 33,
    span: 0
  }, function(count, selector) {
    describe('new Element(' + selector + ').children()', () => {

      it('returns an instance of Elements', function() {
        const subject = new Elements(fixture.querySelectorAll(selector)).children();
        expect(subject).to.be.an.instanceof(Elements);
      });

      it('finds ' + count + ' elements', function() {
        const subject = new Elements(fixture.querySelectorAll(selector)).children();
        expect(subject)
          .to.have.property('elements')
          .that.is.an('array')
          .that.has.length(count);
      });
    });
  });

});
