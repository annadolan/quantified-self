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
	var Exercise = __webpack_require__(2);
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
	  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
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
	      }
	      if (event.currentTarget.id === "lunch-btn") {
	        populateLunchTable(fName, fCalories);
	      }
	      if (event.currentTarget.id === "dinner-btn") {
	        populateDinnerTable(fName, fCalories);
	      }
	      if (event.currentTarget.id === "snacks-btn") {
	        populateSnacksTable(fName, fCalories);
	      }
	    }
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

	function addRowToTable(mealTable, fName, fCalories) {
	  var row = mealTable.insertRow(1);
	  var nameCell = row.insertCell(0);
	  var caloriesCell = row.insertCell(1);
	  var trashCell = row.insertCell(2);
	  nameCell.innerText = fName;
	  caloriesCell.innerText = fCalories;
	  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	var foodsTable = document.getElementById('foods-table');
	var trashIcon = document.getElementById('trash-icon');

	function Food(name, calories) {
	  this.name = name;
	  this.calories = calories;
	  this.build = function () {
	    buildTable(name, calories);
	  };
	  this.store = function () {
	    storeFoodData(name, calories);
	  };
	}

	$(document).ready(function () {
	  displayFoods();

	  $(document).on("click", "#trash-icon", function (e) {
	    e.preventDefault();
	    var name = $(this).parent().parent().children().first().html();
	    var foods = JSON.parse(localStorage.getItem('foods'));
	    foods.forEach(function (object) {
	      if (object.name == name) {
	        foods.splice(foods.indexOf(object), 1);
	      }
	      foodJSON = JSON.stringify(foods);
	      localStorage.setItem('foods', foodJSON);
	    });
	    $(this).parent().parent().remove();
	  });

	  $(".calorie-cell").on('click', function () {
	    var key = "calories";
	    editValue(this, key);
	  });

	  $(".name-cell").on('click', function () {
	    var key = "name";
	    editValue(this, key);
	  });

	  $("#filter").keyup(function () {
	    filterFoods();
	  });
	});

	$('#new-food-button').on('click', function () {
	  submitFood();
	});

	function emptyErrors() {
	  $("#food-error").empty();
	  $("#calorie-error").empty();
	}

	function clearFields() {
	  $('#foodname').val("");
	  $('#caloriecount').val("");
	}

	function submitFood() {
	  emptyErrors();
	  var name = $('#foodname').val();
	  var calories = $('#caloriecount').val();
	  var newFood = new Food(name, calories);

	  if (name === "") {
	    $("#food-error").append("Please enter a food name");
	  } else if (calories === "") {
	    $("#calorie-error").append("Please enter a calorie amount");
	  } else {
	    newFood.build();
	    newFood.store();
	    clearFields();
	  }
	}

	function buildTable(name, calories) {
	  var newRow = document.createElement('tr');
	  buildNameCell(name, newRow);
	  buildCalorieCell(calories, newRow);
	  buildTrashCell(newRow);
	  foodsTable.insertBefore(newRow, foodsTable.children[1]);
	}

	function buildNameCell(name, newRow) {
	  var nameCell = document.createElement('td');
	  nameCell.innerText = name;
	  nameCell.className = "name-cell";
	  nameCell.id = "food-name-cell";
	  newRow.appendChild(nameCell);
	}

	function buildCalorieCell(calories, newRow) {
	  var calorieCell = document.createElement('td');
	  calorieCell.innerText = calories;
	  calorieCell.className = "calorie-cell";
	  calorieCell.id = "food-calorie-cell";
	  newRow.appendChild(calorieCell);
	}

	function buildTrashCell(newRow) {
	  var trashCell = document.createElement('td');
	  trashCell.innerHTML = "<a href='' id='trash-icon'><span class='glyphicon glyphicon-trash trash-icon'></a>";
	  newRow.appendChild(trashCell);
	}

	function storeFoodData(name, calories) {
	  var foodDataJSON = localStorage.getItem('foods');
	  if (foodDataJSON === null) {
	    foodDataJSON = '[]';
	  }
	  var foods = JSON.parse(foodDataJSON);
	  foods.push({ name: name, calories: calories });
	  foodDataJSON = JSON.stringify(foods);
	  localStorage.setItem('foods', foodDataJSON);
	}

	function displayFoods() {
	  JSON.parse(localStorage.getItem('foods')).forEach(function (element) {
	    buildTable(element.name, element.calories);
	  });
	}

	function editValue(obj, key) {
	  obj.contentEditable = true;
	  clickedEntry = obj;
	  var originalKey = obj.innerText;
	  event.stopPropagation();
	  $(obj).keydown(function (event) {
	    if (event.keyCode == 13) {
	      var newKey = obj.innerText;
	      obj.contentEditable = false;
	      if (key === "name") {
	        setNameLocalStorage(originalKey, newKey);
	      } else {
	        setCalsLocalStorage(originalKey, newKey);
	      }
	    }
	  });
	  $(document).click(function (e) {
	    var newKey = clickedEntry.innerText;
	    clickedEntry.contentEditable = false;
	    if (key === "name") {
	      setNameLocalStorage(originalKey, newKey);
	    } else {
	      setCalsLocalStorage(originalKey, newKey);
	    }
	  });
	}

	function setNameLocalStorage(originalKey, newKey) {
	  var food = JSON.parse(localStorage.getItem('foods'));
	  food.forEach(function (object, key) {
	    if (object.name == originalKey) {
	      object.name = newKey;
	    }
	    foodJSON = JSON.stringify(food);
	    localStorage.setItem('foods', foodJSON);
	  });
	}

	function setCalsLocalStorage(originalKey, newKey) {
	  var food = JSON.parse(localStorage.getItem('foods'));
	  food.forEach(function (object, key) {
	    if (object.calories == originalKey) {
	      object.calories = newKey;
	    }
	    foodJSON = JSON.stringify(food);
	    localStorage.setItem('foods', foodJSON);
	  });
	}

	function filterFoods() {
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("filter");
	  filter = input.value.toUpperCase();
	  tr = foodsTable.getElementsByTagName("tr");

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	var nameInput = document.getElementById('name-field');
	var calorieInput = document.getElementById('calorie-field');
	var exercisesTable = document.getElementById('all-exercises-table');
	var submitButton = document.getElementById('exercise-submit');
	var trashIcon = document.getElementById('trash-icon');

	if (submitButton) {
	  submitButton.addEventListener('click', function () {
	    var exerciseName = nameInput.value;
	    var calorieCount = calorieInput.value;
	    if (exerciseName === "" && calorieCount === "") {} else if (calorieCount === "") {
	      $(".error-message").empty();
	      $(".error-message").append("Please enter a calorie amount");
	    } else if (exerciseName === "") {
	      $(".error-message").empty();
	      $(".error-message").append("Please enter an exercise name");
	    } else {
	      $(".error-message").empty();
	      document.getElementById("calorie-field").value = "";
	      document.getElementById("name-field").value = "";
	      submitExercise(exerciseName, calorieCount);
	      storeExerciseData(exerciseName, calorieCount);
	    }
	  });
	}

	function submitExercise(exerciseName, calorieCount) {
	  var newRow = document.createElement('tr');
	  var nameCell = document.createElement('td');
	  nameCell.innerText = exerciseName;
	  nameCell.id = "name-cell-id";
	  nameCell.className = "name-cell";

	  var calorieCell = document.createElement('td');
	  calorieCell.innerText = calorieCount;
	  calorieCell.id = "calorie-cell-id";
	  calorieCell.className = "calorie-cell";

	  var trashCell = document.createElement('td');
	  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon' id='trash-icon-id'>";

	  newRow.appendChild(nameCell);
	  newRow.appendChild(calorieCell);
	  newRow.appendChild(trashCell);
	  exercisesTable.insertBefore(newRow, exercisesTable.children[1]);
	}

	function storeExerciseData(exerciseName, calorieCount) {
	  var exerciseDataJSON = localStorage.getItem('exercise-calories');
	  if (exerciseDataJSON === null) {
	    exerciseDataJSON = '[]';
	  }
	  var exercises = JSON.parse(exerciseDataJSON);

	  exercises.push({ exerciseName: exerciseName, calorieCount: calorieCount });

	  exerciseDataJSON = JSON.stringify(exercises);
	  localStorage.setItem('exercise-calories', exerciseDataJSON);
	}

	function displayExerciseData() {
	  JSON.parse(localStorage.getItem('exercise-calories')).forEach(function (element) {
	    submitExercise(element.exerciseName, element.calorieCount);
	  });
	}

	if (submitButton) {
	  displayExerciseData();
	}

	$(".trash-icon").on('click', function (e) {
	  e.preventDefault();
	  var name = $(this).parent().parent().children().first().html();
	  var exerciseCalories = JSON.parse(localStorage.getItem('exercise-calories'));
	  exerciseCalories.forEach(function (object) {
	    if (object.exerciseName == name) {
	      exerciseCalories.splice(exerciseCalories.indexOf(object), 1);
	    }
	    exercisesJSON = JSON.stringify(exerciseCalories);
	    localStorage.setItem('exercise-calories', exercisesJSON);
	  });

	  $(this).parent().parent().remove();
	});

	$(".name-cell").on('click', function () {
	  this.contentEditable = true;
	  clickedEntry = this;
	  var originalName = this.innerText;
	  event.stopPropagation();

	  $(this).keydown(function (event) {
	    if (event.keyCode == 13) {
	      var newName = this.innerText;
	      this.contentEditable = false;

	      var exerciseCalories = JSON.parse(localStorage.getItem('exercise-calories'));
	      exerciseCalories.forEach(function (object) {
	        if (object.exerciseName == originalName) {
	          object.exerciseName = newName;
	        }
	        exercisesJSON = JSON.stringify(exerciseCalories);
	        localStorage.setItem('exercise-calories', exercisesJSON);
	      });
	    }
	  });

	  $(document).click(function (e) {
	    var newName = clickedEntry.innerText;
	    clickedEntry.contentEditable = false;

	    var exerciseCalories = JSON.parse(localStorage.getItem('exercise-calories'));
	    exerciseCalories.forEach(function (object) {
	      if (object.exerciseName == originalName) {
	        object.exerciseName = newName;
	      }
	      exercisesJSON = JSON.stringify(exerciseCalories);
	      localStorage.setItem('exercise-calories', exercisesJSON);
	    });
	  });
	});

	$(".calorie-cell").on('click', function () {
	  this.contentEditable = true;
	  clickedCalorie = this;
	  var originalCalorie = this.innerText;
	  event.stopPropagation();

	  $(this).keydown(function (event) {
	    if (event.keyCode == 13) {
	      var newCalorie = this.innerText;
	      this.contentEditable = false;

	      var exerciseCalories = JSON.parse(localStorage.getItem('exercise-calories'));
	      exerciseCalories.forEach(function (object) {
	        if (object.calorieCount == originalCalorie) {
	          object.calorieCount = newCalorie;
	        }
	        exercisesJSON = JSON.stringify(exerciseCalories);
	        localStorage.setItem('exercise-calories', exercisesJSON);
	      });
	    }
	  });

	  $(document).click(function (e) {
	    var newCalorie = clickedEntry.innerText;
	    clickedCalorie.contentEditable = false;

	    var exerciseCalories = JSON.parse(localStorage.getItem('exercise-calories'));
	    exerciseCalories.forEach(function (object) {
	      if (object.calorieCount == originalCalorie) {
	        object.calorieCount = newCalorie;
	      }
	      exercisesJSON = JSON.stringify(exerciseCalories);
	      localStorage.setItem('exercise-calories', exercisesJSON);
	    });
	  });
	});

	$("#filter-field").on('click', function () {
	  $(this).keyup(function (event) {
	    filterExcercises();
	  });
	});

	function filterExcercises() {
	  var input, filter, table, tr, td;
	  input = document.getElementById('filter-field');
	  filter = input.value.toUpperCase();
	  tr = exercisesTable.getElementsByTagName('tr');

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

	$(document).ready(function () {});

/***/ }
/******/ ]);