
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

Table.prototype.sortTable = function(table) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "asc") {
        if (parseInt(x.innerText) > parseInt(y.innerText)) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (parseInt(x.innerText) < parseInt(y.innerText)) {
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
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
