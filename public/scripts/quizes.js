const createElement = function (quizObj) {
  const score = quizObj.avg_score;
  const scoreStr = `${quizObj.avg_score}%`
  const quizHTML =
    `<div class="card bg-dark text-white col-md-4">
      <a href="/quizes/${quizObj.id}">
        <img
          src=${quizObj.image_url}
          class="card-img" alt="...">
      </a>
      <div class = 'card-more-info'>
        <span>Total Questions: ${quizObj.total_questions}</span>
        <span>Total Attempts: ${quizObj.total_attempts}</span>
        <span>Average Score: ${score === null ? 'New' : scoreStr}</span>
      </div>
      <div class="overlay">
        <div class="header">
        <span>${quizObj.category}</span>
        <span class=${score === null ? 'new-quiz': 'avg-score'}>${score=== null ? 'NEW' : scoreStr}</span>
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
    $('.quizes-container').append(quizElement).fadeIn(400);
  }
}

const filterQuizes = function(filterBy) {
  $('.quizes-container').fadeOut(400).empty();
  $('#quiz-type').text(filterBy)
  $.get('/quizes/getAllQuizes',{filterBy}, function (data) {
    console.log(data)
    renderQuiz(data)
  });
}

$(document).ready(function () {
  console.log('Jquery Working');
  $('.card').on('click', function () {
    console.log('clicked')
  })
  $('.random').click(()=> filterQuizes('random'))
  $('.popular').click(()=> filterQuizes('popular'))
  $('.latest').click(()=> filterQuizes('latest'))
  filterQuizes();
});

