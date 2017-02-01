function Saver() {

}

Saver.prototype.setLocalStorage = function(key, newKey, name, calories, type){
  var array = JSON.parse(localStorage.getItem(type))
  array.forEach(function(object) {
    if (object.name === name && object.calories === calories) {
      object[key] = newKey;
    }
    arrayJSON = JSON.stringify(array);
    localStorage.setItem(type, arrayJSON);
    })
}

module.exports = Saver;
