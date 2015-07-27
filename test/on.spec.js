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

    it('calls callback on delegated mouse click', function() {
      const nav = fixture.querySelector('nav'),
        element = fixture.querySelector('a[href="#text__headings"]'),
        events = [];
      new Elements(nav).on('click', 'a', function(event, data) {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(1);
      expect(events).to.have.deep.property('[0].event.type', 'click');
    });

    it('maintains event target', function() {
      const nav = fixture.querySelector('nav'),
        element = fixture.querySelector('a[href="#text__headings"]');
      let target;
      new Elements(nav).on('click', 'a', function(event) {
        target = event.target;
      });
      simulant.fire(element, 'click');
      expect(target).to.equal(element);
    });

    it('maintains current target', function() {
      const nav = fixture.querySelector('nav'),
        element = fixture.querySelector('a[href="#text__headings"]');
      let currentTarget;
      new Elements(nav).on('click', 'a', function(event) {
        currentTarget = event.currentTarget;
      });
      simulant.fire(element, 'click');
      expect(currentTarget).to.equal(nav);
    });

    it('doesn\'t call callback on delegated mouse click if selector doesn\'t match', function() {
      const nav = fixture.querySelector('nav'),
        element = fixture.querySelector('a[href="#text__headings"]'),
        events = [];
      new Elements(nav).on('click', '#text__paragraphs', function(event, data) {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(0);
    });

    it('doesn\'t call callback on delegated mouse click on same element', function() {
      const element = fixture.querySelector('a[href="#text__headings"]'),
        events = [];
      new Elements(element).on('click', 'a', function(event, data) {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(0);
    });
  });

  describe('bubbling events', function() {

    it('calls callback on delegated mouse click', function() {
      const main = fixture.querySelector('main'),
        element = fixture.querySelector('#text__paragraphs p'),
        events = [];
      new Elements(main).on('click', '#text__paragraphs', function(event, data) {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(1);
      expect(events).to.have.deep.property('[0].event.type', 'click');
    });

    it('maintains event target', function() {
      const main = fixture.querySelector('main'),
        element = fixture.querySelector('#text__paragraphs p');
      let target;
      new Elements(main).on('click', '#text__paragraphs', function(event) {
        target = event.target;
      });
      simulant.fire(element, 'click');
      expect(target).to.equal(element);
    });

    it('maintains current target', function() {
      const main = fixture.querySelector('main'),
        element = fixture.querySelector('#text__paragraphs p');
      let currentTarget;
      new Elements(main).on('click', '#text__paragraphs', function(event) {
        currentTarget = event.currentTarget;
      });
      simulant.fire(element, 'click');
      expect(currentTarget).to.equal(main);
    });

    it('doesn\'t call callback on delegated mouse click if selector doesn\'t match', function() {
      const main = fixture.querySelector('main'),
        element = fixture.querySelector('#text__paragraphs'),
        events = [];
      new Elements(main).on('click', '#text__paragraphs p', function(event, data) {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(0);
    });

    it('doesn\'t call callback on delegated mouse click on same element', function() {
      const element = fixture.querySelector('#text__paragraphs p'),
        events = [];
      new Elements(element).on('click', '#text__paragraphs', function(event, data) {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(0);
    });
  });

});
