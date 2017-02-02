
function Table() {
  
}

Table.prototype.filterItems = function(table, input){
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

Table.prototype.clearTable = function(table){
  $(`#${table.id} tr:first-child`).nextAll().empty();
}

Table.prototype.fillMealTable = function(totalCalsID, remainingCalsID, arrayPosition, pageDate){
  var totalCalsCell = document.getElementById(totalCalsID)
  var remainingCalsCell = document.getElementById(remainingCalsID)
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  totalCalsCell.innerText = currentDiary[arrayPosition].totalCalories
  remainingCalsCell.innerText = currentDiary[arrayPosition].remainingCalories
}

Table.prototype.fillExerciseTable = function(pageDate) {
  var totalCalsCell = document.getElementById('exercise-total-cals')
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  totalCalsCell.innerText = currentDiary[0].totalCalories
}

module.exports = Table;
