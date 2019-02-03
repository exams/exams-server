'use strict';

describe('Papars E2E Tests:', function () {
  describe('Test Papars page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/papars');
      expect(element.all(by.repeater('papar in papars')).count()).toEqual(0);
    });
  });
});
