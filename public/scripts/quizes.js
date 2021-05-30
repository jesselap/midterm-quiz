const createElement = (quiz) => {
  const quiz =
  `<div class="card bg-dark text-white col-md-4">
    <img
      src="https://i.guim.co.uk/img/media/5cbce71c025dd78ca31d03111bd2ee4453a7029e/0_167_2400_1440/master/2400.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=b44c9a27a5b38c0388b092e5b0291c32"
      class="card-img" alt="...">
    <div class="overlay">
      <span>${quiz.category}</span>
      <p class="card-text">${quiz.title}</p>
    </div>
  </div>`
}

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



// <div class="card bg-dark text-white col-md-4">
// <img
//   src="https://i.guim.co.uk/img/media/5cbce71c025dd78ca31d03111bd2ee4453a7029e/0_167_2400_1440/master/2400.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=b44c9a27a5b38c0388b092e5b0291c32"
//   class="card-img" alt="...">
// <div class="overlay">
//   <span>Science</span>
//   <p class="card-text">How much do you know about Mars</p>
// </div>
// </div>
