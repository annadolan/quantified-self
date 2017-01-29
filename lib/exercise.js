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
      $(".error-message").append("Please enter an exercise name");
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

$(".name-cell").on('click', function(){
  this.contentEditable = true;
  clickedEntry = this;
  var originalName = this.innerText;
  event.stopPropagation();

  $(this).keydown(function(event) {
       if (event.keyCode == 13) {
         var newName = this.innerText;
         this.contentEditable = false;

         var exerciseCalories = JSON.parse(localStorage.getItem('exercise-calories'))
         exerciseCalories.forEach(function(object) {
           if (object.exerciseName == originalName) {
             object.exerciseName = newName;
           }
           exercisesJSON = JSON.stringify(exerciseCalories);
           localStorage.setItem('exercise-calories', exercisesJSON);
         })
        }
   });

  $(document).click(function(e){
      var newName = clickedEntry.innerText;
      clickedEntry.contentEditable = false;

      var exerciseCalories = JSON.parse(localStorage.getItem('exercise-calories'))
      exerciseCalories.forEach(function(object) {
        if (object.exerciseName == originalName) {
          object.exerciseName = newName;
        }
        exercisesJSON = JSON.stringify(exerciseCalories);
        localStorage.setItem('exercise-calories', exercisesJSON);
      })
       });

});

$(".calorie-cell").on('click', function(){
  this.contentEditable = true;
  clickedCalorie = this;
  var originalCalorie = this.innerText;
  event.stopPropagation();

  $(this).keydown(function(event) {
       if (event.keyCode == 13) {
         var newCalorie = this.innerText;
         this.contentEditable = false;

         var exerciseCalories = JSON.parse(localStorage.getItem('exercise-calories'))
         exerciseCalories.forEach(function(object) {
           if (object.calorieCount == originalCalorie) {
             object.calorieCount = newCalorie;
           }
           exercisesJSON = JSON.stringify(exerciseCalories);
           localStorage.setItem('exercise-calories', exercisesJSON);
         })
        }
   });

  $(document).click(function(e){
      var newCalorie = clickedEntry.innerText;
      clickedCalorie.contentEditable = false;

      var exerciseCalories = JSON.parse(localStorage.getItem('exercise-calories'))
      exerciseCalories.forEach(function(object) {
        if (object.calorieCount == originalCalorie) {
          object.calorieCount = newCalorie;
        }
        exercisesJSON = JSON.stringify(exerciseCalories);
        localStorage.setItem('exercise-calories', exercisesJSON);
      })
       });

});

$("#filter-field").on('click', function(){
  $(this).keyup(function(event){
    filterExcercises();
  })
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




$(document).ready(function(){

});
