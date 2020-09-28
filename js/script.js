$(document).ready(function(){

// Chiamata ajax GET, prende gli elementi e li stampa in HTML
$.ajax({
  "url": "http://157.230.17.132:3010/todos",
  "method": "GET",
  "success": function(data) {
    printEl(data);
  },
  "error": function(error) {
    alert("Error!");
  }
});

// Funzione che, preso un array, ne stampa ogni "text" nel template
function printEl(genericArray) {
  for(var i = 0; i < genericArray.length; i++) {
    var source = $("#insert-templ").html();
    var template = Handlebars.compile(source);
    var context = {
      "text": genericArray[i].text
      };
    var html = template(context);
    $("#todo-list").append(html);
  }
}

// Evento al click su "send"
$("header").on("click", "#send", function(){
  var value = $("header input").val();
  if(value != "") {
    addEl(value);
  }
  $("header input").val("");
});
// Evento all'invio
$("header").keyup("header input", function(e){
  if(e.which == 13) {
    var value = $("header input").val();
    if(value != "") {
      addEl(value);
    }
    $("header input").val("");
  }
});

// Funzione che esegue chiamata ajax POST prendendo una stringa input
function addEl(input) {
  $.ajax({
    "url": "http://157.230.17.132:3010/todos",
    "data": {
      "text": input
    },
    "method": "POST",
    "success": function(data) {
      printEl([data]);
    }
  });
}



});
