function Table() {

}

Table.prototype.filterItems = function(table, input){
    var input, filter, table, tr, td, i, j;
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

module.exports = Table;
