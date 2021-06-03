const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const queryStr = `SELECT attempts.score as score, users.name as name, quizes.title as quiz
    FROM attempts
    JOIN users ON user_id = users.id
    JOIN quizes ON attempts.quiz_id = quizes.id
    ORDER BY score DESC, name
    LIMIT 5;`;
    db.query(queryStr)
      .then(data => {
        res.json(data.rows)
      })
      .catch(err => res.json(err))
  });



  return router;
};
