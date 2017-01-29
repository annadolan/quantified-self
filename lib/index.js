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

if (addExerciseButton) {
  addExerciseButton.addEventListener('click', function(){
    exerciseSubmit();
  })
}


// $(document).ready(function(){
//   $("#add-exercise").on('click', function(){
//     debugger
//     exerciseSubmit();
//   });
// });

function exerciseSubmit(){
  var exercises = document.getElementsByClassName('exercise-checkbox')

  for (i = 0; i < exercises.length; i++) {
    if (exercises[i].checked === true ) {
      var eName = exercises[i].nextElementSibling.innerText;
      var eCalories = exercises[i].nextElementSibling.nextElementSibling.innerText;
      populateExerciseTable(eName, eCalories);
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
  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
}
