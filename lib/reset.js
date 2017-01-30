function Reset() {

}

Reset.prototype.emptyErrors = function(idName){
  $(idName).children().children().empty();
}

Reset.prototype.clearFields = function(field1, field2){
  $(field1).val("");
  $(field2).val("");
}

Reset.prototype.clearTable = function(table){
  $(`#${table.id} tr:first-child`).nextAll().empty();
}

module.exports = Reset;
