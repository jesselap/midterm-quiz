const createElement = function (quizObj) {
  const score = quizObj.avg_score;
  const scoreStr = `${quizObj.avg_score}%`
  const quizHTML =
    `<div class="card bg-dark text-white col-md-4">
    <a href="/quizes/${quizObj.id}">
    <img
      src=${quizObj.image_url}
      class="card-img" alt="..."></a>
    <div class="overlay">
      <div class="header">
        <span>${quizObj.category}</span>
        <span class=${score === '0' ? 'new-quiz': 'avg-score'}>${score=== '0' ? 'NEW' : scoreStr}</span>
      </div>
      <p class="card-text">${quizObj.title}</p>
    </div>
  </div>`
  return quizHTML
}

// quizObj.avg_score === 0 ? 'btn-danger': 'avg-score'
const renderQuiz = function (quizes) {
  for (const item of quizes) {
    const quizElement = createElement(item)
    $('.quizes-container').append(quizElement)
  }
}

$(document).ready(function () {
  console.log('Jquery Working');
  $('.card').on('click', function () {
    console.log('clicked')
  })
  $.get('/quizes', function (data) {
    console.log(data)
    renderQuiz(data)
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
