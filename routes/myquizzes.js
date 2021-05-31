// Routes for a user's created quizzes
// /users/:id GET (all quizes created by a user)

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/users/:id/myquizzes", (req, res) => {
    const queryParams = [req.params.id];
    const queryContent = `SELECT quizes.id, title, created_at, categories.type as category, users.id as creator
                          FROM quizes
                          JOIN categories ON quizes.category_id = categories.id
                          JOIN users ON quizes.owner_id = users.id
                          WHERE creator = $1`
    db.query(queryContent, queryParams)
    .then(data => {
      console.log(data.rows)
      res.json(data.rows)
    })
      .catch(err => res.json(err))
  });
  return router;
};
