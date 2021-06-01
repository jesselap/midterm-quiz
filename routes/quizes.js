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
    const queryContent =
    `
      SELECT quizes.id, title, created_at, public, categories.type as category
      FROM quizes
      JOIN categories ON quizes.category_id = categories.id;
    `
    db.query(queryContent)
     .then(data => {
      console.log(data.rows)
      // res.json(data.rows)
      // const templateVars = {data: data.rows}
      // res.render('quizes', templateVars)
      res.json(data.rows)
    })
     .catch(err => res.json(err))
  });

  router.get("/new", (req, res) => {
    if(!req.session.user_id){
      res.redirect('/')
    }
    const queryContent = `SELECT * FROM categories;`
    db.query(queryContent)
      .then(data => {
        const templateVars = {categories: data.rows, user: req.session.user_id}
        res.render('create_quiz', templateVars)
      })
  });
  router.get("/:id", (req, res) => {
    const queryContent =
    `
      SELECT * FROM quizes
      WHERE id = ${req.params.id};
    `
    db.query(queryContent)
      .then(data => res.json(data.rows))
      .catch(err => res.json(err))
  });

  router.post("/", (req, res) => {
    const owner_id = req.session.user_id;
    const {category_id, title} = req.body
    const public = req.body.public ? true : false;
    const insertIntoQuizes =
    `
      INSERT INTO quizes(owner_id, category_id, title, public)
      VALUES($1, $2, $3, $4)
      returning *;
    `;
    db.query(insertIntoQuizes, [owner_id, category_id, title, public])
    .then(data => {
      const quiz_id = data.rows[0].id;
      const {questions, answers, optionA, optionB, optionC} = req.body ;
      // console.log("quiz_id: ", quiz_id)
      const insertIntoQuestions =
      `INSERT INTO questions(quiz_id, question, answer, choice_a, choice_b, choice_c)
       VALUES($1, $2, $3, $4, $5, $6)
      `
      for(let i = 0; i < questions.length; i++) {
        db.query(insertIntoQuestions, [quiz_id, questions[i], answers[i], optionA[i], optionB[i], optionC[i]])
      }
    }).then(data => {
      res.redirect('/')
    }).catch(err => {
      console.log(err)
    })
  });
  return router;
};
