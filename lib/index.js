var Food = require('./foods');
var Exercise = require('./exercise');
var Table = require('./table')
var Dates = require('./dates')

var count = 0;

function displayFoodData() {
  var foods = JSON.parse(localStorage.getItem('foods'));
  if (foods === null){
    foods = [];
  }
  foods.forEach(function(object){
    $('#diary-foods-table tr:first-child').after(`<tr>
      <td class='name-cell'>${object.name}</td>
      <td class='calorie-cell'>${object.calories}</td>
      <td class='food-checkbox'><input type='checkbox', id='food-checkbox-id'></td>
      </tr>`);
    dateToday(0);
  })
}

function formatDateKey(){
  var date = new Dates();
  var pageDate = document.getElementById('diary-today').innerText;
  pageDate = pageDate.replace(" ", "")
  pageDate = pageDate.replace(", ", "")
  pageDate = pageDate.toLowerCase();
  var numberPattern = /\d+/g;
  dateNumbers = pageDate.match( numberPattern )[0]

  pageDate = pageDate.replace(dateNumbers, date.inWords(dateNumbers));
  return pageDate;
}

function initialTableFiller(){
  var someTable = new Table();
  var pageDate = formatDateKey();
  someTable.fillExerciseTable(pageDate);
  someTable.fillMealTable('breakfast-total-cals', 'breakfast-remaining-cals', 1, pageDate);
  someTable.fillMealTable('lunch-total-cals', 'lunch-remaining-cals', 2, pageDate);
  someTable.fillMealTable('dinner-total-cals', 'dinner-remaining-cals', 3, pageDate);
  someTable.fillMealTable('snacks-total-cals', 'snacks-remaining-cals', 4, pageDate);
  // fillTotalsTable();
}

