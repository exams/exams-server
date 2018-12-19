'use strict';

describe('Questanswers E2E Tests:', function () {
  describe('Test Questanswers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/questanswers');
      expect(element.all(by.repeater('questanswer in questanswers')).count()).toEqual(0);
    });
  });
});
