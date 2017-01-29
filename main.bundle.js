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

	var Exercise = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var nameInput = document.getElementById('name-field');
	var calorieInput = document.getElementById('calorie-field');
	var exercisesTable = document.getElementById('all-exercises-table');
	var submitButton = document.getElementById('exercise-submit');

	submitButton.addEventListener('click', function () {
	  var exerciseName = nameInput.value;
	  var calorieCount = calorieInput.value;
	  submitExercise(exerciseName, calorieCount);
	});

	function submitExercise(exerciseName, calorieCount) {
	  // method for storing data locally
	  var newRow = document.createElement('tr');
	  var nameCell = document.createElement('td');
	  nameCell.innerText = exerciseName;
	  var calorieCell = document.createElement('td');
	  calorieCell.innerText = calorieCount;
	  var trashCell = document.createElement('td');
	  trashCell.innerHTML = '<p>test</p>';
	  // trashCell.innerHTML = '<span class="glyphicon glyphicon-trash" aria-hidden="true">';
	  newRow.appendChild(nameCell);
	  newRow.appendChild(calorieCell);
	  newRow.appendChild(trashCell);
	  exercisesTable.appendChild(newRow);
	}

	$(document).ready(function () {
	  $('#this-test').hide();
	});
	// module.exports = Exercise;

/***/ }
/******/ ]);