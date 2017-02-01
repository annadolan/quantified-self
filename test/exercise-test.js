var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing quantified self exercises', function() {
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

  test.it('User can add a name and calorie amount', function() {

    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    name.sendKeys('pushups');
    calories.sendKeys('100 test calories');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    driver.findElement({id: 'exercise-name-cell'}).getText().then(function(nameCell){
      assert.equal(nameCell, 'pushups')
    });

    driver.findElement({id: 'exercise-calorie-cell'}).getText().then(function(nameCell){
      assert.equal(nameCell, '100 test calories')
    });

  });

  test.it('New exercises are added to top of table', function() {

    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    name.sendKeys('pushups');
    calories.sendKeys('100 test calories');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    name.sendKeys('pushdowns');
    calories.sendKeys('200 test calories');

    submitButton.click()

    driver.findElement({id: 'all-exercises-table'}).getText().then(function(tableContent){
      assert.equal(tableContent, 'Name Calories\npushdowns 200 test calories\npushups 100 test calories')
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

      var deleteIcon = driver.findElement({id: 'exercise-trash-icon'});
      deleteIcon.click()

      driver.findElement({id: 'all-exercises-table'}).getText().then(function(tableContent){
        assert.equal(tableContent, 'Name Calories')
      });
  });

  test.it('User can edit an exercise name', function() {

    driver.get('http://localhost:8080/exercises.html');
      var name = driver.findElement({id: 'name-field'});
      var calories = driver.findElement({id: 'calorie-field'});
      name.sendKeys('fly');
      calories.sendKeys('500 test calories');

      var submitButton = driver.findElement({id: 'exercise-submit'});
      submitButton.click();

      driver.get('http://localhost:8080/exercises.html');

      var exName = driver.findElement({id: 'exercise-name-cell'});
      exName.click();
      exName.clear();
      exName.sendKeys('zoom');
      exName.sendKeys(webdriver.Key.ENTER);

      driver.findElement({id: 'all-exercises-table'}).getText().then(function(tableContent){
        assert.equal(tableContent, 'Name Calories\nzoom 500 test calories')
      });
  });

  test.it('User can edit exercise calories', function() {

    driver.get('http://localhost:8080/exercises.html');
      var name = driver.findElement({id: 'name-field'});
      var calories = driver.findElement({id: 'calorie-field'});
      name.sendKeys('fly');
      calories.sendKeys('500 test calories');

      var submitButton = driver.findElement({id: 'exercise-submit'});
      submitButton.click();

      driver.get('http://localhost:8080/exercises.html');

      var exName = driver.findElement({id: 'exercise-calorie-cell'});
      exName.click();
      exName.clear();
      exName.sendKeys('300 test calories');
      exName.sendKeys(webdriver.Key.ENTER);

      driver.findElement({id: 'all-exercises-table'}).getText().then(function(tableContent){
        assert.equal(tableContent, 'Name Calories\nfly 300 test calories')
      });
  });

  test.xit('Table filters based on input', function() {

    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    name.sendKeys('pushups');
    calories.sendKeys('100 test calories');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    name.sendKeys('pushdowns');
    calories.sendKeys('200 test calories');

    submitButton.click()

    driver.findElement({id: 'all-exercises-table'}).getText().then(function(tableContent){
      assert.equal(tableContent, 'Name Calories\npushdowns 200 test calories\npushups 100 test calories')
    });

    var filterField = driver.findElement({id: 'filter-field'})
    filterField.sendKeys('down')

    driver.findElement({id: 'all-exercises-table'}).getText().then(function(tableContent){
      assert.equal(tableContent, 'Name Calories\npushdowns 200 test calories')
    });

  });

  test.it('Error message flashes if exercise name is empty', function() {
    driver.get('http://localhost:8080/exercises.html');
      var calories = driver.findElement({id: 'calorie-field'});
      calories.sendKeys('15 test calories');

      var submitButton = driver.findElement({id: 'exercise-submit'});
      submitButton.click()

      driver.findElement({id: 'name-error'}).getText().then(function(errorMessage){
        assert.equal(errorMessage, 'Please enter exercise name')
      });

      driver.findElement({id: 'all-exercises-table'}).getText().then(function(tableContent){
        assert.equal(tableContent, 'Name Calories')
      });
  });

  test.it('Error message flashes if calorie name is empty', function() {
    driver.get('http://localhost:8080/exercises.html');
      var exerciseName = driver.findElement({id: 'name-field'});
      exerciseName.sendKeys('Arm Wrestling');

      var submitButton = driver.findElement({id: 'exercise-submit'});
      submitButton.click()

      driver.findElement({id: 'calories-error'}).getText().then(function(errorMessage){
        assert.equal(errorMessage, 'Please enter a calorie amount')
      });

      driver.findElement({id: 'all-exercises-table'}).getText().then(function(tableContent){
        assert.equal(tableContent, 'Name Calories')
      });
  });

  test.it('Calorie error messages clear upon successful creation', function() {
    driver.get('http://localhost:8080/exercises.html');
    var exerciseName = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    exerciseName.sendKeys('Deadlifts');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    driver.findElement({id: 'calories-error'}).getText().then(function(errorMessage){
      assert.equal(errorMessage, 'Please enter a calorie amount')
    });

    calories.sendKeys('1000 test calories');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    driver.findElement({id: 'exercise-name-cell'}).getText().then(function(nameCell){
      assert.equal(nameCell, 'Deadlifts')
    });

    driver.findElement({id: 'calories-error'}).getText().then(function(errorMessage){
      assert.equal(errorMessage, '')
    });
  });

  test.it('Exercise error messages clear upon successful creation', function() {
    driver.get('http://localhost:8080/exercises.html');
    var exerciseName = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    calories.sendKeys('2000 test calories');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    driver.findElement({id: 'name-error'}).getText().then(function(errorMessage){
      assert.equal(errorMessage, 'Please enter exercise name')
    });

    exerciseName.sendKeys('Karate');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    driver.findElement({id: 'exercise-name-cell'}).getText().then(function(nameCell){
      assert.equal(nameCell, 'Karate')
    });

    driver.findElement({id: 'name-error'}).getText().then(function(errorMessage){
      assert.equal(errorMessage, '')
    });
  });

  test.it('Exercise form clears upon successful creation', function() {
    driver.get('http://localhost:8080/exercises.html');
    var exerciseName = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    calories.sendKeys('2000 test calories');
    exerciseName.sendKeys('Karate');

    var submitButton = driver.findElement({id: 'exercise-submit'});
    submitButton.click()

    exerciseName.getText().then(function(exerciseName){
      assert.equal(exerciseName, '')
    });

    calories.getText().then(function(calories){
      assert.equal(calories, '')
    });
  });

});
