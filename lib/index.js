var diaryFoodsTable = document.getElementById('diary-foods-table');
var diaryExercisesTable = document.getElementById('diary-exercises-table');
var Food = require('./foods');
var Exercise = require('./exercise');
var addExerciseButton = document.getElementById('add-exercise');

function displayFoodData(){
  JSON.parse(localStorage.getItem('foods')).forEach(function(element){
    submitFood(element.name, element.calories);
  });
}

function displayExerciseData(){
  JSON.parse(localStorage.getItem('exercise-calories')).forEach(function(element){
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

function dateToday(){
  var d = new Date();
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


dateToday();

$("#food-diary-filter").keyup(function() {
  filterFoods();
});

$("#exercises-diary-filter").keyup(function() {
  filterExercises();
});


$("#add-exercise").on('click', function(){
  exerciseSubmit();
});


function exerciseSubmit(){
  var exercises = document.getElementsByClassName('exercise-checkbox')

  for (i = 0; i < exercises.length; i++) {
    if (exercises[i].checked === true ) {
      var eName = exercises[i].nextElementSibling.innerText;
      var eCalories = exercises[i].nextElementSibling.nextElementSibling.innerText;
      populateExerciseTable(eName, eCalories);
      calculateTotalCalories();
      exercises[i].checked = false;
    }
  }
}

function populateExerciseTable(eName, eCalories){
  var exercisesTable = document.getElementById('exercise-table');
  var row = exercisesTable.insertRow(1);
  var nameCell = row.insertCell(0);
  var caloriesCell = row.insertCell(1);
  var trashCell = row.insertCell(2);
  nameCell.innerText = eName;
  caloriesCell.innerText = eCalories;
  caloriesCell.className = "exercise-calorie-cell"
  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
}

function calculateTotalCalories(){
  var exercisesTable = document.getElementById('exercise-table');
  var totalCalorieCell = document.getElementById('exercise-total-cals');
  var totalCalories = 0;

  $(".exercise-calorie-cell").each(function() {;
      totalCalories += parseFloat(this.innerText);
  });

  totalCalorieCell.innerText = totalCalories;
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
      }
      if (event.currentTarget.id === "lunch-btn") {
        populateLunchTable(fName, fCalories);
        calculateTotalLunchCalories();
      }
      if (event.currentTarget.id === "dinner-btn") {
        populateDinnerTable(fName, fCalories);
        calculateTotalDinnerCalories();
      }
      if (event.currentTarget.id === "snacks-btn") {
        populateSnacksTable(fName, fCalories);
        calculateTotalSnackCalories();
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
  }
  if (meal === "lunch") {
    remainingLunchCalories = 600 - totalCalories;
    var lunchRemainingCell = document.getElementById('lunch-remaining-cals');
    lunchRemainingCell.innerText = remainingLunchCalories
  }
  if (meal === "dinner") {
    remainingDinnerCalories = 800 - totalCalories;
    var dinnerRemainingCell = document.getElementById('dinner-remaining-cals');
    dinnerRemainingCell.innerText = remainingDinnerCalories
  }
  if (meal === "snacks") {
  remainingSnacksCalories = 200 - totalCalories;
  var snacksRemainingCell = document.getElementById('snacks-remaining-cals');
  snacksRemainingCell.innerText = remainingSnacksCalories
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
