const createBoard = function (leaderObj) {
  const score = leaderObj.score;
  const name = leaderObj.name
  const quiz = leaderObj.quiz;
  const leaderHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${name} <span style="background-color:transparent;">${quiz}</span>
      <span id="leaderboard" class="badge badge-pill badge-danger">${score}</span>
    </li>
  `;
  return leaderHTML;
}

const renderLeaders = function (leaders) {
  for (let item of leaders) {
    const leaderElement = createBoard(item)
    $('.list-group').append(leaderElement)
  }
}

$(document).ready(function (data) {
  $.get('/leaderboard', function (data) {
    renderLeaders(data)
  });
});
