var foodName = document.getElementById('foodname');
var calorieCount = document.getElementById('caloriecount');
var submitButton = document.getElementById('new-food-button');
var foodsTable = document.getElementById('foods-table');
var trashIcon = document.getElementById('trash-icon')

function emptyErrors(){
  $("#food-error").empty();
  $("#calorie-error").empty();
}

function clearFields(){
  $('#foodname').val("");
  $('#caloriecount').val("");
}

function onSubmit(){
  emptyErrors();
  var name = foodName.value.trim();
  var calories = calorieCount.value.trim();
  if (name == "") {
    $("#food-error").append("Please enter a food name");
  } else if (calories == "") {
    $("#calorie-error").append("Please enter a calorie amount");
  } else {
    submitFood(name, calories);
    storeFoodData(name, calories);
    clearFields();
  }
}

if (submitButton) {
  submitButton.addEventListener('click', function(){
    onSubmit();
  })
}
function submitFood(name, calories) {
  var nameCell = document.createElement('td');
  var calorieCell = document.createElement('td');
  var newRow = document.createElement('tr');
  var trashCell = document.createElement('td');

  nameCell.innerText = name;
  calorieCell.innerText = calories;

  nameCell.className = "name-cell";
  nameCell.id = "food-name-cell";
  calorieCell.className = "calorie-cell";
  calorieCell.id = "food-calorie-cell";
  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
  trashCell.id = "food-trash-id";

  newRow.appendChild(nameCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(trashCell);
  foodsTable.insertBefore(newRow, foodsTable.children[1]);
}
function storeFoodData(name, calories) {
  var foodDataJSON = localStorage.getItem('foods');
  if (foodDataJSON === null){
    foodDataJSON = '[]';
  }
  var foods = JSON.parse(foodDataJSON);
  foods.push({name: name, calories: calories});
  foodDataJSON = JSON.stringify(foods);
  localStorage.setItem('foods', foodDataJSON);
}

function displayFoodData(){
  JSON.parse(localStorage.getItem('foods')).forEach(function(element){
    submitFood(element.name, element.calories);
  });
}
if (submitButton) {
  displayFoodData();
}
$(".trash-icon").on('click', function(e){
  e.preventDefault();
  var name = $(this).parent().parent().children().first().html()
  var foods = JSON.parse(localStorage.getItem('foods'))
  foods.forEach(function(object) {
    if (object.name == name) {
      foods.splice(foods.indexOf(object), 1);
    }
    foodJSON = JSON.stringify(foods);
    localStorage.setItem('foods', foodJSON);
  })
  $(this).parent().parent().remove();
});

$(".name-cell").on('click', function(){
  this.contentEditable = true;
  clickedEntry = this;
  var originalKey = this.innerText;
  event.stopPropagation();
  $(this).keydown(function(event) {
       if (event.keyCode == 13) {
         var newKey = this.innerText;
         this.contentEditable = false;
         setNameLocalStorage(originalKey, newKey);
        }
   });
  $(document).click(function(e){
      var newKey = clickedEntry.innerText;
      clickedEntry.contentEditable = false;
        setNameLocalStorage(originalKey, newKey);
     });
});



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

$(".calorie-cell").on('click', function(){
  this.contentEditable = true;
  clickedEntry = this;
  var originalKey = this.innerText;
  event.stopPropagation();
  $(this).keydown(function(event) {
       if (event.keyCode == 13) {
         var newKey = this.innerText;
         this.contentEditable = false;
         setCalsLocalStorage(originalKey, newKey);
        }
   });
  $(document).click(function(e){
      var newKey = clickedEntry.innerText;
      clickedEntry.contentEditable = false;
        setCalsLocalStorage(key, originalKey, newKey);
       });
});

$("#filter").keyup(function() {
  filterFoods();
});

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

$(document).ready(function(){
});
