var Reset = require('./reset')
var Save = require('./save')
var Table = require('./table')
var Errors = require('./errors')

function Exercise(name, calories){
  this.name = name;
  this.calories = calories;
}

Exercise.prototype.addExercise = function(){
  var errors = new Errors();
  var reset = new Reset();
  var someTable = new Table();
  var exercisesTable = document.getElementById('all-exercises-table')
  var exerciseForm = document.getElementById('exercise-form')
  errors.emptyErrors(exerciseForm);
  this.name = $('#name-field').val();
  this.calories = $('#calorie-field').val();
  if (this.name === "") {
    $("#exercise-error").append("Please enter an exercise name");
  } else if (this.calories === "") {
    $("#calories-error").append("Please enter a calorie amount");
  } else {
    reset.clearFields('#name-field', '#calorie-field');
    this.storeExercises();
    someTable.clearTable(exercisesTable)
    this.displayExercises();
  }
}

Exercise.prototype.deleteExercise = function() {
  var name = this.name
  var calories = this.calories
  var exercises = JSON.parse(localStorage.getItem('exercise-calories'))
  exercises.forEach(function(object) {
      if (object.name === name && object.calories === calories) {
        exercises.splice(exercises.indexOf(object), 1);
      }
      exercisesJSON = JSON.stringify(exercises);
      localStorage.setItem('exercise-calories', exercisesJSON);
    })
}

Exercise.prototype.editValue = function(obj, key){
  var name = this.name;
  var calories = this.calories
  var type = 'exercise-calories';
  var save = new Save;
  obj.contentEditable = true;
  clickedEntry = obj;
  var originalKey = obj.innerText;
  event.stopPropagation();
  $(obj).keydown(function(event) {
    if (event.keyCode == 13) {
      var newKey = obj.innerText;
      obj.contentEditable = false;
      save.setLocalStorage(key, newKey, name, calories, type);
    }
  });
  $(document).click(function(e){
    var newKey = clickedEntry.innerText;
    clickedEntry.contentEditable = false;
    save.setLocalStorage(key, newKey, name, calories, type);
  });
}

Exercise.prototype.storeExercises = function() {
  var exerciseDataJSON = localStorage.getItem('exercise-calories');
  if (exerciseDataJSON === null){
    exerciseDataJSON = '[]';
  }
  var exercises = JSON.parse(exerciseDataJSON);
  exercises.push(this);
  exerciseDataJSON = JSON.stringify(exercises);
  localStorage.setItem('exercise-calories', exerciseDataJSON);
}

Exercise.prototype.displayExercises = function(){
  var exercises = JSON.parse(localStorage.getItem('exercise-calories'));
  exercises.forEach(function(object){
    $('#all-exercises-table tr:first-child').after(`<tr>
      <td class='name-cell' id='exercise-name-cell'>${object.name}</td>
      <td class='calorie-cell' id='exercise-calorie-cell'>${object.calories}</td>
      <td><a href='' id='exercise-trash-icon'><span class='glyphicon glyphicon-trash trash-icon'></a></td>
      </tr>`);
  })
}

$(document).ready(function(){
  var newExercise = new Exercise();

  $('#exercise-submit').on('click', function(){
    newExercise.addExercise();
  })

  newExercise.displayExercises();

  $(document).on('click', '#exercise-trash-icon', function(e){
    e.preventDefault();
    var name = $(this).parent().siblings()[0].innerHTML;
    var calories = $(this).parent().siblings()[1].innerHTML;
    $(this).parent().parent().remove();
    var newExercise = new Exercise(name, calories)
    newExercise.deleteExercise();
  });

  $(".calorie-cell").on('click', function(){
    var key = "calories"
    var $calories= $(this).html()
    var $name = $(this).siblings().html()
    editExercise = new Exercise($name, $calories)
    editExercise.editValue(this, key);
  });

  $(".name-cell").on('click', function(){
    var key = "name";
    var $name = $(this).html()
    var $calories = $(this).siblings().html()
    editExercise = new Exercise($name, $calories)
    editExercise.editValue(this, key);
  });

  $("#filter-field").keyup(function() {
    var exercisesTable = document.getElementById('all-exercises-table')
    someTable = new Table();
    someTable.filterItems(exercisesTable, this);
  });
})


module.exports = Exercise;
