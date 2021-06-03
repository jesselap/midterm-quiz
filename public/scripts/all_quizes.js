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
    $('.quizes-container').append(quizElement).fadeIn(200)
  }
}

const filterQuizes = function(category) {
  $('.quizes-container').fadeOut(200).empty();
  // $('.quizes-container').fadeOut();
  $.get('/quizes/filteredQuizes', {type: category}, function (data) {
    renderQuiz(data)
  });
}

$(document).ready(function () {
  // const science = $('.science');
  filterQuizes('');
  $('.science').click(()=> {
    filterQuizes('Science');
  })
  $('.space').click(()=> {
    filterQuizes('Space');
  })
  $('.geography').click(()=> {
    filterQuizes('Geography');
  })
  $('.biology').click(()=> {
    filterQuizes('Biology');
  })
  $('.sports').click(()=> {
    filterQuizes('Sports');
  })
  $('.culture').click(()=> {
    filterQuizes('Popular Culture');
  })
  $('.music').click(()=> {
    filterQuizes('Music');
  })
  $('.history').click(()=> {
    filterQuizes('History');
  })
  $('.art').click(()=> {
    filterQuizes('Art');
  })
  $('.misc').click(()=> {
    filterQuizes('Miscellaneous');
  })

});
{/* <button class="science btn btn-success">Computer Science</button>
<button class="geography btn btn-danger">Geography</button>
<button class="space btn btn-info">Space</button>
<button class="biology btn btn-primary">Biology</button>
<button class="sports btn btn-warning">Sports</button>
<button class="culture btn btn-dark">Popular Culture</button>
<button class="music btn btn-success">Music</button>
<button class="history btn btn-warning">History</button>
<button class="art btn btn-danger">Art</button>
<button class="misc btn btn-info">Miscellaneous</button> */}
