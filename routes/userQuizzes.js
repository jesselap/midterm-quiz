// Routes for a user's created quizzes
// /users/:id/myquizzes GET (all quizes created by a user)

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/quizzes", (req, res) => {
    const queryParams = [Number(req.session.user_id)];
    const queryContent = `SELECT quizes.id, title, created_at, categories.type as category, users.id as creator, quizes.image_url as image
                          FROM quizes
                          JOIN categories ON quizes.category_id = categories.id
                          JOIN users ON quizes.owner_id = users.id
                          WHERE users.id = $1`
      db.query(queryContent, queryParams)
      .then(data => {
        if (!req.session.user_id) {
          const templateVars = {quizzes: data.rows, user: null}
          res.render("userQuizzes", templateVars);
        } else {
          db.query(`SELECT *
                    FROM users
                    WHERE id = $1;`, [req.session.user_id])
            .then(userData => {
              const templateVars = {quizzes: data.rows, user: userData.rows[0]}
              res.render("userQuizzes", templateVars);
            })
            .catch(err => {
              res.render("userQuizzes", {user: null})
            })
        }})
      .catch(err => {
        res.render("userQuizzes", {user: null})
      })
    });
    return router;
  };
