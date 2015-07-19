import loadMochaFixture from './helpers/loadMochaFixture';

import Elements from '../src/elements';

describe('find', function() {

  let fixture;
  beforeEach(function() {
    loadMochaFixture('fixtures/test.html');
    fixture = document.getElementById('fixture');
  });

  describe('()', () => {

    it('returns an instance of Elements', function() {
      const subject = new Elements(fixture).find();
      expect(subject).to.be.an.instanceof(Elements);
    });

    it('returns an empty instance of Elements', function() {
      const subject = new Elements(fixture).find();
      expect(subject)
        .to.have.property('elements')
        .that.is.an('array')
        .that.has.length(0);
    });
  });


  ['p', 'div p', 'p > *', 'p > *', '* > * > *', 'main *'].forEach(selector => {
    describe('("' + selector + '")', () => {

      it('returns an instance of Elements', function() {
        const subject = new Elements(fixture).find(selector);
        expect(subject).to.be.an.instanceof(Elements);
      });

      it('finds all elements', function() {
        const subject = new Elements(fixture).find(selector);
        expect(subject)
          .to.have.property('elements')
          .that.is.an('array')
          .that.has.length(fixture.querySelectorAll(selector).length);
      });
    });
  });

});
