'use strict';

describe('Papers E2E Tests:', function () {
  describe('Test Papers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/papers');
      expect(element.all(by.repeater('paper in papers')).count()).toEqual(0);
    });
  });
});
