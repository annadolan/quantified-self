var nameInput = document.getElementById('name-field')
var calorieInput = document.getElementById('calorie-field')
var exercisesTable = document.getElementById('all-exercises-table');
var submitButton = document.getElementById('exercise-submit');
var trashIcon = document.getElementById('trash-icon')

if (submitButton) {
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
}

function submitExercise(exerciseName, calorieCount) {
  var newRow = document.createElement('tr');
  var nameCell = document.createElement('td');
  nameCell.innerText = exerciseName;
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calorieCount;
  var trashCell = document.createElement('td');
  // trashCell.innerHTML = "<a href='' id='trash-icon' class='glyphicon glyphicon-trash'> </a>";
  // var trashCell.id = "trash-icon"
  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
  // trashCell.innerHTML = '<span class="glyphicon glyphicon-trash" aria-hidden="true">';
  // trashCell.innerHTML = '<a href='' class=""> this </a>';
  newRow.appendChild(nameCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(trashCell);
  exercisesTable.insertBefore(newRow, exercisesTable.children[1]);
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

if (submitButton) {
  displayExerciseData();
}


//
// $(".trash-icon").on('click', function(e){
//   e.preventDefault();
//   $(this).parent().parent().remove();
// });

$(".trash-icon").on('click', function(e){
  e.preventDefault();
  var name = $(this).parent().parent().children().first().html()
  var exerciseCalories = JSON.parse(localStorage.getItem('exercise-calories'))

  exerciseCalories.forEach(function(object) {
    if (object.exerciseName == name) {
      exerciseCalories.splice(exerciseCalories.indexOf(object), 1);
    }
    exercisesJSON = JSON.stringify(exerciseCalories);
    localStorage.setItem('exercise-calories', exercisesJSON);
  })

  $(this).parent().parent().remove();
});





$(document).ready(function(){

});
