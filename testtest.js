function exerciseSubmit(){
  var exercises = document.getElementsByClassName('exercise-checkbox')
  for (i = 0; i < exercises.length; i++) {
    if (exercises[i].childNodes[0].checked === true ) {
      var eName = exercises[i].previousElementSibling.previousElementSibling.innerText;
      var eCalories = exercises[i].previousElementSibling.innerText;
      // populateExerciseTable(eName, eCalories);
      addExerciseDataToLocalStorage(eName, eCalories);
      updateRemainingCalories(eCalories, 0)
      exercises[i].childNodes[0].checked = false;
    }
  }
  populateExerciseTable();
  calculateTotalCalories();
}

function populateExerciseTable(){
  var pageDate = formatDateKey();
  var currentDayLocalStorage = localStorage.getItem(pageDate);
  var currentDiary = JSON.parse(currentDayLocalStorage);
  for (i = 0; i < currentDiary[0].tableData.length; i++){
    var exercisesTable = document.getElementById('exercise-table');
    var row = exercisesTable.insertRow(1);
    row.className = "exercise-table-row"
    var nameCell = row.insertCell(0);
    var caloriesCell = row.insertCell(1);
    var trashCell = row.insertCell(2);
    nameCell.innerText = currentDiary[0].tableData[i].name;
    caloriesCell.innerText = currentDiary[0].tableData[i].calories;
    caloriesCell.className = "exercise-calorie-cell"
    nameCell.className = "exercise-name-cell"
    trashCell.innerHTML = "<span class='glyphicon glyphicon-trash trash-icon'>";
  }
}
$("#add-exercise").on('click', function(){
  clearExerciseTable();
  exerciseSubmit();
  // setExDiaryLocalStorage();
  // displayDiaryExercises()
});
