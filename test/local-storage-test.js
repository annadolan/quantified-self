var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing localStorage', function() {
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

  test.it("localStorage of exercises persists accross refreshes", function(){
    driver.get("http://localhost:8080/exercises.html");
    driver.executeScript("var exercises = JSON.parse('[]').push({exerciseName: 'Cartwheel', calorieCount: '17'});exerciseDataJSON = JSON.stringify(exercises); return window.localStorage.setItem('exercise-calories', exerciseDataJSON);");

    driver.get("http://localhost:8080/exercises.html");
    driver.executeScript("return window.localStorage.getItem('exercise-calories')").then(function(exerciseName){
      assert.equal(exerciseName, '1');
    });
  });
});
