var foodName = document.getElementById('foodname');
var calorieCount = document.getElementById('caloriecount');
var submitButton = document.getElementById('new-food-button');
var foodsTable = document.getElementById('foods-table')

function emptyFields(){
  $('#food-error').empty();
  $('#foodname').val('');
  $('#caloriecount').val('');
};

function displayFoods() {
  JSON.parse(localStorage.getItem('foods')).forEach(function(element){
    submitNewFood(element.name, element.calories);
  });
}

function storeFoods(name, calories){
  var foodsJSON = localStorage.getItem("foods");
  if(foodsJSON === null){
    foodsJSON = '[]';
  }
  var listFoods = JSON.parse(foodsJSON);
  listFoods.push({name: name, calories: calories});

  foodsJSON = JSON.stringify(listFoods);
  localStorage.setItem('foods', foodsJSON);
};

function submitNewFood(name, calories){
  var newRow = document.createElement('tr');
  var nameCell = document.createElement('td');
  nameCell.innerText = name;
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  var trashCan = document.createElement('td');
  trashCan.innerHTML = '<a href="#" class="trash"><span class="glyphicon glyphicon-trash" aria-hidden="true"></a>';
  newRow.appendChild(nameCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(trashCan);
  foodsTable.insertBefore(newRow, foodsTable.children[1]);
  emptyFields();
};

if (submitButton){
displayFoods();
}

$(document).ready(function() {

if (submitButton) {
  submitButton.addEventListener('click', function(){
    var name = $('#foodname').val().trim();
    var calories = $('#caloriecount').val().trim();
    if (name == '') {
      $('#food-error').append("Please enter a food name.");
    } else if (calories == '') {
      $('#calorie-error').append("Please enter a calorie amount.");
    } else {
      submitNewFood(name, calories);
      storeFoods(name, calories);
    };
  });
}

$('.trash').on('click', function(e) {
  e.preventDefault();
  var name = $(this).parent().parent().children().first().html()
  var foods = JSON.parse(localStorage.getItem('foods'))

  foods.forEach(function(object) {
    if (object.name == name) {
      foods.splice(foods.indexOf(object), 1);
    }
    foodsJSON = JSON.stringify(foods);
    localStorage.setItem('foods', foodsJSON);
  })
  $(this).parent().parent().remove();
});
})

function displayFoods() {
  JSON.parse(localStorage.getItem('foods')).forEach(function(element){
    submitNewFood(element.name, element.calories);
  });
}
