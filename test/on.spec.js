import simulant from 'simulant';

import loadMochaFixture from './helpers/loadMochaFixture';

import Elements from '../src/elements';

describe('on', function() {

  let fixture;
  beforeEach(function() {
    loadMochaFixture('fixtures/test.html');
    fixture = document.getElementById('fixture');
  });

  describe('mouse events', function() {

    it('calls callback on mouse click', function() {
      const element = fixture.querySelector('a[href="#text__headings"]'),
        events = [];
      new Elements(element).on('click', function(event, data) {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(1);
      expect(events).to.have.deep.property('[0].event.type', 'click');
    });

  });

});
