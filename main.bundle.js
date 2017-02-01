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

	var Food = __webpack_require__(1);
	var Exercise = __webpack_require__(6);
	var Table = __webpack_require__(4);

	var count = 0;

	// generate variable names
	function inWords(num) {
	  var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
	  var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

	  if ((num = num.toString()).length > 9) return 'overflow';
	  n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
	  if (!n) return;var str = '';
	  str += n[1] != 0 ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore' : '';
	  str += n[2] != 0 ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh' : '';
	  str += n[3] != 0 ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand' : '';
	  str += n[4] != 0 ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred' : '';
	  str += n[5] != 0 ? (str != '' ? '' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
	  str = str.replace(/\s+/g, '');
	  return str;
	}

	function displayFoodData() {
	  var foods = JSON.parse(localStorage.getItem('foods'));
	  foods.forEach(function (object) {
	    $('#diary-foods-table tr:first-child').after(`<tr>
	      <td class='name-cell'>${object.name}</td>
	      <td class='calorie-cell'>${object.calories}</td>
	      <td class='food-checkbox'><input type='checkbox', id='food-checkbox-id'></td>
	      </tr>`);
	    dateToday(0);
	  });
	}

	function formatDateKey() {
	  var pageDate = document.getElementById('diary-today').innerText;
	  pageDate = pageDate.replace(" ", "");
	  pageDate = pageDate.replace(", ", "");
	  pageDate = pageDate.toLowerCase();
	  var numberPattern = /\d+/g;
	  dateNumbers = pageDate.match(numberPattern)[0];

	  pageDate = pageDate.replace(dateNumbers, inWords(dateNumbers));
	  return pageDate;
	}

	function fillExerciseTable() {
	  var totalCalsCell = document.getElementById('exercise-total-cals');
	  var pageDate = formatDateKey();
	  var currentDayLocalStorage = localStorage.getItem(pageDate);
	  var currentDiary = JSON.parse(currentDayLocalStorage);
	  totalCalsCell.innerText = currentDiary[0].totalCalories;
	}

	function fillBreakfastTable() {
	  var totalCalsCell = document.getElementById('breakfast-total-cals');
	  var remainingCalsCell = document.getElementById('breakfast-remaining-cals');
	  var pageDate = formatDateKey();
	  var currentDayLocalStorage = localStorage.getItem(pageDate);
	  var currentDiary = JSON.parse(currentDayLocalStorage);
	  totalCalsCell.innerText = currentDiary[1].totalCalories;
	  remainingCalsCell.innerText = currentDiary[1].remainingCalories;
	}

	function fillLunchTable() {
	  var totalCalsCell = document.getElementById('lunch-total-cals');
	  var remainingCalsCell = document.getElementById('lunch-remaining-cals');
	  var pageDate = formatDateKey();
	  var currentDayLocalStorage = localStorage.getItem(pageDate);
	  var currentDiary = JSON.parse(currentDayLocalStorage);
	  totalCalsCell.innerText = currentDiary[2].totalCalories;
	  remainingCalsCell.innerText = currentDiary[2].remainingCalories;
	}
	function fillDinnerTable() {
	  var totalCalsCell = document.getElementById('dinner-total-cals');
	  var remainingCalsCell = document.getElementById('dinner-remaining-cals');
	  var pageDate = formatDateKey();
	  var currentDayLocalStorage = localStorage.getItem(pageDate);
	  var currentDiary = JSON.parse(currentDayLocalStorage);
	  totalCalsCell.innerText = currentDiary[3].totalCalories;
	  remainingCalsCell.innerText = currentDiary[3].remainingCalories;
	}
	function fillSnacksTable() {
	  var totalCalsCell = document.getElementById('snacks-total-cals');
	  var remainingCalsCell = document.getElementById('snacks-remaining-cals');
	  var pageDate = formatDateKey();
	  var currentDayLocalStorage = localStorage.getItem(pageDate);
	  var currentDiary = JSON.parse(currentDayLocalStorage);
	  totalCalsCell.innerText = currentDiary[4].totalCalories;
	  remainingCalsCell.innerText = currentDiary[4].remainingCalories;
	}

	function initialTableFiller() {
	  fillExerciseTable();
	  fillBreakfastTable();
	  fillLunchTable();
	  fillDinnerTable();
	  fillSnacksTable();
	  // fillTotalsTable();
	}

	function buildDiaryLocalStorage() {
	  var pageDate = formatDateKey();
	  var diaryJSON = localStorage.getItem(pageDate);
	  if (diaryJSON === null) {
	    diaryJSON = '[]';
	    var currentDiary = JSON.parse(diaryJSON);

	    var exerciseTableJson = { 'totalCalories': '0', 'tableData': [] };
	    var breakfastTableJson = { 'totalCalories': '0', 'remainingCalories': '400', 'tableData': [] };
	    var lunchTableJson = { 'totalCalories': '0', 'remainingCalories': '600', 'tableData': [] };
	    var dinnerTableJson = { 'totalCalories': '0', 'remainingCalories': '800', 'tableData': [] };
	    var snacksTableJson = { 'totalCalories': '0', 'remainingCalories': '200', 'tableData': [] };
	    var totalsTableJson = { 'goalCalories': '2000', 'caloriesConsumed': '0', 'caloriesBurned': '0', 'remainingCalories': '2000' };

	    currentDiary.push(exerciseTableJson);
	    currentDiary.push(breakfastTableJson);
	    currentDiary.push(lunchTableJson);
	    currentDiary.push(dinnerTableJson);
	    currentDiary.push(snacksTableJson);
	    currentDiary.push(totalsTableJson);

	    diaryJSON = JSON.stringify(currentDiary);
	    localStorage.setItem(pageDate, diaryJSON);
	  }
	  initialTableFiller();
	}

	// function displayDiaryExercises(){
	//
	//   // JSON.parse(localStorage.getItem('diary')).forEach(function(element){
	//   //   // console.log(element.pageDate.exercise.totalCalories);
	//   //   // buildTableEx(element.exerciseName, element.calorieCount);
	//   // });
	// }

	function displayExerciseData() {
	  var exercises = JSON.parse(localStorage.getItem('exercise-calories'));
	  exercises.forEach(function (object) {
	    $('#diary-exercises-table tr:first-child').after(`<tr>
	      <td class='name-cell'>${object.name}</td>
	      <td class='calorie-cell'>${object.calories}</td>
	      <td class="exercise-checkbox"><input type="checkbox", id="exercise-checkbox-id"></td>
	      </tr>`);
	  });
	}
	function uncheckFoodCheckboxes() {
	  $(".food-checkbox").each(function () {
	    ;
	    this.checked = false;
	  });
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

	function dateToday(daysFromToday) {
	  var d = new Date();
	  d.setDate(d.getDate() + daysFromToday);
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

	$("#diary-tomorrow").on('click', function () {
	  count += 1;
	  dateToday(count);
	  buildDiaryLocalStorage();
	  var exercisesNames = document.getElementsByClassName("exercise-table-row");
	  while (!!exercisesNames[0]) {
	    exercisesNames[0].parentNode.removeChild(exercisesNames[0]);
	  }
	  populateExerciseTable();
	  calculateTotalCalories();
	  // persistInLocalStorage();
	  console.log("hello");
	});

	$("#diary-yesterday").on('click', function () {
	  count -= 1;
	  dateToday(count);
	  buildDiaryLocalStorage();
	  // persistInLocalStorage();
	});

	$("#food-diary-filter").keyup(function () {
	  var diaryFoodsTable = document.getElementById('diary-foods-table');
	  var someTable = new Table();
	  someTable.filterItems(diaryFoodsTable, this);
	});

	$("#exercises-diary-filter").keyup(function () {
	  var diaryExercisesTable = document.getElementById('diary-exercises-table');
	  var someTable = new Table();
	  someTable.filterItems(diaryExercisesTable, this);
	});

	$("#add-exercise").on('click', function () {
	  exerciseSubmit();
	  // setExDiaryLocalStorage();
	  // displayDiaryExercises()
	});

	function addExerciseDataToLocalStorage(eName, eCalories) {
	  var pageDate = formatDateKey();
	  var currentDayLocalStorage = localStorage.getItem(pageDate);
	  var currentDiary = JSON.parse(currentDayLocalStorage);
	  currentDiary[0].tableData.push({ name: eName, calories: eCalories });
	  diaryJSON = JSON.stringify(currentDiary);
	  localStorage.setItem(pageDate, diaryJSON);
	}

	function exerciseSubmit() {
	  var exercises = document.getElementsByClassName('exercise-checkbox');
	  for (i = 0; i < exercises.length; i++) {
	    if (exercises[i].childNodes[0].checked === true) {
	      var eName = exercises[i].previousElementSibling.previousElementSibling.innerText;
	      var eCalories = exercises[i].previousElementSibling.innerText;
	      // populateExerciseTable(eName, eCalories);
	      addExerciseDataToLocalStorage(eName, eCalories);
	      calculateTotalCalories();
	      updateRemainingCalories(eCalories, 0);
	      exercises[i].childNodes[0].checked = false;
	    }
	  }
	  populateExerciseTable();
	  // calculateTotalCalories();
	}

	function populateExerciseTable() {
	  // var exercisesNames = document.getElementsByClassName("exercise-table-row")
	  // while(exercisesNames[0]) {
	  //     exercisesNames[0].parentNode.removeChild(exercisesNames[0]);
	  // }​
	  // add code which clears the exercise table before this is run to fix bug
	  // add class to exercise name
	  // find all and delete all elements of exercise-name-cell and exercise-calorie-cell
	  var pageDate = formatDateKey();
	  var currentDayLocalStorage = localStorage.getItem(pageDate);
	  var currentDiary = JSON.parse(currentDayLocalStorage);
	  for (i = 0; i < currentDiary[0].tableData.length; i++) {
	    var exercisesTable = document.getElementById('exercise-table');
	    var row = exercisesTable.insertRow(1);
	    row.className = "exercise-table-row";
	    var nameCell = row.insertCell(0);
	    var caloriesCell = row.insertCell(1);
	    var trashCell = row.insertCell(2);
	    nameCell.innerText = currentDiary[0].tableData[i].name;
	    caloriesCell.innerText = currentDiary[0].tableData[i].calories;
	    caloriesCell.className = "exercise-calorie-cell";
	    nameCell.className = "exercise-name-cell";
	    trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
	  }
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
	    if (foods[i].childNodes[0].checked === true) {
	      var fName = foods[i].previousElementSibling.previousElementSibling.innerText;
	      var fCalories = foods[i].previousElementSibling.innerText;
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
	    foods[i].childNodes[0].checked = false;
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
	buildDiaryLocalStorage();

	$(document).ready(function () {
	  populateExerciseTable();
	  calculateTotalCalories();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Form = __webpack_require__(2);
	var Saver = __webpack_require__(3);
	var Table = __webpack_require__(4);
	var Errors = __webpack_require__(5);

	function Food(name, calories) {
	  this.name = name;
	  this.calories = calories;
	}

	Food.prototype.addFood = function () {
	  var errors = new Errors();
	  var form = new Form();
	  var someTable = new Table();
	  var foodForm = document.getElementById('food-form');
	  var foodsTable = document.getElementById('foods-table');
	  errors.emptyErrors(foodForm);
	  this.name = $('#foodname').val();
	  this.calories = $('#caloriecount').val();
	  if (this.name === "") {
	    errors.nameError('food');
	  } else if (this.calories === "") {
	    errors.calorieError();
	  } else {
	    form.clearFields('#foodname', '#caloriecount');
	    this.storeFoods();
	    someTable.clearTable(foodsTable);
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
	  var saver = new Saver();
	  obj.contentEditable = true;
	  clickedEntry = obj;
	  var originalKey = obj.innerText;
	  event.stopPropagation();
	  $(obj).keydown(function (event) {
	    if (event.keyCode == 13) {
	      var newKey = obj.innerText;
	      obj.contentEditable = false;
	      saver.setLocalStorage(key, newKey, name, calories, type);
	    }
	  });
	  $(document).click(function (e) {
	    var newKey = clickedEntry.innerText;
	    clickedEntry.contentEditable = false;
	    saver.setLocalStorage(key, newKey, name, calories, type);
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

	  $('#new-food-button').on('click', function () {
	    newFood.addFood();
	  });

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
	    var editFood = new Food($name, $calories);
	    editFood.editValue(this, key);
	  });

	  $(".name-cell").on('click', function () {
	    var key = "name";
	    var $name = $(this).html();
	    var $calories = $(this).siblings().html();
	    var editFood = new Food($name, $calories);
	    editFood.editValue(this, key);
	  });

	  $("#filter").keyup(function () {
	    var foodsTable = document.getElementById('foods-table');
	    var someTable = new Table();
	    someTable.filterItems(foodsTable, this);
	  });
	});

	module.exports = Food;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function Form() {}

	Form.prototype.clearFields = function (field1, field2) {
	  $(field1).val("");
	  $(field2).val("");
	};

	module.exports = Form;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function Saver() {}

	Saver.prototype.setLocalStorage = function (key, newKey, name, calories, type) {
	  var array = JSON.parse(localStorage.getItem(type));
	  array.forEach(function (object) {
	    if (object.name === name && object.calories === calories) {
	      object[key] = newKey;
	    }
	    arrayJSON = JSON.stringify(array);
	    localStorage.setItem(type, arrayJSON);
	  });
	};

	module.exports = Saver;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Table() {}

	Table.prototype.filterItems = function (table, input) {
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

	Table.prototype.clearTable = function (table) {
	  $(`#${table.id} tr:first-child`).nextAll().empty();
	};

	module.exports = Table;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function Errors() {}

	Errors.prototype.emptyErrors = function (idName) {
	  $(idName).children().children().empty();
	};

	Errors.prototype.nameError = function (type) {
	  $("#name-error").append("Please enter " + type + " name");
	};

	Errors.prototype.calorieError = function (type) {
	  $("#calories-error").append("Please enter a calorie amount");
	};

	module.exports = Errors;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Form = __webpack_require__(2);
	var Saver = __webpack_require__(3);
	var Table = __webpack_require__(4);
	var Errors = __webpack_require__(5);

	function Exercise(name, calories) {
	  this.name = name;
	  this.calories = calories;
	}

	Exercise.prototype.addExercise = function () {
	  var errors = new Errors();
	  var form = new Form();
	  var table = new Table();
	  var exercisesTable = document.getElementById('all-exercises-table');
	  var exerciseForm = document.getElementById('exercise-form');
	  errors.emptyErrors(exerciseForm);
	  this.name = $('#name-field').val();
	  this.calories = $('#calorie-field').val();
	  if (this.name === "") {
	    errors.nameError('exercise');
	  } else if (this.calories === "") {
	    errors.calorieError();
	  } else {
	    form.clearFields('#name-field', '#calorie-field');
	    this.storeExercises();
	    table.clearTable(exercisesTable);
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
	  var saver = new Saver();
	  obj.contentEditable = true;
	  clickedEntry = obj;
	  var originalKey = obj.innerText;
	  event.stopPropagation();
	  $(obj).keydown(function (event) {
	    if (event.keyCode == 13) {
	      var newKey = obj.innerText;
	      obj.contentEditable = false;
	      saver.setLocalStorage(key, newKey, name, calories, type);
	    }
	  });
	  $(document).click(function (e) {
	    var newKey = clickedEntry.innerText;
	    clickedEntry.contentEditable = false;
	    saver.setLocalStorage(key, newKey, name, calories, type);
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

	  $('#exercise-submit').on('click', function () {
	    newExercise.addExercise();
	  });

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
	    var exercisesTable = document.getElementById('all-exercises-table');
	    someTable = new Table();
	    someTable.filterItems(exercisesTable, this);
	  });
	});

	module.exports = Exercise;

/***/ }
/******/ ]);