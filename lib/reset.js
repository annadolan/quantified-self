function Reset() {

}

Reset.prototype.emptyErrors = function(idName){
  $(idName).children().children().empty();
}

Reset.prototype.clearFields = function(field1, field2){
  $(field1).val("");
  $(field2).val("");
}



module.exports = Reset;