function buildDiaryLocalStorage(){
  var pageDate = formatDateKey();
  var diaryJSON = localStorage.getItem(pageDate);
  if(diaryJSON === null){
    diaryJSON = '[]';
    var currentDiary = JSON.parse(diaryJSON);

    var exerciseTableJson = {'totalCalories': '0', 'tableData': []};
    var breakfastTableJson = {'totalCalories': '0', 'remainingCalories': '400', 'tableData': []};
    var lunchTableJson = {'totalCalories': '0', 'remainingCalories': '600', 'tableData': []};
    var dinnerTableJson = {'totalCalories': '0', 'remainingCalories': '800', 'tableData': []};
    var snacksTableJson = {'totalCalories': '0', 'remainingCalories': '200', 'tableData': []};
    var totalsTableJson = {'goalCalories': '2000', 'caloriesConsumed':'0', 'caloriesBurned': '0', 'remainingCalories': '2000'};

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

function displayExerciseData() {
  var exercises = JSON.parse(localStorage.getItem('exercise-calories'));
  if (exercises === null){
    exercises = []
  }
  exercises.forEach(function(object){
    $('#diary-exercises-table tr:first-child').after(`<tr>
      <td class='name-cell'>${object.name}</td>
      <td class='calorie-cell'>${object.calories}</td>
      <td class="exercise-checkbox"><input type="checkbox", id="exercise-checkbox-id"></td>
      </tr>`);
    })
  }

  function uncheckFoodCheckboxes() {
    $(".food-checkbox").each(function() {;
      this.checked = false;
    });
  }



function changeTextColor(remainingCalories, mealId){
  if (remainingCalories < 0){
    $(mealId).css('color', 'red');
  } else {
    $(mealId).css('color', 'green');
  }
}

function dateToday(daysFromToday){
  var d = new Date();
  d.setDate(d.getDate() + daysFromToday);
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
  $('#diary-today a').html(today);
}

function clearExerciseTable(){
  var exercisesNames = document.getElementsByClassName("exercise-table-row")
  while(exercisesNames[0]) {
    exercisesNames[0].parentNode.removeChild(exercisesNames[0]);
  }
}

function clearBreakfastTable(){
  var breakfastNames = document.getElementsByClassName("breakfast-table-row")
  while(breakfastNames[0]) {
    breakfastNames[0].parentNode.removeChild(breakfastNames[0]);
  }
}
function clearLunchTable(){
  var lunchNames = document.getElementsByClassName("lunch-table-row")
  while(lunchNames[0]) {
    lunchNames[0].parentNode.removeChild(lunchNames[0]);
  }
}
function clearDinnerTable(){
  var dinnerNames = document.getElementsByClassName("dinner-table-row")
  while(dinnerNames[0]) {
    dinnerNames[0].parentNode.removeChild(dinnerNames[0]);
  }
}
function clearSnacksTable(){
  var snacksNames = document.getElementsByClassName("snacks-table-row")
  while(snacksNames[0]) {
    snacksNames[0].parentNode.removeChild(snacksNames[0]);
  }
}

function clearAllTables(){
  clearSnacksTable();
  clearDinnerTable();
  clearExerciseTable();
  clearLunchTable();
  clearBreakfastTable();
}

function populateAllTables(){
  populateLunchTable();
  populateBreakfastTable();
  populateDinnerTable();
  populateSnacksTable();
  populateExerciseTable();
  calculateTotalCalories();
}

$(document).on('click', '#meal-trash-icon', function(e){
  e.preventDefault();
  var name = $(this).parent().siblings()[0].innerHTML;
  var calories = $(this).parent().siblings()[1].innerHTML;
  tableRow = $(this).parent().parent()
  tableRow.remove();
  if (tableRow[0].className === "breakfast-table-row"){
    deleteDiaryFood(name, calories, 1);
  } else if (tableRow[0].className === "lunch-table-row"){
    deleteDiaryFood(name, calories, 2)
  } else if (tableRow[0].className === "dinner-table-row"){
    deleteDiaryFood(name, calories, 3)
  } else {
    deleteDiaryFood(name, calories, 4)
  }
});

$(document).on('click', '#exercise-trash-icon', function(e){
  e.preventDefault();
  var name = $(this).parent().siblings()[0].innerHTML;
  var calories = $(this).parent().siblings()[1].innerHTML;
  tableRow = $(this).parent().parent()
  tableRow.remove();
  deleteDiaryExercise(name, calories);
});

function deleteDiaryFood(name, calories, arrayPosition){
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  var meal = currentDiary[arrayPosition].tableData
  meal.forEach(function(object) {
      if (object.name === name && object.calories === calories) {
        meal.splice(meal.indexOf(object), 1);
        diaryJSON = JSON.stringify(currentDiary);
        localStorage.setItem(pageDate, diaryJSON)
      }
    })
}

function deleteDiaryExercise(name, calories){
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  var exercise = currentDiary[0].tableData
  exercise.forEach(function(object) {
      if (object.name === name && object.calories === calories) {
        exercise.splice(exercise.indexOf(object), 1);
        diaryJSON = JSON.stringify(currentDiary);
        localStorage.setItem(pageDate, diaryJSON)
      }
    })
}


$('#sort-exercises').on ('click', function(){
  thisTable = document.getElementById('diary-exercises-table');
  someTable = new Table();
  someTable.sortTable(thisTable);
})

$('#sort-food').on('click', function(){
  thisTable = document.getElementById('diary-foods-table');
  someTable = new Table();
  someTable.sortTable(thisTable);
})

$("#diary-tomorrow").on('click', function(){
  count += 1;
  dateToday(count);
  buildDiaryLocalStorage();
  clearAllTables();
  populateAllTables();
  calculateTotalCalories();
  // clear all meal totals
});


$("#diary-yesterday").on('click', function(){
  count -= 1;
  dateToday(count);
  buildDiaryLocalStorage();
  clearAllTables();
  populateAllTables()
  calculateTotalCalories();
  // persistInLocalStorage();
});

$("#food-diary-filter").keyup(function() {
  var diaryFoodsTable = document.getElementById('diary-foods-table')
  var someTable = new Table();
  someTable.filterItems(diaryFoodsTable, this);
});

$("#exercises-diary-filter").keyup(function() {
  var diaryExercisesTable = document.getElementById('diary-exercises-table')
  var someTable = new Table();
  someTable.filterItems(diaryExercisesTable, this);
});


$("#add-exercise").on('click', function(){
  clearExerciseTable();
  exerciseSubmit();
});

function addExerciseDataToLocalStorage(eName, eCalories){
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  currentDiary[0].tableData.push({name: eName, calories: eCalories});
  diaryJSON = JSON.stringify(currentDiary);
  localStorage.setItem(pageDate, diaryJSON)
}

function exerciseSubmit(){
  var exercises = document.getElementsByClassName('exercise-checkbox')
  for (i = 0; i < exercises.length; i++) {
    if (exercises[i].childNodes[0].checked === true ) {
      var eName = exercises[i].previousElementSibling.previousElementSibling.innerText;
      var eCalories = exercises[i].previousElementSibling.innerText;
      // populateExerciseTable(eName, eCalories);
      addExerciseDataToLocalStorage(eName, eCalories);
      updateRemainingCalories(eCalories, 0)
      exercises[i].childNodes[0].checked = false;
    }
  }
  populateExerciseTable();
  calculateTotalCalories();
}

function populateExerciseTable(){
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  for (i = 0; i < currentDiary[0].tableData.length; i++){
    var exercisesTable = document.getElementById('exercise-table');
    var row = exercisesTable.insertRow(1);
    row.className = "exercise-table-row"
    var nameCell = row.insertCell(0);
    var caloriesCell = row.insertCell(1);
    var trashCell = row.insertCell(2);
    nameCell.innerText = currentDiary[0].tableData[i].name;
    caloriesCell.innerText = currentDiary[0].tableData[i].calories;
    caloriesCell.className = "exercise-calorie-cell"
    nameCell.className = "exercise-name-cell"
    trashCell.innerHTML = "<a href='' id='exercise-trash-icon'><span class='glyphicon glyphicon-trash exercise-trash-icon'></a>";
  }
}

function calculateTotalCalories(){
  var exercisesTable = document.getElementById('exercise-table');
  var totalCalorieCell = document.getElementById('exercise-total-cals');
  var totalCalories = 0;

  $(".exercise-calorie-cell").each(function() {;
      totalCalories += parseFloat(this.innerText);
  });
  totalCalorieCell.innerText = totalCalories;

  if (totalCalories > 0){
    $('#remaining-calories').css('color', 'green');
  } else {
    $('#remaining-calories').css('color', 'black');
  }

  updateCaloriesBurned(totalCalories);
}

$("#breakfast-btn").on('click', function(){
  mealSubmit();
});

$("#lunch-btn").on('click', function(){
  mealSubmit();
});

$("#dinner-btn").on('click', function(){
  mealSubmit();
});

$("#snacks-btn").on('click', function(){
  mealSubmit();
});

function addMealDataToLocalStorage(fName, fCalories, tableIndex){
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  currentDiary[tableIndex].tableData.push({name: fName, calories: fCalories});
  diaryJSON = JSON.stringify(currentDiary);
  localStorage.setItem(pageDate, diaryJSON)
}

function mealSubmit(){
  var foods = document.getElementsByClassName('food-checkbox')
  for (i = 0; i < foods.length; i++) {
    if (foods[i].childNodes[0].checked === true ) {
      var fName = foods[i].previousElementSibling.previousElementSibling.innerText;
      var fCalories = foods[i].previousElementSibling.innerText;
      if (event.currentTarget.id === "breakfast-btn") {
        clearBreakfastTable();
        addMealDataToLocalStorage(fName, fCalories, 1);
        populateBreakfastTable();
        calculateTotalBreakfastCalories();
        updateCaloriesConsumed();
        updateRemainingCalories(0, fCalories);
      }
      if (event.currentTarget.id === "lunch-btn") {
        clearLunchTable();
        addMealDataToLocalStorage(fName, fCalories, 2)
        populateLunchTable();
        calculateTotalLunchCalories();
        updateCaloriesConsumed();
        updateRemainingCalories(0, fCalories);
      }
      if (event.currentTarget.id === "dinner-btn") {
        clearDinnerTable();
        addMealDataToLocalStorage(fName, fCalories, 3)
        populateDinnerTable();
        calculateTotalDinnerCalories();
        updateCaloriesConsumed();
        updateRemainingCalories(0, fCalories);
      }
      if (event.currentTarget.id === "snacks-btn") {
        clearSnacksTable();
        addMealDataToLocalStorage(fName, fCalories, 4)
        populateSnacksTable();
        calculateTotalSnackCalories();
        updateCaloriesConsumed();
        updateRemainingCalories(0, fCalories);
      }
    }
    foods[i].childNodes[0].checked = false;
  }
}

function populateDinnerTable(){
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  currentDiary[3].tableData.forEach(function(object){
    $('#dinner-table tr:first-child').after(`<tr class="dinner-table-row">
      <td>${object.name}</td>
      <td class='dinner-table-calorie-cell''>${object.calories}</td>
      <td><a href='' id='meal-trash-icon'><span class='glyphicon glyphicon-trash meal-trash-icon'></a></td>
      </tr>`);
});
}

function populateSnacksTable(){
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  currentDiary[4].tableData.forEach(function(object){
    $('#snacks-table tr:first-child').after(`<tr class="snacks-table-row">
      <td>${object.name}</td>
      <td class='snacks-table-calorie-cell''>${object.calories}</td>
      <td><a href='' id='meal-trash-icon'><span class='glyphicon glyphicon-trash meal-trash-icon'></a></td>
      </tr>`);
});
}

function populateLunchTable(){
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  currentDiary[2].tableData.forEach(function(object){
    $('#lunch-table tr:first-child').after(`<tr class="lunch-table-row">
      <td>${object.name}</td>
      <td class='lunch-table-calorie-cell''>${object.calories}</td>
      <td><a href='' id='meal-trash-icon'><span class='glyphicon glyphicon-trash meal-trash-icon'></a></td>
      </tr>`);
});
}

function populateBreakfastTable(){
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  currentDiary[1].tableData.forEach(function(object){
    $('#breakfast-table tr:first-child').after(`<tr class="breakfast-table-row">
      <td>${object.name}</td>
      <td class='breakfast-table-calorie-cell''>${object.calories}</td>
      <td><a href='' id='meal-trash-icon'><span class='glyphicon glyphicon-trash meal-trash-icon'></a></td>
      </tr>`);
});
}

function calculateTotalBreakfastCalories(){
  var totalCalorieCell = document.getElementById('breakfast-total-cals');
  var breakfastCalories = 0;

  $(".breakfast-table-calorie-cell").each(function() {;
    breakfastCalories += parseFloat(this.innerText);
  });

  totalCalorieCell.innerText = breakfastCalories;
  calculateRemainingCalories("breakfast", breakfastCalories);
}

function calculateRemainingCalories(meal, totalCalories){
  if (meal === "breakfast") {
    var remainingBreakfastCalories = 400 - totalCalories;
    var breakfastRemainingCell = document.getElementById('breakfast-remaining-cals');
    breakfastRemainingCell.innerText = remainingBreakfastCalories
    changeTextColor(remainingBreakfastCalories, '#breakfast-remaining-cals')
  }
  if (meal === "lunch") {
    remainingLunchCalories = 600 - totalCalories;
    var lunchRemainingCell = document.getElementById('lunch-remaining-cals');
    lunchRemainingCell.innerText = remainingLunchCalories
    changeTextColor(remainingLunchCalories, '#lunch-remaining-cals')
  }
  if (meal === "dinner") {
    remainingDinnerCalories = 800 - totalCalories;
    var dinnerRemainingCell = document.getElementById('dinner-remaining-cals');
    dinnerRemainingCell.innerText = remainingDinnerCalories
    changeTextColor(remainingDinnerCalories, '#dinner-remaining-cals')
  }
  if (meal === "snacks") {
  remainingSnacksCalories = 200 - totalCalories;
  var snacksRemainingCell = document.getElementById('snacks-remaining-cals');
  snacksRemainingCell.innerText = remainingSnacksCalories
  changeTextColor(remainingSnacksCalories, '#snacks-remaining-cals')
  }
}

function calculateTotalLunchCalories(){
  var lunchCalorieCell = document.getElementById('lunch-total-cals');
  var lunchCalories = 0;

  $(".lunch-table-calorie-cell").each(function() {;
    lunchCalories += parseFloat(this.innerText);
  });

  lunchCalorieCell.innerText = lunchCalories;
  calculateRemainingCalories("lunch", lunchCalories);
}

function calculateTotalDinnerCalories(){
  var dinnerCalorieCell = document.getElementById('dinner-total-cals');
  var dinnerCalories = 0;

  $(".dinner-table-calorie-cell").each(function() {;
    dinnerCalories += parseFloat(this.innerText);
  });

  dinnerCalorieCell.innerText = dinnerCalories;
  calculateRemainingCalories("dinner", dinnerCalories);
}

function calculateTotalSnackCalories(){
  var snacksCalorieCell = document.getElementById('snacks-total-cals');
  var snacksCalories = 0;

  $(".snacks-table-calorie-cell").each(function() {;
    snacksCalories += parseFloat(this.innerText);
  });

  snacksCalorieCell.innerText = snacksCalories;
  calculateRemainingCalories("snacks", snacksCalories);
}

function setRemainingCalories(goalCalories){
  var remainingCaloriesCell = document.getElementById('remaining-calories');
  remainingCaloriesCell.innerText = goalCalories;
}

function updateGoalCalories(){
  var goalCaloriesCell = document.getElementById('goal-calories');
  goalCaloriesCell.innerText = 2000;
  setRemainingCalories(goalCaloriesCell.innerText);
}

function updateCaloriesConsumed(){
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

function updateCaloriesBurned(totalCalories){
  var caloriesBurnedCell = document.getElementById('calories-burned')
  caloriesBurnedCell.innerText = totalCalories;

  if (totalCalories > 0){
    $('#remaining-calories').css('color', 'green');
  } else {
    $('#remaining-calories').css('color', 'black');
  }
}

function updateRemainingCalories(additionalCalories, negativeCalories){
  var remainingCaloriesCell = document.getElementById('remaining-calories');

  if (document.getElementById('goal-calories').innerText === "") {
  } else {
    remainingCalories = parseFloat(document.getElementById('remaining-calories').innerText);
  }

  remainingCalories += parseFloat(additionalCalories);
  remainingCalories -= parseFloat(negativeCalories);

  remainingCaloriesCell.innerText = remainingCalories;
  if (remainingCalories < 0){
    $('#remaining-calories').css('color', 'red');
  } else {
    $('#remaining-calories').css('color', 'green');
  }
}

function setTotalsTable(){
  updateGoalCalories();
  var caloriesConsumedCell = document.getElementById('calories-consumed');
  var caloriesBurnedCell = document.getElementById('calories-burned');

  caloriesConsumedCell.innerText = "0";
  caloriesBurnedCell.innerText = "0";
  // updateCaloriesConsumed();
  // updateCaloriesBurned();
  updateRemainingCalories(0,0);
}


$(document).ready(function() {
  displayExerciseData();
  displayFoodData();
  setTotalsTable();
  buildDiaryLocalStorage();
  populateAllTables();
  calculateTotalCalories();
});
