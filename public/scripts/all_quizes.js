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
    $('.quizes-container').fadeIn().append(quizElement)
  }
}

const filterQuizes = function(category) {
  $('.quizes-container').fadeOut(500).empty();
  // $('.quizes-container').fadeOut();
  $.get('/quizes/filteredQuizes', {type: category}, function (data) {
    renderQuiz(data)
  });
}

$(document).ready(function () {
  const science = $('.science');
  filterQuizes('');
  $('.science').click(()=> {
    filterQuizes('Science');
  })
  $('.geography').click(()=> {
    filterQuizes('Geography');
  })
  $('.space').click(()=> {
    filterQuizes('Space');
  })
  $('.history').click(()=> {
    filterQuizes('History');
  })

});
