var foodName = document.getElementById('foodname');
var calorieCount = document.getElementById('caloriecount');
var submitButton = document.getElementById('new-food-button');
var foodsTable = document.getElementById('foods-table')

submitButton.addEventListener('click', function(){
  var name = $('#foodname').val().trim();
  var calories = $('#caloriecount').val().trim();
  if (name == '') {
    $('#food-error').append("Please enter a food name.");
  } else if (calories == '') {
    $('#calorie-error').append("Please enter a calorie count.");
  } else {
    submitNewFood(name, calories);
    storeFoods(name, calories);
  };
})

function submitNewFood(name, calories){
  var newRow = document.createElement('tr');
  var nameCell = document.createElement('td');
  nameCell.innerText = name;
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  var trashCan = document.createElement('td');
  trashCan.innerHTML = '<span class="glyphicon glyphicon-trash" aria-hidden="true">';
  newRow.appendChild(nameCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(trashCan);
  foodsTable.appendChild(newRow);
  emptyFields();
};

function emptyFields(){
  $('#food-error').empty();
  $('#foodname').val('');
  $('#caloriecount').val('');
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
}

function displayFoods() {
  JSON.parse(localStorage.getItem('foods')).forEach(function(element){
    submitNewFood(element.name, element.calories);
  });
}

displayFoods();
