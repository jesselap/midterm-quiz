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
  router.get("/:quiz_id", (req, res) => {
    const queryContent = `
                          SELECT quizes.*, question , choice_a, choice_b, choice_c, answer as choice_d, users.*, questions.id as question_id
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
      // for(let i = 0; i < questions.length; i++) {
      //   db.query(insertIntoQuestions, [quiz_id, questions[i], answers[i], optionA[i], optionB[i], optionC[i]])
      // }
      return Promise.all(questions.map((question, index)=>
      db.query(insertIntoQuestions, [quiz_id, question, answers[index], optionA[index], optionB[index], optionC[index]])))
    }).then(data => {
      res.redirect('/')
    }).catch(err => {
      console.log("error----line 82", err)
    })
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
