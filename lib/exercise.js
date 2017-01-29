var exercisesTable = document.getElementById('all-exercises-table');
var trashIcon = document.getElementById('trash-icon')

function Exercise(exerciseName, calorieCount){
  this.name = exerciseName;
  this.calories = calorieCount;
  this.build = function(){
     buildTableEx(exerciseName, calorieCount)
   }
  this.store = function(){
    storeExercises(exerciseName, calorieCount)
  }
}

$(document).ready(function(){
  displayExercises();

  $(document).on("click", "#trash-icon-ex", function(e){
    e.preventDefault();
    var name = $(this).parent().parent().children().first().html()
    var exercises = JSON.parse(localStorage.getItem('exercise-calories'))
    exercises.forEach(function(object) {
      if (object.exerciseName == name) {
        exercises.splice(exercises.indexOf(object), 1);
      }
      exerciseJSON = JSON.stringify(exercises);
      localStorage.setItem('exercise-calories', exerciseJSON);
    })
    $(this).parent().parent().remove();
  });

  $(".calorie-cell-ex").on('click', function(){
    var key = "calorieCount"
    editValueEx(this, key);
  });

  $(".name-cell-ex").on('click', function(){
    var key = "exerciseName"
    editValueEx(this, key);
  });

  $("#filter").keyup(function() {
    filterExercises();
  });

})

$('#exercise-submit').on('click', function(){
  addExercise();
})


function emptyErrorsEx(){
  $("#error-message-id").empty();
}

function clearFieldsEx(){
  $('#name-field').val("");
  $('#calorie-field').val("");
}

function addExercise(){
  emptyErrorsEx();
  var exerciseName = $('#name-field').val();
  var calorieCount = $('#calorie-field').val();
  var newExercise = new Exercise(exerciseName, calorieCount);

  if (exerciseName === "") {
    $("#error-message-id").append("Please enter an exercise name");
  } else if (calorieCount === "") {
    $("#error-message-id").append("Please enter a calorie amount");
  } else {
    newExercise.build();
    newExercise.store();
    clearFieldsEx();
  }
}

function buildTableEx(name, calories) {
  var newRow = document.createElement('tr');
  buildNameCellEx(name, newRow);
  buildCalorieCellEx(calories, newRow);
  buildTrashCell(newRow);
  exercisesTable.insertBefore(newRow, exercisesTable.children[1]);
}

function buildNameCellEx(name, newRow){
  var nameCell = document.createElement('td');
  nameCell.innerText = name;
  nameCell.className = "name-cell-ex";
  nameCell.id = "name-cell-id";
  newRow.appendChild(nameCell);
}

function buildCalorieCellEx(calories, newRow){
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.className = "calorie-cell-ex";
  calorieCell.id = "calorie-cell-id";
  newRow.appendChild(calorieCell);
}

function buildTrashCell(newRow){
  var trashCell = document.createElement('td');
  trashCell.innerHTML = "<a href='' id='trash-icon'><span class='glyphicon glyphicon-trash trash-icon'></a>";
  newRow.appendChild(trashCell);
}

function storeExercises(exerciseName, calorieCount) {
  var exerciseDataJSON = localStorage.getItem('exercise-calories');
  if (exerciseDataJSON === null){
    exerciseDataJSON = '[]';
  }
  var exercises = JSON.parse(exerciseDataJSON);
  exercises.push({exerciseName: exerciseName, calorieCount: calorieCount});
  exerciseDataJSON = JSON.stringify(exercises);
  localStorage.setItem('exercise-calories', exerciseDataJSON);
}

function displayExercises(){
  JSON.parse(localStorage.getItem('exercise-calories')).forEach(function(element){
    buildTableEx(element.exerciseName, element.calorieCount);
  });
}




function editValueEx(obj, key){
  obj.contentEditable = true;
  clickedEntry = obj;
  var originalKey = obj.innerText;
  event.stopPropagation();
  $(obj).keydown(function(event) {
       if (event.keyCode == 13) {
         var newKey = obj.innerText;
         obj.contentEditable = false;
         if (key === "exerciseName"){
          setExNameLocalStorage(originalKey, newKey);
        } else {
          setExCalsLocalStorage(originalKey, newKey);
        }
        }
   });
  $(document).click(function(e){
      var newKey = clickedEntry.innerText;
      clickedEntry.contentEditable = false;
      if (key === "exerciseName"){
       setExNameLocalStorage(originalKey, newKey);
     } else {
       setExCalsLocalStorage(originalKey, newKey);
     }
     });
}

function setExNameLocalStorage(originalKey, newKey){
  var exercises = JSON.parse(localStorage.getItem('exercise-calories'))
  exercises.forEach(function(object, key) {
    if (object.exerciseName == originalKey) {
      object.exerciseName = newKey;
    }
    exerciseJSON = JSON.stringify(exercises);
    localStorage.setItem('exercise-calories', exerciseJSON);
    })
}

function setExCalsLocalStorage(originalKey, newKey){
  var exercises = JSON.parse(localStorage.getItem('exercise-calories'))
  exercises.forEach(function(object, key) {
    if (object.calorieCount == originalKey) {
      object.calorieCount = newKey;
    }
    exerciseJSON = JSON.stringify(exercises);
    localStorage.setItem('exercise-calories', exerciseJSON);
    })
}


function filterExercises() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("filter-field");
  filter = input.value.toUpperCase();
  tr = foodsTable.getElementsByTagName("tr");

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
