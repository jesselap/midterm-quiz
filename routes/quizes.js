// All routes related to quizes
// possible routes

// /quizes GET (all quizes in a list or box 4/3 in a row)
// /quizes/new GET (Show form to make new Quiz)
// Quizes POST (Insert new quiz to the database)
// Quizes/:id GET (show specific quiz)


const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const queryContent = `SELECT quizes.id, title, created_at, public, categories.type as category
                          FROM quizes
                          JOIN categories ON quizes.category_id = categories.id;
    `
    db.query(queryContent).then(data => {
      console.log(data.rows)
      // res.json(data.rows)
      // const templateVars = {data: data.rows}
      // res.render('quizes', templateVars)
      res.json(data.rows)
    })
      .catch(err => res.json(err))
  });

  router.get("/new", (req, res) => {
    res.render('create_quiz')
    res.send("Hello")
  });
  router.get("/:id", (req, res) => {
    const queryContent = `
                          SELECT * FROM quizes
                          WHERE id = ${req.params.id};
                         `;
    db.query(queryContent)
      .then(data => res.json(data.rows))
      .catch(err => res.json(err))
  });

  router.post("/", (req, res) => {
    res.send("POST METHOD")
  });
  return router;
};
