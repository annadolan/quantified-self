var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing quantified self foods', function() {
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

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'foodname'});
    var calories = driver.findElement({id: 'caloriecount'});
    name.sendKeys('pizza');
    calories.sendKeys('100 test calories');

    var submitButton = driver.findElement({id: 'new-food-button'});
    submitButton.click()

    driver.findElement({id: 'food-name-cell'}).getText().then(function(nameCell){
      assert.equal(nameCell, 'pizza')
    });

    driver.findElement({id: 'food-calorie-cell'}).getText().then(function(nameCell){
      assert.equal(nameCell, '100 test calories')
    });

  });

  test.it('User can delete a food', function() {

    driver.get('http://localhost:8080/foods.html');
      var name = driver.findElement({id: 'foodname'});
      var calories = driver.findElement({id: 'caloriecount'});
      name.sendKeys('lettuce');
      calories.sendKeys('20 test calories');

      var submitButton = driver.findElement({id: 'new-food-button'});
      submitButton.click()

      driver.get('http://localhost:8080/foods.html');

      var deleteIcon = driver.findElement({id: 'food-trash-id'});
      deleteIcon.click()

      driver.findElement({id: 'foods-table'}).getText().then(function(tableContent){
        assert.equal(tableContent, 'Food Calories')
      });
  });

  test.it('Error message flashes if food name is empty', function() {
    driver.get('http://localhost:8080/foods.html');
      var calories = driver.findElement({id: 'caloriecount'});
      calories.sendKeys('15 test calories');

      var submitButton = driver.findElement({id: 'new-food-button'});
      submitButton.click()

      driver.findElement(webdriver.By.id('food-error')).getText().then(function(foodError){
        assert.equal(foodError, '', 'Please enter a food name')
      });

      driver.findElement({id: 'foods-table'}).getText().then(function(tableContent){
        assert.equal(tableContent, 'Food Calories')
      });
  });

  test.it('Error message flashes if calorie field is empty', function() {
    driver.get('http://localhost:8080/foods.html');
      var exerciseName = driver.findElement({id: 'foodname'});
      exerciseName.sendKeys('menudo');

      var submitButton = driver.findElement({id: 'new-food-button'});
      submitButton.click()

      driver.findElement(webdriver.By.id('calorie-error')).getText().then(function(calorieError){
        assert.equal(calorieError, '', 'Please enter a calorie amount')
      });

      driver.findElement({id: 'foods-table'}).getText().then(function(tableContent){
        assert.equal(tableContent, 'Food Calories')
      });
  });

  test.it('Calorie error messages clear upon successful creation', function() {
    driver.get('http://localhost:8080/foods.html');
    var exerciseName = driver.findElement({id: 'foodname'});
    var calories = driver.findElement({id: 'caloriecount'});
    exerciseName.sendKeys('coconut');

    var submitButton = driver.findElement({id: 'new-food-button'});
    submitButton.click()

    driver.findElement(webdriver.By.id('calorie-error')).getText().then(function(errorMessage){
      assert.equal(errorMessage, '', 'Please enter a calorie amount')
    });

    calories.sendKeys('1000 test calories');

    var submitButton = driver.findElement({id: 'new-food-button'});
    submitButton.click()

    driver.findElement({id: 'food-name-cell'}).getText().then(function(nameCell){
      assert.equal(nameCell, 'coconut')
    });

    driver.findElement(webdriver.By.id('calorie-error')).getText().then(function(calorieError){
      assert.equal(calorieError, '', '')
    });
  });

  test.it('Food error messages clear upon successful creation', function() {
    driver.get('http://localhost:8080/foods.html');
    var exerciseName = driver.findElement({id: 'foodname'});
    var calories = driver.findElement({id: 'caloriecount'});
    calories.sendKeys('2000 test calories');

    var submitButton = driver.findElement({id: 'new-food-button'});
    submitButton.click()

    driver.findElement(webdriver.By.id('food-error')).getText().then(function(foodError){
      assert.equal(foodError, '', 'Please enter a food name')
    });

    exerciseName.sendKeys('Cat food');

    var submitButton = driver.findElement({id: 'new-food-button'});
    submitButton.click()

    driver.findElement({id: 'food-name-cell'}).getText().then(function(nameCell){
      assert.equal(nameCell, 'Cat food')
    });

    driver.findElement(webdriver.By.id('food-error')).getText().then(function(errorMessage){
      assert.equal(errorMessage, '', '')
    });
  });

});
