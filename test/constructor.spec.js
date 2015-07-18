import Elements from '../src/elements';

describe('new Elements()', () => {

  it('doesn\'t fail', function() {
    expect(() => {
      new Elements(document);
    }).not.to.throw();
  });
});
