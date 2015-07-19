import Elements from '../src/elements';

describe('find', function() {


  describe('find()', () => {

    it('returns an instance of Elements', function() {
      const subject = new Elements(document).find();
      expect(subject).to.be.an.instanceof(Elements);
    });

    it('returns an empty instance of Elements', function() {
      const subject = new Elements(document).find();
      expect(subject)
        .to.have.property('elements')
        .that.is.an('array')
        .that.has.length(0);
    });
  });


  describe('find("*")', () => {

    it('returns an instance of Elements', function() {
      const subject = new Elements(document).find('div');
      expect(subject).to.be.an.instanceof(Elements);
    });

    it('contains all elements in the document', function() {
      const subject = new Elements(document).find('div');
      expect(subject)
        .to.have.property('elements')
        .that.is.an('array')
        .that.has.length(document.querySelectorAll('div').length);
    });
  });

});
