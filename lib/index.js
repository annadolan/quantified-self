var Food = require('./foods');
var Exercise = require('./exercise');
var diaryFoodsTable = document.getElementById('diary-foods-table');
var diaryExercisesTable = document.getElementById('diary-exercises-table');

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

$("#food-diary-filter").keyup(function() {
  filterFoods();
});
