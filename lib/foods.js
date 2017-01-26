var foodName = document.getElementById('foodname');
var calorieCount = document.getElementById('caloriecount');
var submitButton = document.getElementById('new-food-button');
var foodsTable = document.getElementById('foods-table');
var trashIcon = document.getElementById('trash-icon')


if (submitButton) {
  submitButton.addEventListener('click', function(){
    var name = foodName.value;
    var calories = calorieCount.value;
    if (name === "" && calories === ""){
    } else if (calories === "") {
      $(".error-message").empty();
      $(".food-error").append("Please enter a calorie amount");
    } else if (name === "") {
      $(".error-message").empty();
      $(".calorie-error").append("Please enter a exercise name");
    } else {
      $(".food-error").empty();
      $(".calorie-error").empty();
      document.getElementById("foodname").value = "";
      document.getElementById("caloriecount").value = "";
      submitFood(name, calories);
      storeFoodData(name, calories);
    }
  })
}
function submitFood(name, calories) {
  var newRow = document.createElement('tr');
  var nameCell = document.createElement('td');
  nameCell.innerText = name;
  nameCell.className = "name-cell";
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.className = "calorie-cell";
  var trashCell = document.createElement('td');
  trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
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
  var originalName = this.innerText;
  event.stopPropagation();
  $(this).keydown(function(event) {
       if (event.keyCode == 13) {
         var newName = this.innerText;
         this.contentEditable = false;
         var food = JSON.parse(localStorage.getItem('foods'))
         food.forEach(function(object) {
           if (object.name == originalName) {
             object.name = newName;
           }
           foodJSON = JSON.stringify(food);
           localStorage.setItem('foods', foodJSON);
         })
        }
   });
  $(document).click(function(e){
      var newName = clickedEntry.innerText;
      clickedEntry.contentEditable = false;
      var food = JSON.parse(localStorage.getItem('foods'))
      food.forEach(function(object) {
        if (object.name == originalName) {
          object.name = newName;
        }
        foodJSON = JSON.stringify(food);
        localStorage.setItem('foods', foodJSON);
      })
       });
});
$(".calorie-cell").on('click', function(){
  this.contentEditable = true;
  clickedEntry = this;
  var originalName = this.innerText;
  event.stopPropagation();
  $(this).keydown(function(event) {
       if (event.keyCode == 13) {
         var newName = this.innerText;
         this.contentEditable = false;
         var food = JSON.parse(localStorage.getItem('foods'))
         food.forEach(function(object) {
           if (object.calories == originalName) {
             object.calories = newName;
           }
           foodJSON = JSON.stringify(food);
           localStorage.setItem('foods', foodJSON);
         })
        }
   });
  $(document).click(function(e){
      var newName = clickedEntry.innerText;
      clickedEntry.contentEditable = false;
      var food = JSON.parse(localStorage.getItem('food'))
      food.forEach(function(object) {
        if (object.calories == originalName) {
          object.calories = newName;
        }
        foodJSON = JSON.stringify(food);
        localStorage.setItem('foods', food);
      })
       });
});

$(".name-cell").on('click', function(){
  this.contentEditable = true;
  clickedEntry = this;
  var originalName = this.innerText;
  event.stopPropagation();

  $(document).click(function(e){
    var newName = clickedEntry.innerText;
    clickedEntry.contentEditable = false;

    var food = JSON.parse(localStorage.getItem('foods'))
    food.forEach(function(object) {
      if (object.name == originalName) {
        object.name = newName;
      }
      foodJSON = JSON.stringify(food);
      localStorage.setItem('foods', foodJSON);
    })
  })

  $(this).keypress(function(event){
    if(event.keyCode == 13){
      var newName = this.innerText;
      this.contentEditable = false;

      var food = JSON.parse(localStorage.getItem('foods'))
      food.forEach(function(object) {
        if (object.name == originalName) {
          object.name = newName;
        }
        foodJSON = JSON.stringify(food);
        localStorage.setItem('foods', foodJSON);
      })
    }
  })
})

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
