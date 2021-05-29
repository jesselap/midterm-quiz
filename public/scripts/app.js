$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

$(function() {
  $("#moreQuestions").click(function(e) {
    e.preventDefault();
    $("#fieldList").append("<label for='question'>Your Question:</label>");
    $("#fieldList").append("<li><input type='text'/></li>");
    $("#fieldList").append("<label for='answer'>The Answer:</label>");
    $("#fieldList").append("<li><input type='text'/></li>");
    $("#fieldList").append("<label for='option-a'>Option A:</label>");
    $("#fieldList").append("<li><input type='text'/></li>");
    $("#fieldList").append("<label for='option-a'>Option B:</label>");
    $("#fieldList").append("<li><input type='text'/></li>");
    $("#fieldList").append("<label for='option-a'>Option C:</label>");
    $("#fieldList").append("<li><input type='text'/></li>");
  });
});
