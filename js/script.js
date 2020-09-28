$(document).ready(function(){

// ******CREATE******
// Evento al click su "send"
$("header").on("click", "#send", function(){
  var value = $("header input").val();
  if(value != "") {
    addEl(value);
    $(".input-container").addClass("d-none");
    $("header input").val("");
  }
});
// Evento all'invio
$("header").keyup("header input", function(e){
  if(e.which == 13) {
    var value = $("header input").val();
    if(value != "") {
      addEl(value);
      $(".input-container").addClass("d-none");
      $("header input").val("");
    }
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
    },
    "error": function(error) {
      alert("Post error!");
    }
  });
}


// ******READ******
// Chiamata ajax GET, prende gli elementi e li stampa in HTML
$.ajax({
  "url": "http://157.230.17.132:3010/todos",
  "method": "GET",
  "success": function(data) {
    printEl(data);
  },
  "error": function(error) {
    alert("Get error!");
  }
});

// Funzione che, preso un array, ne stampa ogni "text" nel template
function printEl(genericArray) {
  for(var i = 0; i < genericArray.length; i++) {
    var source = $("#insert-templ").html();
    var template = Handlebars.compile(source);
    var context = {
      "text": genericArray[i].text,
      "arrayId": genericArray[i].id
    };
    var html = template(context);
    $("#todo-list").append(html);
  }
}


// ******UPDATE******
// Evento al click sull'icona .fa-edit
// $("#todo-list").on("click", ".fa-edit", function(){
//   $(this).siblings("input").toggleClass("d-none");
// });

// Evento all'invio nel "input.edit"
$("#todo-list").on("keyup", "input.edit", function(e){
  if(e.which == 13) {
    var value = $(this).val();
    if(value != "") {
      var idListItem = $(this).parents(".task").attr("id");
      updateEl(idListItem, value);
      $(this).val("");
      $(this).addClass("invisible");
      $(this).siblings(".ok").addClass("invisible");
    }
  }
});

// Evento al click su "Ok"
$("#todo-list").on("click", ".ok", function(){
  var value = $(this).siblings("input.edit").val();
  if(value != "") {
    var idListItem = $(this).parents(".task").attr("id");
    updateEl(idListItem, value);
    $(this).siblings("input.edit").val("");
    $(this).siblings("input.edit").addClass("invisible");
    $(this).addClass("invisible");
  }
});


// Funzione che esegue chiamata ajax PUT prendendo un id e modificando il "text"
function updateEl(idEl, input) {
  $.ajax({
    "url": "http://157.230.17.132:3010/todos/"+idEl,
    "method": "PUT",
    "data": {
      "text": input
    },
    "success": function(data){
      $("#"+idEl+" p").text(input);
    },
    "error": function(error){
      alert("Put error");
    },

  });
}


// ******DELETE******
// Evento al click su un'icona .delete
$("#todo-list").on("click", ".delete", function(){
  var idListItem = $(this).parents(".task").attr("id");
  deleteEl(idListItem);
});

// Funzione che esegue chiamata ajax DELETE prendendo un id
function deleteEl(idEl) {
  $.ajax({
    "url": "http://157.230.17.132:3010/todos/"+idEl,
    "method": "DELETE",
    "success": function() {
      $("#todo-list li#"+idEl).remove();
    },
    "error": function(error) {
      alert("Delete error!");
    }
  });
}



// ***Altro***
// Al click sul "+" appare la barra di input per inserire una nuova task
$(".add").click(function(){
  $(".input-container").toggleClass("d-none");
});

// Al click su ".fa-edit" appare la barra di input per modificare la task
$("#todo-list").on("click", ".fa-edit", function(){
  $(this).siblings(".edit, .ok").toggleClass("invisible");
});



});
