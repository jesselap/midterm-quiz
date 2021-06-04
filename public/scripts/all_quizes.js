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

const renderQuiz = function (quizes) {
  for (const item of quizes) {
    const quizElement = createElement(item)
    $('.quizes-container').append(quizElement).fadeIn(200)
  }
}

const filterQuizes = function(category) {
  $('.quizes-container').fadeOut(200).empty();
  $('#quiz-category').text(category)
  // $('.quizes-container').fadeOut();
  $.get('/quizes/filteredQuizes', {type: category}, function (data) {
    renderQuiz(data)
  });
}

$(document).ready(function () {
  // const science = $('.science');
  filterQuizes('');
  $('#quiz-category').text("All")
  $('.all').click(()=> filterQuizes(''));
  $('.science').click(()=> filterQuizes('Computer Science'));
  $('.space').click(()=> filterQuizes('Space'));
  $('.geography').click(()=> filterQuizes('Geography'));
  $('.biology').click(()=>filterQuizes('Biology'));
  $('.sports').click(()=>filterQuizes('Sports'));
  $('.culture').click(()=>filterQuizes('Popular Culture'));
  $('.music').click(()=>filterQuizes('Music'));
  $('.history').click(()=>filterQuizes('History'));
  $('.art').click(()=>filterQuizes('Art'));
  $('.misc').click(()=>filterQuizes('Miscellaneous'));

});
