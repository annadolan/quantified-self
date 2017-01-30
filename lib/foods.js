var foodsTable = document.getElementById('foods-table');
var trashIcon = document.getElementById('trash-icon')
var foodForm = document.getElementById('food-form')
var Reset = require('./reset')

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
    filterItems(foodsTable, this);
  });

})

$('#new-food-button').on('click', function(){
  var newFood = new Food();
  newFood.addFood();
})

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
  obj.contentEditable = true;
  clickedEntry = obj;
  var originalKey = obj.innerText;
  event.stopPropagation();
  $(obj).keydown(function(event) {
    if (event.keyCode == 13) {
      var newKey = obj.innerText;
      obj.contentEditable = false;
      setLocalStorage(key, newKey, name, calories, type);
    }
  });
  $(document).click(function(e){
    var newKey = clickedEntry.innerText;
    clickedEntry.contentEditable = false;
    setLocalStorage(key, newKey, name, calories, type);
  });
}

// function emptyErrors(idName){
//   $(idName).children().children().empty();
// }
//
// function clearFields(field1, field2){
//   $(field1).val("");
//   $(field2).val("");
// }

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

function setLocalStorage(key, newKey, name, calories, type){
  var array = JSON.parse(localStorage.getItem(type))
  array.forEach(function(object) {
    if (object.name === name && object.calories === calories) {
      object[key] = newKey;
    }
    arrayJSON = JSON.stringify(array);
    localStorage.setItem(type, arrayJSON);
    })
}

function filterItems(table, input) {
  var input, filter, table, tr, td, i;
  filter = input.value.toUpperCase();
  tr = table.getElementsByTagName("tr");

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

module.exports = Food;
