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

  test.it('Total calories update when food is added to breakfast table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var breakfastButton = driver.findElement({id: 'breakfast-btn'});
    breakfastButton.click();

    driver.findElement({id: 'breakfast-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Total Calories 200')
    });
  });

  test.it('Remaining calories update when food is added to breakfast table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var breakfastButton = driver.findElement({id: 'breakfast-btn'});
    breakfastButton.click();

    driver.findElement({id: 'breakfast-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Remaining Calories 200')
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

  test.it('Total calories update when food is added to lunch table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var lunchButton = driver.findElement({id: 'lunch-btn'});
    lunchButton.click();

    driver.findElement({id: 'lunch-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Total Calories 200')
    });
  });

  test.it('Remaining calories update when food is added to lunch table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var lunchButton = driver.findElement({id: 'lunch-btn'});
    lunchButton.click();

    driver.findElement({id: 'lunch-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Remaining Calories 400')
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

  test.it('Total calories update when food is added to dinner table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var dinnerButton = driver.findElement({id: 'dinner-btn'});
    dinnerButton.click();

    driver.findElement({id: 'dinner-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Total Calories 200')
    });
  });

  test.it('Remaining calories update when food is added to dinner table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var dinnerButton = driver.findElement({id: 'dinner-btn'});
    dinnerButton.click();

    driver.findElement({id: 'dinner-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Remaining Calories 600')
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

  test.it('Total calories update when food is added to snacks table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var snacksButton = driver.findElement({id: 'snacks-btn'});
    snacksButton.click();

    driver.findElement({id: 'snacks-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Total Calories 200')
    });
  });

  test.it('Remaining calories update when food is added to snacks table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    checkBox.click();

    var snacksButton = driver.findElement({id: 'snacks-btn'});
    snacksButton.click();

    driver.findElement({id: 'snacks-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Remaining Calories 0')
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

  test.it('Total calories update when exercise is added to diary exercise table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'exercise-checkbox-id'});
    checkBox.click();

    var dinnerButton = driver.findElement({id: 'add-exercise'});
    dinnerButton.click();

    driver.findElement({id: 'exercise-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Total Calories 200')
    });
  });

  test.it('Totals table updates with calories consumed', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    var breakfastButton = driver.findElement({id: 'breakfast-btn'});

    checkBox.click();
    breakfastButton.click();
    checkBox.click();
    breakfastButton.click();


    driver.findElement({id: 'totals-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Calories Consumed 400')
    });
  });

  test.it('Totals table updates with calories burned', function() {

    driver.get('http://localhost:8080');

    var checkBoxEx = driver.findElement({id: 'exercise-checkbox-id'});
    var exerciseButton = driver.findElement({id: 'add-exercise'})

    checkBoxEx.click();
    exerciseButton.click();

    driver.findElement({id: 'totals-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Calories Burned 200')
    });
  });

  test.it('Totals table updates with calorie total', function() {

    driver.get('http://localhost:8080');

    var checkBoxEx = driver.findElement({id: 'exercise-checkbox-id'});
    var exerciseButton = driver.findElement({id: 'add-exercise'})
    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    var breakfastButton = driver.findElement({id: 'breakfast-btn'});

    checkBoxEx.click();
    exerciseButton.click();
    checkBox.click();
    breakfastButton.click();
    checkBox.click();
    breakfastButton.click();

    driver.findElement({id: 'totals-table'}).getText().then(function(tableContent){
      assert.include(tableContent, 'Remaining Calories 1800')
    });
  });

  test.it('Checkboxes clear when food is added to a meal table', function() {

    driver.get('http://localhost:8080');

    var checkBox = driver.findElement({id: 'food-checkbox-id'});
    var breakfastButton = driver.findElement({id: 'breakfast-btn'});

    checkBox.click();
    breakfastButton.click();

    checkBox.isSelected().then(function(boolean){
      assert.equal(boolean, false)
    })
  });

  test.it('Checkboxes clear when exercise is added to diary exercise table', function() {

    driver.get('http://localhost:8080');

    var checkBoxEx = driver.findElement({id: 'exercise-checkbox-id'});
    var exerciseButton = driver.findElement({id: 'add-exercise'})

    checkBoxEx.click();
    exerciseButton.click();

    checkBoxEx.isSelected().then(function(boolean){
      assert.equal(boolean, false)
    })
  });

  test.it('Defaults to todays date', function() {

    driver.get('http://localhost:8080');

    var d = new Date()
    var t = d.getDate();
    var y = d.getFullYear();
    var month = new Array(12);
    month[0] =  "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var m = month[d.getMonth()];
    var today = m + " " + t + ", " + y;

    driver.findElement({id: 'diary-today'}).getText().then(function(date){
      assert.equal(date, today)
    })
  });

  test.it('Links to next date', function() {

    var d = new Date()
    d.setDate(d.getDate() + 1);
    var t = d.getDate();
    var y = d.getFullYear();
    var month = new Array(12);
    month[0] =  "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var m = month[d.getMonth()];
    var tomorrow = m + " " + t + ", " + y;

    driver.get('http://localhost:8080');
    var nextDay  = driver.findElement({id: 'diary-tomorrow'})

    nextDay.click();

    driver.findElement({id: 'diary-today'}).getText().then(function(date){
      assert.equal(date, tomorrow)
    })
  });

  test.it('Links to previous date', function() {

    var d = new Date()
    d.setDate(d.getDate() - 1);
    var t = d.getDate();
    var y = d.getFullYear();
    var month = new Array(12);
    month[0] =  "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var m = month[d.getMonth()];
    var yesterday = m + " " + t + ", " + y;

    driver.get('http://localhost:8080');
    var nextDay  = driver.findElement({id: 'diary-yesterday'})

    nextDay.click();

    driver.findElement({id: 'diary-today'}).getText().then(function(date){
      assert.equal(date, yesterday)
    })
  });

});
