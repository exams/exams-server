'use strict';

describe('Singlechoices E2E Tests:', function () {
  describe('Test Singlechoices page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/singlechoices');
      expect(element.all(by.repeater('singlechoice in singlechoices')).count()).toEqual(0);
    });
  });
});
