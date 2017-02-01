var diaryFoodsTable = document.getElementById('diary-foods-table');
var diaryExercisesTable = document.getElementById('diary-exercises-table');
var Food = require('./foods');
var Exercise = require('./exercise');
var addExerciseButton = document.getElementById('add-exercise');
var count = 0;

// generate variable names
function inWords (num) {
    var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred' : '';
    str += (n[5] != 0) ? ((str != '') ? '' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
    str = str.replace(/\s+/g, '');
    return str;
}

function displayFoodData(){
  JSON.parse(localStorage.getItem('foods')).forEach(function(element){
    submitFood(element.name, element.calories);
  });
  dateToday(0);
}

function displayExerciseData(){
  JSON.parse(localStorage.getItem('exercise-calories')).forEach(function(element){
    submitExercise(element.exerciseName, element.calorieCount);
  });
}

function formatDateKey(){
  var pageDate = document.getElementById('diary-today').innerText;
  pageDate = pageDate.replace(" ", "")
  pageDate = pageDate.replace(", ", "")
  pageDate = pageDate.toLowerCase();
  var numberPattern = /\d+/g;
  dateNumbers = pageDate.match( numberPattern )[0]

  pageDate = pageDate.replace(dateNumbers, inWords(dateNumbers));
  return pageDate;
}

function fillExerciseTable() {
  var totalCalsCell = document.getElementById('exercise-total-cals')
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  totalCalsCell.innerText = currentDiary[0].totalCalories
}

function fillBreakfastTable(){
  var totalCalsCell = document.getElementById('breakfast-total-cals')
  var remainingCalsCell = document.getElementById('breakfast-remaining-cals')
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  totalCalsCell.innerText = currentDiary[1].totalCalories
  remainingCalsCell.innerText = currentDiary[1].remainingCalories
}

function fillLunchTable(){
  var totalCalsCell = document.getElementById('lunch-total-cals')
  var remainingCalsCell = document.getElementById('lunch-remaining-cals')
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  totalCalsCell.innerText = currentDiary[2].totalCalories
  remainingCalsCell.innerText = currentDiary[2].remainingCalories
}
function fillDinnerTable(){
  var totalCalsCell = document.getElementById('dinner-total-cals')
  var remainingCalsCell = document.getElementById('dinner-remaining-cals')
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  totalCalsCell.innerText = currentDiary[3].totalCalories
  remainingCalsCell.innerText = currentDiary[3].remainingCalories
}
function fillSnacksTable(){
  var totalCalsCell = document.getElementById('snacks-total-cals')
  var remainingCalsCell = document.getElementById('snacks-remaining-cals')
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  totalCalsCell.innerText = currentDiary[4].totalCalories
  remainingCalsCell.innerText = currentDiary[4].remainingCalories
}

function initialTableFiller(){
  fillExerciseTable();
  fillBreakfastTable();
  fillLunchTable();
  fillDinnerTable();
  fillSnacksTable();
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

// function displayDiaryExercises(){
//
//   // JSON.parse(localStorage.getItem('diary')).forEach(function(element){
//   //   // console.log(element.pageDate.exercise.totalCalories);
//   //   // buildTableEx(element.exerciseName, element.calorieCount);
//   // });
// }

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
    $(".food-checkbox").each(function() {;
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

function changeTextColor(remainingCalories, mealId){
  if (remainingCalories < 0){
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

$("#diary-tomorrow").on('click', function(){
  count += 1;
  dateToday(count);
  buildDiaryLocalStorage();
  // var exercisesNames = document.getElementsByClassName("exercise-table-row")
  // while(exercisesNames[0]) {
  //   exercisesNames[0].parentNode.removeChild(exercisesNames[0]);
  // }​
  populateExerciseTable();
  calculateTotalCalories();
  // persistInLocalStorage();
});

$("#diary-yesterday").on('click', function(){
  count -= 1;
  dateToday(count);
  buildDiaryLocalStorage();
  // persistInLocalStorage();
});

$("#food-diary-filter").keyup(function() {
  filterFoods();
});

$("#exercises-diary-filter").keyup(function() {
  filterExercises();
});


$("#add-exercise").on('click', function(){
  exerciseSubmit();
  // setExDiaryLocalStorage();
  // displayDiaryExercises()
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
    if (exercises[i].checked === true ) {
      var eName = exercises[i].nextElementSibling.innerText;
      var eCalories = exercises[i].nextElementSibling.nextElementSibling.innerText;
      // populateExerciseTable(eName, eCalories);
      addExerciseDataToLocalStorage(eName, eCalories);
      calculateTotalCalories();
      updateRemainingCalories(eCalories, 0)
      exercises[i].checked = false;
    }
  }
  populateExerciseTable();
  // calculateTotalCalories();
}

function populateExerciseTable(){
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
    trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
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

function mealSubmit(){
  var foods = document.getElementsByClassName('food-checkbox')

  for (i = 0; i < foods.length; i++) {
    if (foods[i].checked === true ) {
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

function populateBreakfastTable(fName, fCalories){
  var breakfastTable = document.getElementById('breakfast-table');
  addRowToTable(breakfastTable, fName, fCalories);
}

function populateLunchTable(fName, fCalories){
  var lunchTable = document.getElementById('lunch-table');
  addRowToTable(lunchTable, fName, fCalories);
}

function populateDinnerTable(fName, fCalories){
  var dinnerTable = document.getElementById('dinner-table');
  addRowToTable(dinnerTable, fName, fCalories);
}

function populateSnacksTable(fName, fCalories){
  var snacksTable = document.getElementById('snacks-table');
  addRowToTable(snacksTable, fName, fCalories);
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

function addRowToTable(mealTable, fName, fCalories){
  var row = mealTable.insertRow(1);
  var nameCell = row.insertCell(0);
  var caloriesCell = row.insertCell(1);
  var trashCell = row.insertCell(2);
  nameCell.innerText = fName;
  caloriesCell.innerText = fCalories;
  caloriesCell.className = mealTable.id + "-calorie-cell"
  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
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
setTotalsTable();
buildDiaryLocalStorage();

$(document).ready(function() {
  populateExerciseTable();
  calculateTotalCalories();
});
