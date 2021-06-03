$(() => {
  $(".card-img-overlay").animate({opacity: 0}, 1);
  $(".card").hover(function() { $(this).find(".card-img-overlay").animate({opacity: 1}, 250)}, function() {$(this).find(".card-img-overlay").animate({opacity: 0}, 250)});
}
)
