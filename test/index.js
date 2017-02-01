var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing quantified self diary page', function() {
    var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
      driver.get('http://localhost:8080/foods.html')
      var name = driver.findElement({id: 'foodname'});
      var calories = driver.findElement({id: 'caloriecount'});
      var submitButton = driver.findElement({id: 'new-food-button'});
      name.sendKeys('pizza');
      calories.sendKeys('100 test calories');

      submitButton.click()

      name.sendKeys('pie');
      calories.sendKeys('200 test calories');

      submitButton.click()

      driver.get('http://localhost:8080/exercises.html')
      var name = driver.findElement({id: 'name-field'});
      var calories = driver.findElement({id: 'calorie-field'});
      name.sendKeys('pushups');
      calories.sendKeys('100 test calories');

      submitButton = driver.findElement({id: 'exercise-submit'});
      submitButton.click()

      name.sendKeys('pushdowns');
      calories.sendKeys('200 test calories');

      submitButton.click()
  })

  test.afterEach(function() {
    driver.quit();
  })


  test.it('User can add a name and calorie amount to breakfast table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var breakfastButton = driver.findElement({id: 'breakfast-btn'});
    breakfastButton.click();

    driver.findElement({id: 'breakfast-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'pie 200 test calories')
    });
  });

  test.it('Total and remaining calories update when food is added to breakfast table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var breakfastButton = driver.findElement({id: 'breakfast-btn'});
    breakfastButton.click();

    driver.findElement({id: 'breakfast-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Total Calories 200\nRemaining Calories 200')
    });
  });

  test.it('User can add a name and calorie amount to lunch table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var lunchButton = driver.findElement({id: 'lunch-btn'});
    lunchButton.click();

    driver.findElement({id: 'lunch-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'pie 200 test calories')
    });
  });

  test.it('Total and remaining calories update when food is added to lunch table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var lunchButton = driver.findElement({id: 'lunch-btn'});
    lunchButton.click();

    driver.findElement({id: 'lunch-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Total Calories 200\nRemaining Calories 400')
    });
  });

  test.it('User can add a name and calorie amount to dinner table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var dinnerButton = driver.findElement({id: 'dinner-btn'});
    dinnerButton.click();

    driver.findElement({id: 'dinner-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'pie 200 test calories')
    });
  });

  test.it('Total and remaining calories update when food is added to dinner table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var dinnerButton = driver.findElement({id: 'dinner-btn'});
    dinnerButton.click();

    driver.findElement({id: 'dinner-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Total Calories 200\nRemaining Calories 600')
    });
  });

  test.it('User can add a name and calorie amount to snacks table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var snacksButton = driver.findElement({id: 'snacks-btn'});
    snacksButton.click();

    driver.findElement({id: 'snacks-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'pie 200 test calories')
    });
  });

  test.it('Total and remaining calories update when food is added to snacks table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var snacksButton = driver.findElement({id: 'snacks-btn'});
    snacksButton.click();

    driver.findElement({id: 'snacks-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Total Calories 200\nRemaining Calories 0')
    });
  });

  test.it('User can add a name and calorie amount to diary exercise table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'exercise-checkbox-id'});
    checkBox.click();

    var dinnerButton = driver.findElement({id: 'add-exercise'});
    dinnerButton.click();

    driver.findElement({id: 'exercise-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'pushdowns 200 test calories')
    });
  });
});
