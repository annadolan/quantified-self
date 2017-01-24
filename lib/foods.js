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
  };
})

function submitNewFood(name, calories){
  var newRow = document.createElement('tr');
  var nameCell = document.createElement('td');
  nameCell.innerText = name;
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  newRow.appendChild(nameCell);
  newRow.appendChild(calorieCell);
  foodsTable.appendChild(newRow);
};
