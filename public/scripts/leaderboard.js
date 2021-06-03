const createBoard = function (leaderObj) {
  console.log('line 2 ----------- ', leaderObj);
  const score = Math.round(leaderObj.score);
  const name = leaderObj.name
  const leaderHTML = `
    <li class="bg-light list-group-item d-flex justify-content-between align-items-center" style="border: none; color:#276678;" >
      ${name}
      <span id="leaderboard" class="badge badge-pill badge-danger">Average Score: ${score}</span>
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
