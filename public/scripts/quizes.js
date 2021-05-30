
$( document ).ready(function() {
  console.log('Jquery Working');
  console.log($);
  $('.card').on('click', function() {
    console.log('clicked')
  })
  $.get('/quizes', function (data) {
    console.log("Inside get")
    console.log(data)
  });
});
