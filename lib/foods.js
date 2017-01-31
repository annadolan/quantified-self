var foodsTable = document.getElementById('foods-table');
var trashIcon = document.getElementById('trash-icon')
var foodForm = document.getElementById('food-form')
var Reset = require('./reset')
var Save = require('./save')
var View = require('./view')

function Food(name, calories){
  this.name = name;
  this.calories = calories;
}

Food.prototype.addFood = function(){
  var reset = new Reset();
  reset.emptyErrors(foodForm);
  this.name = $('#foodname').val();
  this.calories = $('#caloriecount').val();
  if (this.name === "") {
    $("#food-error").append("Please enter a food name");
  } else if (this.calories === "") {
    $("#calorie-error").append("Please enter a calorie amount");
  } else {
    reset.clearFields('#foodname', '#caloriecount');
    this.storeFoods();
    reset.clearTable(foodsTable)
    this.displayFoods();
  }
}

Food.prototype.deleteFood = function() {
  var name = this.name
  var calories = this.calories
  var foods = JSON.parse(localStorage.getItem('foods'))
  foods.forEach(function(object) {
      if (object.name === name && object.calories === calories) {
        foods.splice(foods.indexOf(object), 1);
      }
      foodJSON = JSON.stringify(foods);
      localStorage.setItem('foods', foodJSON);
    })
}

Food.prototype.editValue = function(obj, key){
  var name = this.name;
  var calories = this.calories
  var type = 'foods';
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

Food.prototype.storeFoods = function() {
  var foodDataJSON = localStorage.getItem('foods');
  if (foodDataJSON === null){
    foodDataJSON = '[]';
  }
  var foods = JSON.parse(foodDataJSON);
  foods.push(this);
  foodDataJSON = JSON.stringify(foods);
  localStorage.setItem('foods', foodDataJSON);
}

Food.prototype.displayFoods = function(){
  var foods = JSON.parse(localStorage.getItem('foods'));
  foods.forEach(function(object){
    $('#foods-table tr:first-child').after(`<tr>
      <td class='name-cell' id='food-name-cell'>${object.name}</td>
      <td class='calorie-cell' id='food-calorie-cell'>${object.calories}</td>
      <td><a href='' id='trash-icon'><span class='glyphicon glyphicon-trash trash-icon'></a></td>
      </tr>`);
  })
}

$(document).ready(function(){
  var newFood = new Food();

  newFood.displayFoods();

  $(document).on('click', '#trash-icon', function(e){
    e.preventDefault();
    var name = $(this).parent().siblings()[0].innerHTML;
    var calories = $(this).parent().siblings()[1].innerHTML;
    $(this).parent().parent().remove();
    var newFood = new Food(name, calories)
    newFood.deleteFood();
  });

  $(".calorie-cell").on('click', function(){
    var key = "calories"
    var $calories= $(this).html()
    var $name = $(this).siblings().html()
    editFood = new Food($name, $calories)
    editFood.editValue(this, key);
  });

  $(".name-cell").on('click', function(){
    var key = "name";
    var $name = $(this).html()
    var $calories = $(this).siblings().html()
    editFood = new Food($name, $calories)
    editFood.editValue(this, key);
  });

  $("#filter").keyup(function() {
    view = new View();
    view.filterItems(foodsTable, this);
  });
})

$('#new-food-button').on('click', function(){
  var newFood = new Food();
  newFood.addFood();
})

module.exports = Food;
