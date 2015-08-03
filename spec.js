describe('Globophone App', function() {
  beforeEach(function() {
    browser.driver.get('https://jessygreben.github.io/');
  });

  restartBrowserBetweenTests: true,

  it('should have a title', function() {
    expect(browser.driver.getTitle()).toEqual('Globophone');
  });

  it('should have a form with a name and phone number input field', function() {
    browser.driver.isElementPresent(by.id('numberForm')).then(function(present){
      expect(present).toBe(true);
    })
    browser.driver.isElementPresent(by.id('name')).then(function(present){
      expect(present).toBe(true);
    })
    browser.driver.isElementPresent(by.id('number')).then(function(present){
      expect(present).toBe(true);
    })
  });

  it('should show an error when no name is submitted', function() {
    browser.driver.findElement(by.id('name')).sendKeys('');
    browser.driver.findElement(by.id('number')).sendKeys('1231231234');
    browser.driver.findElement(by.className('save-btn')).click();
    browser.driver.isElementPresent(by.className('name-error')).then(function(present){
      expect(present).toBe(true);
    })
  });

  it('should show an error when no phone number is submitted', function() {
    browser.driver.findElement(by.id('name')).sendKeys('Test');
    browser.driver.findElement(by.id('number')).sendKeys('');
    browser.driver.findElement(by.className('save-btn')).click();
    browser.driver.isElementPresent(by.className('name-error')).then(function(present){
      expect(present).toBe(true);
    })
  });

  it('should show an error when a phone number less than 10 digits is sumbitted', function() {
    browser.driver.findElement(by.id('name')).sendKeys('Test');
    browser.driver.findElement(by.id('number')).sendKeys('1');
    browser.driver.findElement(by.className('save-btn')).click();
    browser.driver.isElementPresent(by.className('name-error')).then(function(present){
      expect(present).toBe(true);
    })
    browser.driver.navigate().refresh()
  });

  it('should show an error when a phone number with more than 11 digits is submitted', function() {
    browser.driver.findElement(by.id('name')).sendKeys('Test');
    browser.driver.findElement(by.id('number')).sendKeys('123123123456');
    browser.driver.findElement(by.className('save-btn')).click();
    browser.driver.isElementPresent(by.className('name-error')).then(function(present){
      expect(present).toBe(true);
    })
    browser.driver.navigate().refresh()
  });

  it('should show an error when a phone number starts with a 0', function() {
    browser.driver.findElement(by.id('name')).sendKeys('Test');
    browser.driver.findElement(by.id('number')).sendKeys('0231231234');
    browser.driver.findElement(by.className('save-btn')).click();
    browser.driver.isElementPresent(by.className('name-error')).then(function(present){
      expect(present).toBe(true);
    })
  });

  it('should hide the form when the save button is clicked with a valid name and phone number submitted', function() {
    browser.driver.findElement(by.id('name')).sendKeys('Test');
    browser.driver.findElement(by.id('number')).sendKeys('1231231234');
    browser.driver.findElement(by.className('save-btn')).click();
    browser.driver.isElementPresent(by.className('numberForm')).then(function(present){
      expect(present).toBe(false);
    })
  })

  it('should show a saved notification when a valid name and valid phone number are submitted', function() {
    browser.driver.findElement(by.id('name')).sendKeys('Test');
    browser.driver.findElement(by.id('number')).sendKeys('1231231234');
    browser.driver.findElement(by.className('save-btn')).click();
    browser.driver.isElementPresent(by.className('saved-notification')).then(function(present){
      expect(present).toBe(true);
    })
  })

  it('should show a "go back" link when a valid name and valid phone number are submitted', function() {
    browser.driver.findElement(by.id('name')).sendKeys('Test');
    browser.driver.findElement(by.id('number')).sendKeys('1231231234');
    browser.driver.findElement(by.className('save-btn')).click();
    browser.driver.isElementPresent(by.className('back')).then(function(present){
      expect(present).toBe(true);
    })
  })

  it('should show form with user name and phone number after "go back" link is clicked', function() {
    browser.driver.findElement(by.id('name')).sendKeys('Test');
    browser.driver.findElement(by.id('number')).sendKeys('1231231234');
    browser.driver.findElement(by.className('save-btn')).click();
    browser.driver.findElement(by.className('back')).click();
    browser.driver.isElementPresent(by.className('user-info-form')).then(function(present){
      expect(present).toBe(true);
    })
  })

  it('should show a delete button once a valid form is submitted and the "go back" link is clicked', function() {
    browser.driver.findElement(by.id('name')).sendKeys('Test');
    browser.driver.findElement(by.id('number')).sendKeys('1231231234');
    browser.driver.findElement(by.className('save-btn')).click();
    browser.driver.findElement(by.className('back')).click();
    browser.driver.isElementPresent(by.className('delete-btn')).then(function(present){
      expect(present).toBe(true);
    })
  })

  it('should remove delete button after delete button is clicked', function() {
    browser.driver.findElement(by.id('name')).sendKeys('Test');
    browser.driver.findElement(by.id('number')).sendKeys('1231231234');
    browser.driver.findElement(by.className('save-btn')).click();
    browser.driver.findElement(by.className('back')).click();
    browser.driver.findElement(by.className('delete-btn')).click();
    browser.driver.isElementPresent(by.className('delete-btn')).then(function(present){
      expect(present).toBe(false);
    })
  })

});