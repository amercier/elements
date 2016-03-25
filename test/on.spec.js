import simulant from 'simulant';
import loadMochaFixture from './helpers/loadMochaFixture';
import Elements from '../src/elements';

describe('on', () => {
  let fixture;
  beforeEach(() => {
    loadMochaFixture('fixtures/test.html');
    fixture = document.getElementById('fixture');
  });

  describe('mouse events', () => {
    it('calls callback on mouse click', () => {
      const element = fixture.querySelector('a[href="#text__headings"]');
      const events = [];
      new Elements(element).on('click', (event, data) => {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(1);
      expect(events).to.have.deep.property('[0].event.type', 'click');
    });

    it('calls callback on delegated mouse click', () => {
      const nav = fixture.querySelector('nav');
      const element = fixture.querySelector('a[href="#text__headings"]');
      const events = [];
      new Elements(nav).on('click', 'a', (event, data) => {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(1);
      expect(events).to.have.deep.property('[0].event.type', 'click');
    });

    it('maintains event target', () => {
      const nav = fixture.querySelector('nav');
      const element = fixture.querySelector('a[href="#text__headings"]');
      let target;
      new Elements(nav).on('click', 'a', event => {
        target = event.target;
      });
      simulant.fire(element, 'click');
      expect(target).to.equal(element);
    });

    it('maintains current target', () => {
      const nav = fixture.querySelector('nav');
      const element = fixture.querySelector('a[href="#text__headings"]');
      let currentTarget;
      new Elements(nav).on('click', 'a', event => {
        currentTarget = event.currentTarget;
      });
      simulant.fire(element, 'click');
      expect(currentTarget).to.equal(nav);
    });

    it('doesn\'t call callback on delegated mouse click if selector doesn\'t match', () => {
      const nav = fixture.querySelector('nav');
      const element = fixture.querySelector('a[href="#text__headings"]');
      const events = [];
      new Elements(nav).on('click', '#text__paragraphs', (event, data) => {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(0);
    });

    it('doesn\'t call callback on delegated mouse click on same element', () => {
      const element = fixture.querySelector('a[href="#text__headings"]');
      const events = [];
      new Elements(element).on('click', 'a', (event, data) => {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(0);
    });
  });

  describe('bubbling events', () => {
    it('calls callback on delegated mouse click', () => {
      const main = fixture.querySelector('main');
      const element = fixture.querySelector('#text__paragraphs p');
      const events = [];
      new Elements(main).on('click', '#text__paragraphs', (event, data) => {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(1);
      expect(events).to.have.deep.property('[0].event.type', 'click');
    });

    it('maintains event target', () => {
      const main = fixture.querySelector('main');
      const element = fixture.querySelector('#text__paragraphs p');
      let target;
      new Elements(main).on('click', '#text__paragraphs', event => {
        target = event.target;
      });
      simulant.fire(element, 'click');
      expect(target).to.equal(element);
    });

    it('maintains current target', () => {
      const main = fixture.querySelector('main');
      const element = fixture.querySelector('#text__paragraphs p');
      let currentTarget;
      new Elements(main).on('click', '#text__paragraphs', event => {
        currentTarget = event.currentTarget;
      });
      simulant.fire(element, 'click');
      expect(currentTarget).to.equal(main);
    });

    it('doesn\'t call callback on delegated mouse click if selector doesn\'t match', () => {
      const main = fixture.querySelector('main');
      const element = fixture.querySelector('#text__paragraphs');
      const events = [];
      new Elements(main).on('click', '#text__paragraphs p', (event, data) => {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(0);
    });

    it('doesn\'t call callback on delegated mouse click on same element', () => {
      const element = fixture.querySelector('#text__paragraphs p');
      const events = [];
      new Elements(element).on('click', '#text__paragraphs', (event, data) => {
        events.push({ event, data });
      });
      simulant.fire(element, 'click');
      expect(events).to.be.an('array').that.has.length(0);
    });
  });
});
