const createQuizHTML = function(no) {
  const quizHTML =
  `
    <div class="col-12">
    <label for="question1">Question No: ${no}</label>
    <input type="text" class="form-control" id="question1" name="questions[${no}]" placeholder="Question No: ${no}" required>
    </div>
    <div class="col-md-6">
    <label for="answer">Your Answer</label>
    <input type="text" class="form-control" id="answer" name="answers[${no}]" placeholder="Your Answer" required>
    </div>
    <div class="col-md-6">
    <label for="optionA">Option A</label>
    <input type="text" class="form-control" id="optionA" name="optionA[${no}]" placeholder="Option A" required>
    </div>
    <div class="col-md-6">
    <label for="optionA">Option B</label>
    <input type="text" class="form-control" id="optionB" name="optionB[${no}]" placeholder="Option B" required>
    </div>
    <div class="col-md-6">
    <label for="optionA">Option C</label>
    <input type="text" class="form-control" id="optionC" name="optionC[${no}]" placeholder="Option C" required>
    <br>
    <br>
    </div>
  `
  return quizHTML;
}

const renderQuestion = function(count) {
  for(let i = 1; i <= count; i++) {
    createQuizHTML(i);
    const newQuestion = createQuizHTML(i);
    $('#questions-container').append(newQuestion);
  }
}

$(document).ready(function () {
  renderQuestion(5);
  renderQuestion(this.value);
  $('#questionCount').change(function () {
    $('#questions-container div').remove();
    renderQuestion(this.value)
  })
})
