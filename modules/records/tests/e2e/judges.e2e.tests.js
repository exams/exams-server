'use strict';

describe('Judges E2E Tests:', function () {
  describe('Test Judges page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/judges');
      expect(element.all(by.repeater('judge in judges')).count()).toEqual(0);
    });
  });
});
