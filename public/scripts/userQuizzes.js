$(() => {
  $(".shareLink").hide();
  $(".card-img-overlay").on("click", function(event) {
    if (event.target !== this) {
      return;
    }
    window.location.href = $(this).parent().attr("url");
  })
  $(".delete").on("click", function() {
    const quizid = $(this).attr("quiz-id");
    $.ajax({
      url: `/users/quizzes/${quizid}`,
      type: 'DELETE',
    })
    location.reload()
  })

  $(".share").on("click", function() {
      /* Get the text field */
      var copyText = document.getElementById(`linkField${$(this).attr("id")}`);

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");

      /* Alert the copied text */
      $(this).text("Copied!");
  })
  $(".card-img-overlay").animate({opacity: 0}, 1);
  $(".card").hover(function() { $(this).find(".card-img-overlay").animate({opacity: 1}, 250)}, function() {$(this).find(".card-img-overlay").animate({opacity: 0}, 250)});
})
