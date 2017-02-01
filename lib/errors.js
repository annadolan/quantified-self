function Errors() {

}

Errors.prototype.emptyErrors = function(idName){
  $(idName).children().children().empty();
}

Errors.prototype.nameError = function(type){
  $("#name-error").append("Please enter " + type + " name");
}

Errors.prototype.calorieError = function(type){
  $("#calories-error").append("Please enter a calorie amount");
}

module.exports = Errors
