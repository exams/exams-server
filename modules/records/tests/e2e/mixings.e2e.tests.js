'use strict';

describe('Mixings E2E Tests:', function () {
  describe('Test Mixings page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/mixings');
      expect(element.all(by.repeater('mixing in mixings')).count()).toEqual(0);
    });
  });
});
