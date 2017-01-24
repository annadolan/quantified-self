var foodName = document.getElementById('foodname');
var calorieCount = document.getElementById('caloriecount');
var submitButton = document.getElementById('new-food-button');
var foodsTable = document.getElementById('foods-table')

submitButton.addEventListener('click', function(){
  var name = foodName.value;
  var calories = calorieCount.value;
  if (name == '') {
    $('#food-error').append("Please enter a food name.");
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

};

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
