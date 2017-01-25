var nameInput = document.getElementById('name-field')
var calorieInput = document.getElementById('calorie-field')
var exercisesTable = document.getElementById('all-exercises-table');
var submitButton = document.getElementById('exercise-submit');

submitButton.addEventListener('click', function(){
  var exerciseName = nameInput.value;
  var calorieCount = calorieInput.value;
  if (exerciseName === "" && calorieCount === ""){

  } else if (calorieCount === "") {
    $(".error-message").empty();
    $(".error-message").append("Please enter a calorie amount");
  } else if (exerciseName === "") {
    $(".error-message").empty();
    $(".error-message").append("Please enter a exercise name");
  } else {
    $(".error-message").empty();
    document.getElementById("calorie-field").value = "";
    document.getElementById("name-field").value = "";
    submitExercise(exerciseName, calorieCount);
    storeExerciseData(exerciseName, calorieCount);
  }
})

function submitExercise(exerciseName, calorieCount) {
  // method for storing data locally
  var newRow = document.createElement('tr');
  var nameCell = document.createElement('td');
  nameCell.innerText = exerciseName;
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calorieCount;
  var trashCell = document.createElement('td');
  trashCell.innerHTML = "<a href='' id='delete-link'> Delete </a>";
  // trashCell.innerHTML = '<span class="glyphicon glyphicon-trash" aria-hidden="true">';
  newRow.appendChild(nameCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(trashCell);
  exercisesTable.insertBefore(newRow, exercisesTable.children[1]);
  // exercisesTable.appendChild(newRow);
}

function storeExerciseData(exerciseName, calorieCount) {
  var exerciseDataJSON = localStorage.getItem('exercise-calories');
  if (exerciseDataJSON === null){
    exerciseDataJSON = '[]';
  }
  var exercises = JSON.parse(exerciseDataJSON);

  exercises.push({exerciseName: exerciseName, calorieCount: calorieCount});

  exerciseDataJSON = JSON.stringify(exercises);
  localStorage.setItem('exercise-calories', exerciseDataJSON);
}

function displayExerciseData(){
  JSON.parse(localStorage.getItem('exercise-calories')).forEach(function(element){
    submitExercise(element.exerciseName, element.calorieCount);
  });
}

displayExerciseData();

$(document).ready(function(){

  // $('#this-test').hide();
});
// module.exports = Exercise;
