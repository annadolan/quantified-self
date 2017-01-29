var foodsTable = document.getElementById('foods-table');
var trashIcon = document.getElementById('trash-icon')

function Food(name, calories){
  this.name = name;
  this.calories = calories;
  this.build = function(){
     buildTable(name, calories)
   }
  this.store = function(){
    storeFoodData(name, calories)
  }
}

$(document).ready(function(){
  displayFoodData();

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
  submitFood();
})


function emptyErrors(){
  $("#food-error").empty();
  $("#calorie-error").empty();
}

function clearFields(){
  $('#foodname').val("");
  $('#caloriecount').val("");
}

function submitFood(){
  emptyErrors();
  var name = $('#foodname').val();
  var calories = $('#caloriecount').val();
  var newFood = new Food(name, calories);

  if (name === "") {
    $("#food-error").append("Please enter a food name");
  } else if (calories === "") {
    $("#calorie-error").append("Please enter a calorie amount");
  } else {
    newFood.build();
    newFood.store();
    clearFields();
  }
}

function buildTable(name, calories) {
  var newRow = document.createElement('tr');
  buildNameCell(name, newRow);
  buildCalorieCell(calories, newRow);
  buildTrashCell(newRow);
  foodsTable.insertBefore(newRow, foodsTable.children[1]);
}

function buildNameCell(name, newRow){
  var nameCell = document.createElement('td');
  nameCell.innerText = name;
  nameCell.className = "name-cell";
  nameCell.id = "food-name-cell";
  newRow.appendChild(nameCell);
}

function buildCalorieCell(calories, newRow){
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.className = "calorie-cell";
  calorieCell.id = "food-calorie-cell";
  newRow.appendChild(calorieCell);
}

function buildTrashCell(newRow){
  var trashCell = document.createElement('td');
  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
  trashCell.id = "food-trash-id";
  newRow.appendChild(trashCell);
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
    buildTable(element.name, element.calories);
  });
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
