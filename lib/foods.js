var foodsTable = document.getElementById('foods-table');
var trashIcon = document.getElementById('trash-icon')

function Food(name, calories){
  this.name = name;
  this.calories = calories;
}

Food.prototype.addFood = function(){
  this.emptyErrors();
  this.name = $('#foodname').val();
  this.calories = $('#caloriecount').val();
  if (this.name === "") {
    $("#food-error").append("Please enter a food name");
  } else if (this.calories === "") {
    $("#calorie-error").append("Please enter a calorie amount");
  } else {
    this.clearFields();
    this.storeFoods();
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
    deleteFood(name, calories);
  });

  $(".calorie-cell").on('click', function(){
    var key = "calories"
    editValue(this, key);
  });

  $(".name-cell").on('click', function(){
    var key = "name"
    editValue(this, key);
  });

  $("#filter").keyup(function() {
    filterFoods();
  });

})


$('#new-food-button').on('click', function(){
  var newFood = new Food();
  newFood.addFood();
})

function deleteFood(name, calories) {
  var foods = JSON.parse(localStorage.getItem('foods'))
  foods.forEach(function(object) {
      if (object.name === name && object.calories === calories) {
        foods.splice(foods.indexOf(object), 1);
      }
      foodJSON = JSON.stringify(foods);
      localStorage.setItem('foods', foodJSON);
    })
}



Food.prototype.emptyErrors = function(){
  $("#food-error").empty();
  $("#calorie-error").empty();
}

Food.prototype.clearFields = function(){
  $('#foodname').val("");
  $('#caloriecount').val("");
}

//
// Food.prototype.buildTable = function() {
//   var newRow = document.createElement('tr');
//   buildNameCell(this.name, newRow);
//   buildCalorieCell(this.calories, newRow);
//   buildTrashCell(newRow);
//   foodsTable.insertBefore(newRow, foodsTable.children[1]);
// }
//
// function buildNameCell(name, newRow){
//   var nameCell = document.createElement('td');
//   nameCell.innerText = name;
//   nameCell.className = "name-cell";
//   nameCell.id = "food-name-cell";
//   newRow.appendChild(nameCell);
// }
//
// function buildCalorieCell(calories, newRow){
//   var calorieCell = document.createElement('td');
//   calorieCell.innerText = calories;
//   calorieCell.className = "calorie-cell";
//   calorieCell.id = "food-calorie-cell";
//   newRow.appendChild(calorieCell);
// }
//
// function buildTrashCell(newRow){
//   var trashCell = document.createElement('td');
//   trashCell.innerHTML = "<a href='' id='trash-icon'><span class='glyphicon glyphicon-trash trash-icon'></a>";
//   newRow.appendChild(trashCell);
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
  // JSON.parse(localStorage.getItem('foods')).forEach(function(element){
  //   element.buildTable();
  // });
}




function editValue(obj, key){
  obj.contentEditable = true;
  clickedEntry = obj;
  var originalKey = obj.innerText;
  event.stopPropagation();
  $(obj).keydown(function(event) {
       if (event.keyCode == 13) {
         var newKey = obj.innerText;
         obj.contentEditable = false;
         if (key === "name"){
          setNameLocalStorage(originalKey, newKey);
        } else {
          setCalsLocalStorage(originalKey, newKey);
        }
        }
   });
  $(document).click(function(e){
      var newKey = clickedEntry.innerText;
      clickedEntry.contentEditable = false;
      if (key === "name"){
       setNameLocalStorage(originalKey, newKey);
     } else {
       setCalsLocalStorage(originalKey, newKey);
     }
     });
}

function setNameLocalStorage(originalKey, newKey){
  var food = JSON.parse(localStorage.getItem('foods'))
  food.forEach(function(object, key) {
    if (object.name == originalKey) {
      object.name = newKey;
    }
    foodJSON = JSON.stringify(food);
    localStorage.setItem('foods', foodJSON);
    })
}

function setCalsLocalStorage(originalKey, newKey){
  var food = JSON.parse(localStorage.getItem('foods'))
  food.forEach(function(object, key) {
    if (object.calories == originalKey) {
      object.calories = newKey;
    }
    foodJSON = JSON.stringify(food);
    localStorage.setItem('foods', foodJSON);
    })
}


function filterFoods() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("filter");
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

module.exports = Food;
