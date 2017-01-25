var nameInput = document.getElementById('name-field')
var calorieInput = document.getElementById('calorie-field')
var exercisesTable = document.getElementById('all-exercises-table');
var submitButton = document.getElementById('exercise-submit');

submitButton.addEventListener('click', function(){
  var exerciseName = nameInput.value;
  var calorieCount = calorieInput.value;
  submitExercise(exerciseName, calorieCount);
})

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

// module.exports = Exercise;
