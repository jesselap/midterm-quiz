// Routes for a user's played quiz history
// /users/:id/activity GET (all quizes created by a user)

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/activity", (req, res) => {
    const queryParams = [Number(req.session.user_id)];
    const queryContent = `SELECT quizes.id, title, created_at, categories.type as category, score
                          FROM attempts
                          JOIN quizes ON attempts.quiz_id = quizes.id
                          JOIN categories ON quizes.category_id = categories.id
                          WHERE attempts.user_id = $1`;
    db.query(queryContent, queryParams)
    .then(data => {
      if (!req.session.user_id) {
        const templateVars = {activities: data.rows, user: null}
        res.render("quizactivity", templateVars);
      } else {
        const templateVars = {activities: data.rows, user: req.session.user_id}
        res.render("quizactivity", templateVars);
      }})
    .catch(err => {
      res.render("quizactivity", {user: null})
    })
  });
  return router;
};
