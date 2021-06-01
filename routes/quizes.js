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
  router.get("/:quiz_id", (req, res) => {
    const queryContent = `
                          SELECT quizes.*, text, choice_a, choice_b, choice_c, answer as choice_d, users.*, questions.id as question_id
                          FROM quizes
                          JOIN questions ON quizes.id = quiz_id
                          JOIN users ON users.id = quizes.owner_id
                          WHERE quizes.id = $1
                          AND users.id = quizes.owner_id;
                         `;
    db.query(queryContent, [req.params.quiz_id])
      .then((data) => {
        let templateVars = {
          user: data.rows[0],
          data: data.rows
        };
        res.render('quiz_play', templateVars)
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    res.send("POST METHOD")
  });



  // individual quiz page

  router.post("/result", (req, res) => {

    const keys = Object.keys(req.body)
    let counter = 0;
    const queryStr = `SELECT quizes.*, users.*, questions.answer as answer, questions.id as question_id
    FROM quizes
    JOIN questions ON quiz_id = quizes.id
    JOIN users ON quizes.owner_id = users.id
    WHERE quizes.id = (SELECT quiz_id
    FROM questions
    WHERE questions.id = $1)`;

    db.query(queryStr, [keys[0]]  )
      .then((data) => {
        for (let i = 0; i < data.rows.length; i++) {
          let questId = data.rows[i].question_id;
          if (data.rows[i].answer === req.body[questId]) {
            counter++;
          }
        }
        let result = (counter / keys.length) * 100
        let user = {
          id: data.rows[0].owner_id,
          name: data.rows[0].name,
          email: data.rows[0].email,
          password: data.rows[0].password,
        }
        let score = Math.round(result)
        let templateVars = {
          user,
          score
        };
        console.log(templateVars.user)

        res.render('result', templateVars);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });




  return router;
};
