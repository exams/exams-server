'use strict';

describe('Blanks E2E Tests:', function () {
  describe('Test Blanks page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/blanks');
      expect(element.all(by.repeater('blank in blanks')).count()).toEqual(0);
    });
  });
});
