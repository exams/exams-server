'use strict';

describe('Multichoices E2E Tests:', function () {
  describe('Test Multichoices page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/multichoices');
      expect(element.all(by.repeater('multichoice in multichoices')).count()).toEqual(0);
    });
  });
});
