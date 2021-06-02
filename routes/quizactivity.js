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
        db.query(`SELECT *
                  FROM users
                  WHERE id = $1;`, [req.session.user_id])
          .then(userData => {
            const templateVars = {activities: data.rows, user: userData.rows[0]}
            res.render("quizactivity", templateVars);
          })
          .catch(err => {
            res.render("quizactivity", {user: null})
          })
      }})
    .catch(err => {
      res.render("quizactivity", {user: null})
    })
  });
  //route for testing error pages - /users/errortest
  router.get("/errortest", (req, res) => {
    if (!req.session.user_id) {
      const templateVars = {user: null}
      res.render("404", templateVars);
    } else {
      const templateVars = {user: req.session.user_id}
      res.render("404", templateVars);
    }
  })
  return router;
};
