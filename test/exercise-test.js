var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing quantified self', function() {
    var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  })

  test.afterEach(function() {
    driver.quit();
  })

  test.it('should allow me to add a name and calorie amount', function() {

    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    name.sendKeys('pushups');
    calories.sendKeys('100 test calories');

    var submitButton = driver.findElement({id: 'exercise-submit'})
    submitButton.click()

    driver.findElement({id: 'name-cell-id'}).getText().then(function(nameCell){
      assert.equal(nameCell, 'pushups')
    });

    driver.findElement({id: 'calorie-cell-id'}).getText().then(function(nameCell){
      assert.equal(nameCell, '100 test calories')
    });

  });



});
