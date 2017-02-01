function Form() {

}

Form.prototype.clearFields = function(field1, field2){
  $(field1).val("");
  $(field2).val("");
}



module.exports = Form;
