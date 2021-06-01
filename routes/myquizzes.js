// Routes for a user's created quizzes
// /users/:id/myquizzes GET (all quizes created by a user)

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/quizzes", (req, res) => {
    const queryParams = [Number(req.session.user_id)];
    const queryContent = `SELECT quizes.id, title, created_at, categories.type as category, users.id as creator
                          FROM quizes
                          JOIN categories ON quizes.category_id = categories.id
                          JOIN users ON quizes.owner_id = users.id
                          WHERE users.id = $1`
    db.query(queryContent, queryParams)
    .then(data => {
        db.query(`SELECT *
        FROM users
        WHERE id = $1;`, [req.session.user_id])
          .then(data => {
            const templateVars = {quizzes: data.rows, user: data.rows[0]}
            res.render("myquizzes", templateVars);
          })
        .catch(err => {
          res.status(500).json({ error: err.message });
        })
    })
    .catch(err => {
      res.render("myquizzes", {user: null})
    })
  });
  return router;
};
