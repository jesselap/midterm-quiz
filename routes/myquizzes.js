// All routes related to quizes
// possible routes

// /quizes GET (all quizes in a list or box 4/3 in a row)
// /quizes/new GET (Show form to make new Quiz)
// Quizes POST (Insert new quiz to the database)
// Quizes/:id GET (show specific quiz)


const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/users/:id", (req, res) => {
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

  router.post("/", (req, res) => {
    res.send("POST METHOD")
  });
  return router;
};
