/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var diaryFoodsTable = document.getElementById('diary-foods-table');
	var diaryExercisesTable = document.getElementById('diary-exercises-table');
	var Food = __webpack_require__(1);
	var Exercise = __webpack_require__(5);
	var addExerciseButton = document.getElementById('add-exercise');

	function displayFoodData() {
	  JSON.parse(localStorage.getItem('foods')).forEach(function (element) {
	    submitFood(element.name, element.calories);
	  });
	}

	function displayExerciseData() {
	  JSON.parse(localStorage.getItem('exercise-calories')).forEach(function (element) {
	    submitExercise(element.exerciseName, element.calorieCount);
	  });
	}

	function submitFood(name, calories) {
	  var newRow = document.createElement('tr');
	  var nameCell = document.createElement('td');
	  nameCell.innerText = name;
	  nameCell.className = "name-cell";
	  var calorieCell = document.createElement('td');
	  calorieCell.innerText = calories;
	  calorieCell.className = "calorie-cell";
	  var checkBox = document.createElement('input');
	  checkBox.type = "checkbox";
	  checkBox.className = "food-checkbox";
	  newRow.appendChild(checkBox);
	  newRow.appendChild(nameCell);
	  newRow.appendChild(calorieCell);
	  diaryFoodsTable.insertBefore(newRow, diaryFoodsTable.children[1]);
	}

	function uncheckFoodCheckboxes() {
	  $(".food-checkbox").each(function () {
	    ;
	    this.checked = false;
	  });
	}

	function submitExercise(exerciseName, calorieCount) {
	  var newRow = document.createElement('tr');
	  var nameCell = document.createElement('td');
	  nameCell.innerText = exerciseName;
	  nameCell.className = "name-cell";
	  var calorieCell = document.createElement('td');
	  calorieCell.innerText = calorieCount;
	  calorieCell.className = "calorie-cell";
	  var checkBox = document.createElement('input');
	  checkBox.type = "checkbox";
	  checkBox.className = "exercise-checkbox";
	  newRow.appendChild(checkBox);
	  newRow.appendChild(nameCell);
	  newRow.appendChild(calorieCell);
	  diaryExercisesTable.insertBefore(newRow, diaryExercisesTable.children[1]);
	}

	displayExerciseData();
	displayFoodData();

	function changeTextColor(remainingCalories, mealId) {
	  if (remainingCalories < 0) {
	    $(mealId).css('color', 'red');
	  } else {
	    $(mealId).css('color', 'green');
	  }
	}

	function filterFoods() {
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("food-diary-filter");
	  filter = input.value.toUpperCase();
	  tr = diaryFoodsTable.getElementsByTagName("tr");

	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }
	  }
	}

	function filterExercises() {
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("exercises-diary-filter");
	  filter = input.value.toUpperCase();
	  tr = diaryExercisesTable.getElementsByTagName("tr");

	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }
	  }
	}

	function dateToday() {
	  var d = new Date();
	  var t = d.getDate();
	  var y = d.getFullYear();
	  var month = new Array(12);
	  month[0] = "January";
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
	  $('#diary-today a').html(today);
	}

	dateToday();

	$("#food-diary-filter").keyup(function () {
	  filterFoods();
	});

	$("#exercises-diary-filter").keyup(function () {
	  filterExercises();
	});

	$("#add-exercise").on('click', function () {
	  exerciseSubmit();
	});

	function exerciseSubmit() {
	  var exercises = document.getElementsByClassName('exercise-checkbox');

	  for (i = 0; i < exercises.length; i++) {
	    if (exercises[i].checked === true) {
	      var eName = exercises[i].nextElementSibling.innerText;
	      var eCalories = exercises[i].nextElementSibling.nextElementSibling.innerText;
	      populateExerciseTable(eName, eCalories);
	      calculateTotalCalories();
	      updateRemainingCalories(eCalories, 0);
	      exercises[i].checked = false;
	    }
	  }
	}

	function populateExerciseTable(eName, eCalories) {
	  var exercisesTable = document.getElementById('exercise-table');
	  var row = exercisesTable.insertRow(1);
	  var nameCell = row.insertCell(0);
	  var caloriesCell = row.insertCell(1);
	  var trashCell = row.insertCell(2);
	  nameCell.innerText = eName;
	  caloriesCell.innerText = eCalories;
	  caloriesCell.className = "exercise-calorie-cell";
	  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
	}

	function calculateTotalCalories() {
	  var exercisesTable = document.getElementById('exercise-table');
	  var totalCalorieCell = document.getElementById('exercise-total-cals');
	  var totalCalories = 0;

	  $(".exercise-calorie-cell").each(function () {
	    ;
	    totalCalories += parseFloat(this.innerText);
	  });

	  totalCalorieCell.innerText = totalCalories;

	  if (totalCalories > 0) {
	    $('#remaining-calories').css('color', 'green');
	  } else {
	    $('#remaining-calories').css('color', 'black');
	  }

	  updateCaloriesBurned(totalCalories);
	}

	$("#breakfast-btn").on('click', function () {
	  mealSubmit();
	});

	$("#lunch-btn").on('click', function () {
	  mealSubmit();
	});

	$("#dinner-btn").on('click', function () {
	  mealSubmit();
	});

	$("#snacks-btn").on('click', function () {
	  mealSubmit();
	});

	function mealSubmit() {
	  var foods = document.getElementsByClassName('food-checkbox');

	  for (i = 0; i < foods.length; i++) {
	    if (foods[i].checked === true) {
	      var fName = foods[i].nextElementSibling.innerText;
	      var fCalories = foods[i].nextElementSibling.nextElementSibling.innerText;
	      if (event.currentTarget.id === "breakfast-btn") {
	        populateBreakfastTable(fName, fCalories);
	        calculateTotalBreakfastCalories();
	        updateCaloriesConsumed();
	        updateRemainingCalories(0, fCalories);
	      }
	      if (event.currentTarget.id === "lunch-btn") {
	        populateLunchTable(fName, fCalories);
	        calculateTotalLunchCalories();
	        updateCaloriesConsumed();
	        updateRemainingCalories(0, fCalories);
	      }
	      if (event.currentTarget.id === "dinner-btn") {
	        populateDinnerTable(fName, fCalories);
	        calculateTotalDinnerCalories();
	        updateCaloriesConsumed();
	        updateRemainingCalories(0, fCalories);
	      }
	      if (event.currentTarget.id === "snacks-btn") {
	        populateSnacksTable(fName, fCalories);
	        calculateTotalSnackCalories();
	        updateCaloriesConsumed();
	        updateRemainingCalories(0, fCalories);
	      }
	    }
	    foods[i].checked = false;
	  }
	}

	function populateBreakfastTable(fName, fCalories) {
	  var breakfastTable = document.getElementById('breakfast-table');
	  addRowToTable(breakfastTable, fName, fCalories);
	}

	function populateLunchTable(fName, fCalories) {
	  var lunchTable = document.getElementById('lunch-table');
	  addRowToTable(lunchTable, fName, fCalories);
	}

	function populateDinnerTable(fName, fCalories) {
	  var dinnerTable = document.getElementById('dinner-table');
	  addRowToTable(dinnerTable, fName, fCalories);
	}

	function populateSnacksTable(fName, fCalories) {
	  var snacksTable = document.getElementById('snacks-table');
	  addRowToTable(snacksTable, fName, fCalories);
	}

	function calculateTotalBreakfastCalories() {
	  var totalCalorieCell = document.getElementById('breakfast-total-cals');
	  var breakfastCalories = 0;

	  $(".breakfast-table-calorie-cell").each(function () {
	    ;
	    breakfastCalories += parseFloat(this.innerText);
	  });

	  totalCalorieCell.innerText = breakfastCalories;
	  calculateRemainingCalories("breakfast", breakfastCalories);
	}

	function calculateRemainingCalories(meal, totalCalories) {
	  if (meal === "breakfast") {
	    var remainingBreakfastCalories = 400 - totalCalories;
	    var breakfastRemainingCell = document.getElementById('breakfast-remaining-cals');
	    breakfastRemainingCell.innerText = remainingBreakfastCalories;
	    changeTextColor(remainingBreakfastCalories, '#breakfast-remaining-cals');
	  }
	  if (meal === "lunch") {
	    remainingLunchCalories = 600 - totalCalories;
	    var lunchRemainingCell = document.getElementById('lunch-remaining-cals');
	    lunchRemainingCell.innerText = remainingLunchCalories;
	    changeTextColor(remainingLunchCalories, '#lunch-remaining-cals');
	  }
	  if (meal === "dinner") {
	    remainingDinnerCalories = 800 - totalCalories;
	    var dinnerRemainingCell = document.getElementById('dinner-remaining-cals');
	    dinnerRemainingCell.innerText = remainingDinnerCalories;
	    changeTextColor(remainingDinnerCalories, '#dinner-remaining-cals');
	  }
	  if (meal === "snacks") {
	    remainingSnacksCalories = 200 - totalCalories;
	    var snacksRemainingCell = document.getElementById('snacks-remaining-cals');
	    snacksRemainingCell.innerText = remainingSnacksCalories;
	    changeTextColor(remainingSnacksCalories, '#snacks-remaining-cals');
	  }
	}

	function calculateTotalLunchCalories() {
	  var lunchCalorieCell = document.getElementById('lunch-total-cals');
	  var lunchCalories = 0;

	  $(".lunch-table-calorie-cell").each(function () {
	    ;
	    lunchCalories += parseFloat(this.innerText);
	  });

	  lunchCalorieCell.innerText = lunchCalories;
	  calculateRemainingCalories("lunch", lunchCalories);
	}

	function calculateTotalDinnerCalories() {
	  var dinnerCalorieCell = document.getElementById('dinner-total-cals');
	  var dinnerCalories = 0;

	  $(".dinner-table-calorie-cell").each(function () {
	    ;
	    dinnerCalories += parseFloat(this.innerText);
	  });

	  dinnerCalorieCell.innerText = dinnerCalories;
	  calculateRemainingCalories("dinner", dinnerCalories);
	}

	function calculateTotalSnackCalories() {
	  var snacksCalorieCell = document.getElementById('snacks-total-cals');
	  var snacksCalories = 0;

	  $(".snacks-table-calorie-cell").each(function () {
	    ;
	    snacksCalories += parseFloat(this.innerText);
	  });

	  snacksCalorieCell.innerText = snacksCalories;
	  calculateRemainingCalories("snacks", snacksCalories);
	}

	function addRowToTable(mealTable, fName, fCalories) {
	  var row = mealTable.insertRow(1);
	  var nameCell = row.insertCell(0);
	  var caloriesCell = row.insertCell(1);
	  var trashCell = row.insertCell(2);
	  nameCell.innerText = fName;
	  caloriesCell.innerText = fCalories;
	  caloriesCell.className = mealTable.id + "-calorie-cell";
	  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
	}

	function setRemainingCalories(goalCalories) {
	  var remainingCaloriesCell = document.getElementById('remaining-calories');
	  remainingCaloriesCell.innerText = goalCalories;
	}

	function updateGoalCalories() {
	  var goalCaloriesCell = document.getElementById('goal-calories');
	  goalCaloriesCell.innerText = 2000;
	  setRemainingCalories(goalCaloriesCell.innerText);
	}

	function updateCaloriesConsumed() {
	  var caloriesConsumedCell = document.getElementById('calories-consumed');
	  var breakfastTotal = document.getElementById('breakfast-total-cals');
	  var lunchTotal = document.getElementById('lunch-total-cals');
	  var dinnerTotal = document.getElementById('dinner-total-cals');
	  var snacksTotal = document.getElementById('snacks-total-cals');
	  var total = 0;

	  if (breakfastTotal.innerText !== "") {
	    total += parseFloat(breakfastTotal.innerText);
	  }
	  if (lunchTotal.innerText !== "") {
	    total += parseFloat(lunchTotal.innerText);
	  }
	  if (dinnerTotal.innerText !== "") {
	    total += parseFloat(dinnerTotal.innerText);
	  }
	  if (snacksTotal.innerText !== "") {
	    total += parseFloat(snacksTotal.innerText);
	  }
	  caloriesConsumedCell.innerText = total;
	}

	function updateCaloriesBurned(totalCalories) {
	  var caloriesBurnedCell = document.getElementById('calories-burned');
	  caloriesBurnedCell.innerText = totalCalories;

	  if (totalCalories > 0) {
	    $('#remaining-calories').css('color', 'green');
	  } else {
	    $('#remaining-calories').css('color', 'black');
	  }
	}

	function updateRemainingCalories(additionalCalories, negativeCalories) {
	  var remainingCaloriesCell = document.getElementById('remaining-calories');

	  if (document.getElementById('goal-calories').innerText === "") {} else {
	    remainingCalories = parseFloat(document.getElementById('remaining-calories').innerText);
	  }

	  remainingCalories += parseFloat(additionalCalories);
	  remainingCalories -= parseFloat(negativeCalories);

	  remainingCaloriesCell.innerText = remainingCalories;
	  if (remainingCalories < 0) {
	    $('#remaining-calories').css('color', 'red');
	  } else {
	    $('#remaining-calories').css('color', 'green');
	  }
	}

	function setTotalsTable() {
	  updateGoalCalories();
	  var caloriesConsumedCell = document.getElementById('calories-consumed');
	  var caloriesBurnedCell = document.getElementById('calories-burned');

	  caloriesConsumedCell.innerText = "0";
	  caloriesBurnedCell.innerText = "0";
	  // updateCaloriesConsumed();
	  // updateCaloriesBurned();
	  updateRemainingCalories(0, 0);
	}
	setTotalsTable();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var foodsTable = document.getElementById('foods-table');
	var trashIcon = document.getElementById('trash-icon');
	var foodForm = document.getElementById('food-form');
	var Reset = __webpack_require__(2);
	var Save = __webpack_require__(3);
	var View = __webpack_require__(4);

	function Food(name, calories) {
	  this.name = name;
	  this.calories = calories;
	}

	Food.prototype.addFood = function () {
	  var reset = new Reset();
	  reset.emptyErrors(foodForm);
	  this.name = $('#foodname').val();
	  this.calories = $('#caloriecount').val();
	  if (this.name === "") {
	    $("#food-error").append("Please enter a food name");
	  } else if (this.calories === "") {
	    $("#calorie-error").append("Please enter a calorie amount");
	  } else {
	    reset.clearFields('#foodname', '#caloriecount');
	    this.storeFoods();
	    reset.clearTable(foodsTable);
	    this.displayFoods();
	  }
	};

	Food.prototype.deleteFood = function () {
	  var name = this.name;
	  var calories = this.calories;
	  var foods = JSON.parse(localStorage.getItem('foods'));
	  foods.forEach(function (object) {
	    if (object.name === name && object.calories === calories) {
	      foods.splice(foods.indexOf(object), 1);
	    }
	    foodJSON = JSON.stringify(foods);
	    localStorage.setItem('foods', foodJSON);
	  });
	};

	Food.prototype.editValue = function (obj, key) {
	  var name = this.name;
	  var calories = this.calories;
	  var type = 'foods';
	  var save = new Save();
	  obj.contentEditable = true;
	  clickedEntry = obj;
	  var originalKey = obj.innerText;
	  event.stopPropagation();
	  $(obj).keydown(function (event) {
	    if (event.keyCode == 13) {
	      var newKey = obj.innerText;
	      obj.contentEditable = false;
	      save.setLocalStorage(key, newKey, name, calories, type);
	    }
	  });
	  $(document).click(function (e) {
	    var newKey = clickedEntry.innerText;
	    clickedEntry.contentEditable = false;
	    save.setLocalStorage(key, newKey, name, calories, type);
	  });
	};

	Food.prototype.storeFoods = function () {
	  var foodDataJSON = localStorage.getItem('foods');
	  if (foodDataJSON === null) {
	    foodDataJSON = '[]';
	  }
	  var foods = JSON.parse(foodDataJSON);
	  foods.push(this);
	  foodDataJSON = JSON.stringify(foods);
	  localStorage.setItem('foods', foodDataJSON);
	};

	Food.prototype.displayFoods = function () {
	  var foods = JSON.parse(localStorage.getItem('foods'));
	  foods.forEach(function (object) {
	    $('#foods-table tr:first-child').after(`<tr>
	      <td class='name-cell' id='food-name-cell'>${object.name}</td>
	      <td class='calorie-cell' id='food-calorie-cell'>${object.calories}</td>
	      <td><a href='' id='trash-icon'><span class='glyphicon glyphicon-trash trash-icon'></a></td>
	      </tr>`);
	  });
	};

	$(document).ready(function () {
	  var newFood = new Food();

	  newFood.displayFoods();

	  $(document).on('click', '#trash-icon', function (e) {
	    e.preventDefault();
	    var name = $(this).parent().siblings()[0].innerHTML;
	    var calories = $(this).parent().siblings()[1].innerHTML;
	    $(this).parent().parent().remove();
	    var newFood = new Food(name, calories);
	    newFood.deleteFood();
	  });

	  $(".calorie-cell").on('click', function () {
	    var key = "calories";
	    var $calories = $(this).html();
	    var $name = $(this).siblings().html();
	    editFood = new Food($name, $calories);
	    editFood.editValue(this, key);
	  });

	  $(".name-cell").on('click', function () {
	    var key = "name";
	    var $name = $(this).html();
	    var $calories = $(this).siblings().html();
	    editFood = new Food($name, $calories);
	    editFood.editValue(this, key);
	  });

	  $("#filter").keyup(function () {
	    view = new View();
	    view.filterItems(foodsTable, this);
	  });
	});

	$('#new-food-button').on('click', function () {
	  var newFood = new Food();
	  newFood.addFood();
	});

	module.exports = Food;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function Reset() {}

	Reset.prototype.emptyErrors = function (idName) {
	  $(idName).children().children().empty();
	};

	Reset.prototype.clearFields = function (field1, field2) {
	  $(field1).val("");
	  $(field2).val("");
	};

	Reset.prototype.clearTable = function (table) {
	  $(`#${table.id} tr:first-child`).nextAll().empty();
	};

	module.exports = Reset;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function Save() {}

	Save.prototype.setLocalStorage = function (key, newKey, name, calories, type) {
	  var array = JSON.parse(localStorage.getItem(type));
	  array.forEach(function (object) {
	    if (object.name === name && object.calories === calories) {
	      object[key] = newKey;
	    }
	    arrayJSON = JSON.stringify(array);
	    localStorage.setItem(type, arrayJSON);
	  });
	};

	module.exports = Save;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function View() {}

	View.prototype.filterItems = function (table, input) {
	  var input, filter, table, tr, td, i;
	  filter = input.value.toUpperCase();
	  tr = table.getElementsByTagName("tr");

	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }
	  }
	};

	module.exports = View;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var exercisesTable = document.getElementById('all-exercises-table');
	var trashIcon = document.getElementById('trash-icon-ex');
	var exerciseForm = document.getElementById('exercise-form');
	var Reset = __webpack_require__(2);
	var Save = __webpack_require__(3);
	var View = __webpack_require__(4);

	function Exercise(name, calories) {
	  this.name = name;
	  this.calories = calories;
	}

	Exercise.prototype.addExercise = function () {
	  var reset = new Reset();
	  reset.emptyErrors(exerciseForm);
	  this.name = $('#name-field').val();
	  this.calories = $('#calorie-field').val();
	  if (this.name === "") {
	    $("#exercise-error").append("Please enter an exercise name");
	  } else if (this.calories === "") {
	    $("#calories-error").append("Please enter a calorie amount");
	  } else {
	    reset.clearFields('#name-field', '#calorie-field');
	    this.storeExercises();
	    reset.clearTable(exercisesTable);
	    this.displayExercises();
	  }
	};

	Exercise.prototype.deleteExercise = function () {
	  var name = this.name;
	  var calories = this.calories;
	  var exercises = JSON.parse(localStorage.getItem('exercise-calories'));
	  exercises.forEach(function (object) {
	    if (object.name === name && object.calories === calories) {
	      exercises.splice(exercises.indexOf(object), 1);
	    }
	    exercisesJSON = JSON.stringify(exercises);
	    localStorage.setItem('exercise-calories', exercisesJSON);
	  });
	};

	Exercise.prototype.editValue = function (obj, key) {
	  var name = this.name;
	  var calories = this.calories;
	  var type = 'exercise-calories';
	  var save = new Save();
	  obj.contentEditable = true;
	  clickedEntry = obj;
	  var originalKey = obj.innerText;
	  event.stopPropagation();
	  $(obj).keydown(function (event) {
	    if (event.keyCode == 13) {
	      var newKey = obj.innerText;
	      obj.contentEditable = false;
	      save.setLocalStorage(key, newKey, name, calories, type);
	    }
	  });
	  $(document).click(function (e) {
	    var newKey = clickedEntry.innerText;
	    clickedEntry.contentEditable = false;
	    save.setLocalStorage(key, newKey, name, calories, type);
	  });
	};

	Exercise.prototype.storeExercises = function () {
	  var exerciseDataJSON = localStorage.getItem('exercise-calories');
	  if (exerciseDataJSON === null) {
	    exerciseDataJSON = '[]';
	  }
	  var exercises = JSON.parse(exerciseDataJSON);
	  exercises.push(this);
	  exerciseDataJSON = JSON.stringify(exercises);
	  localStorage.setItem('exercise-calories', exerciseDataJSON);
	};

	Exercise.prototype.displayExercises = function () {
	  var exercises = JSON.parse(localStorage.getItem('exercise-calories'));
	  exercises.forEach(function (object) {
	    $('#all-exercises-table tr:first-child').after(`<tr>
	      <td class='name-cell' id='exercise-name-cell'>${object.name}</td>
	      <td class='calorie-cell' id='exercise-calorie-cell'>${object.calories}</td>
	      <td><a href='' id='exercise-trash-icon'><span class='glyphicon glyphicon-trash trash-icon'></a></td>
	      </tr>`);
	  });
	};

	$(document).ready(function () {
	  var newExercise = new Exercise();

	  newExercise.displayExercises();

	  $(document).on('click', '#exercise-trash-icon', function (e) {
	    e.preventDefault();
	    var name = $(this).parent().siblings()[0].innerHTML;
	    var calories = $(this).parent().siblings()[1].innerHTML;
	    $(this).parent().parent().remove();
	    var newExercise = new Exercise(name, calories);
	    newExercise.deleteExercise();
	  });

	  $(".calorie-cell").on('click', function () {
	    var key = "calories";
	    var $calories = $(this).html();
	    var $name = $(this).siblings().html();
	    editExercise = new Exercise($name, $calories);
	    editExercise.editValue(this, key);
	  });

	  $(".name-cell").on('click', function () {
	    var key = "name";
	    var $name = $(this).html();
	    var $calories = $(this).siblings().html();
	    editExercise = new Exercise($name, $calories);
	    editExercise.editValue(this, key);
	  });

	  $("#filter-field").keyup(function () {
	    view = new View();
	    view.filterItems(exercisesTable, this);
	  });
	});

	$('#exercise-submit').on('click', function () {
	  var newExercise = new Exercise();
	  newExercise.addExercise();
	});

	module.exports = Exercise;

/***/ }
/******/ ]);