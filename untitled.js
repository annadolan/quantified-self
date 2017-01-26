$('.trash').on('click', function(e) {
  e.preventDefault();
  var name = $('#foods-table tr:nth-child(2)').children().first().html()
  var foods = JSON.parse(localStorage.getItem('foods'))

  foods.forEach(function(object) {
    if (object.name == name) {
      foods.splice(foods.indexOf(object), 1);
    }
    foodsJSON = JSON.stringify(foods);
    localStorage.setItem('foods', foodsJSON);
  })
  $(this).parent().parent().remove();
});
