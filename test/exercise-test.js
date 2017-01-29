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

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    driver.findElement({id: 'name-cell-id'}).getText().then(function(nameCell){
      assert.equal(nameCell, 'pushups')
    });

    driver.findElement({id: 'calorie-cell-id'}).getText().then(function(nameCell){
      assert.equal(nameCell, '100 test calories')
    });

  });

  test.it('User can delete an exercise', function() {

    driver.get('http://localhost:8080/exercises.html');
      var name = driver.findElement({id: 'name-field'});
      var calories = driver.findElement({id: 'calorie-field'});
      name.sendKeys('flying');
      calories.sendKeys('500 test calories');

      var submitButton = driver.findElement({id: 'exercise-submit'});
      submitButton.click()

      driver.get('http://localhost:8080/exercises.html');

      var deleteIcon = driver.findElement({id: 'trash-icon-ex'});
      deleteIcon.click()

      driver.findElement({id: 'all-exercises-table'}).getText().then(function(tableContent){
        assert.equal(tableContent, 'Name Calories Delete')
      });
  });

  test.it('Error message flashes if exercise name is empty', function() {
    driver.get('http://localhost:8080/exercises.html');
      var calories = driver.findElement({id: 'calorie-field'});
      calories.sendKeys('15 test calories');

      var submitButton = driver.findElement({id: 'exercise-submit'});
      submitButton.click()

      driver.findElement({id: 'error-message-id'}).getText().then(function(errorMessage){
        assert.equal(errorMessage, 'Please enter an exercise name')
      });

      driver.findElement({id: 'all-exercises-table'}).getText().then(function(tableContent){
        assert.equal(tableContent, 'Name Calories Delete')
      });
  });

  test.it('Error message flashes if calorie name is empty', function() {
    driver.get('http://localhost:8080/exercises.html');
      var exerciseName = driver.findElement({id: 'name-field'});
      exerciseName.sendKeys('Arm Wrestling');

      var submitButton = driver.findElement({id: 'exercise-submit'});
      submitButton.click()

      driver.findElement({id: 'error-message-id'}).getText().then(function(errorMessage){
        assert.equal(errorMessage, 'Please enter a calorie amount')
      });

      driver.findElement({id: 'all-exercises-table'}).getText().then(function(tableContent){
        assert.equal(tableContent, 'Name Calories Delete')
      });
  });

  test.it('Calorie error messages clear apon successful creation', function() {
    driver.get('http://localhost:8080/exercises.html');
    var exerciseName = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    exerciseName.sendKeys('Deadlifts');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    driver.findElement({id: 'error-message-id'}).getText().then(function(errorMessage){
      assert.equal(errorMessage, 'Please enter a calorie amount')
    });

    calories.sendKeys('1000 test calories');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    driver.findElement({id: 'name-cell-id'}).getText().then(function(nameCell){
      assert.equal(nameCell, 'Deadlifts')
    });

    driver.findElement({id: 'error-message-id'}).getText().then(function(errorMessage){
      assert.equal(errorMessage, '')
    });
  });

  test.it('Exercise error messages clear apon successful creation', function() {
    driver.get('http://localhost:8080/exercises.html');
    var exerciseName = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    calories.sendKeys('2000 test calories');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    driver.findElement({id: 'error-message-id'}).getText().then(function(errorMessage){
      assert.equal(errorMessage, 'Please enter an exercise name')
    });

    exerciseName.sendKeys('Karate');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    driver.findElement({id: 'name-cell-id'}).getText().then(function(nameCell){
      assert.equal(nameCell, 'Karate')
    });

    driver.findElement({id: 'error-message-id'}).getText().then(function(errorMessage){
      assert.equal(errorMessage, '')
    });
  });

});
