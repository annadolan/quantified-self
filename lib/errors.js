function Errors() {

}

Errors.prototype.emptyErrors = function(idName){
  $(idName).children().children().empty();
}

module.exports = Errors
