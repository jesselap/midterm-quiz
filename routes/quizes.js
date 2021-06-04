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
    fetchUser(req)
      .then(data => {
        let templateVars = { user: data.rows[0] };
        res.render('quizes', templateVars)
      })
  })

  router.get("/getAllQuizes", (req, res) => {
    console.log(req.query.filterBy)
    let filterStr = `RANDOM()`;
    if (req.query.filterBy === 'popular') {
      filterStr = 'total_attempts';
    } else if (req.query.filterBy === 'latest') {
      filterStr = 'created_at';
    }
    const queryContent =
      ` SELECT quizes.id, title, image_url, created_at, public, categories.type as category, ROUND(AVG(score))as avg_score, COUNT(attempts.*) as total_attempts,
        (SELECT COUNT(*) FROM questions WHERE questions.quiz_id = quizes.id) as total_questions
        FROM quizes
        LEFT JOIN attempts ON quizes.id = attempts.quiz_id
        JOIN categories ON quizes.category_id = categories.id
        WHERE quizes.public = true
        GROUP BY quizes.id, categories.type
        ORDER BY ${filterStr} DESC
        LIMIT 12;
      `
    db.query(queryContent)
      .then(data => {
        res.json(data.rows)
      })
      .catch(err => res.json(err))
  });

  router.get('/filteredQuizes', (req, res) => {
    const type = req.query.type;
    const queryContent =
      `
      SELECT quizes.id, title, image_url, created_at, public, categories.type as category, ROUND(AVG(score))as avg_score, COUNT(attempts.*) as total_attempts,
      (SELECT COUNT(*) FROM questions WHERE questions.quiz_id = quizes.id) as total_questions
      FROM quizes
      LEFT JOIN attempts ON quizes.id = attempts.quiz_id
      JOIN categories ON quizes.category_id = categories.id
      WHERE public  = true AND
      categories.type LIKE '%${type}%'
      GROUP BY quizes.id, categories.type;
    `
    db.query(queryContent)
      .then(data => {
        res.json(data.rows)
      })
      .catch(err => res.json(err))
  })

  router.get("/new", (req, res) => {
    if (!req.session.user_id) {
      res.redirect('/login')
    }
    const fetchCategories = db.query(`SELECT * FROM categories;`)
      .catch(err => res.json(err))
    Promise.all([fetchCategories, fetchUser(req)])
      .then(data => {
        const templateVars = { categories: data[0].rows, user: data[1].rows[0] }
        res.render('create_quiz', templateVars)
      })
  });


  router.post("/", (req, res) => {
    // Getting the necessary data for insert into quizes table
    const owner_id = req.session.user_id;
    const { category_id, title, image_url } = req.body
    const public = req.body.public ? false : true;
    const insertIntoQuizes =
      `
      INSERT INTO quizes(owner_id, category_id, image_url, title, public)
      VALUES($1, $2, $3, $4, $5)
      returning *;
    `;
    //Making the actual insertion of quiz into the quizes table.
    db.query(insertIntoQuizes, [owner_id, category_id, image_url, title, public])
      .then(data => {
        // Once Quiz is added to the db, getting the rest of the for inserting the question into the questions table
        const quiz_id = data.rows[0].id;
        const { questions, answers, optionA, optionB, optionC } = req.body;
        const insertIntoQuestions =
          `INSERT INTO questions(quiz_id, question, answer, choice_a, choice_b, choice_c)
       VALUES($1, $2, $3, $4, $5, $6)
      `
        //Since we have to multiple insertion, using promiseAll
        return Promise.all(questions.map((question, index) =>
          db.query(insertIntoQuestions, [quiz_id, question, answers[index], optionA[index], optionB[index], optionC[index]])))
      }).then(data => {
        res.redirect('/')
      }).catch(err => {
        res.json(err)
      })
  });


  // random quiz
  router.post('/random', (req, res) => {

    const fetchRandom =
      db.query(`SELECT quizes.*, questions.question as question, choice_a, choice_b, choice_c, answer as choice_d, users.*, questions.id as question_id
      FROM quizes
      JOIN questions ON quizes.id = quiz_id
      JOIN users ON users.id = quizes.owner_id
      WHERE quizes.id = (SELECT id
        FROM quizes
        WHERE public = true
        ORDER BY random()
        LIMIT 1)
      AND users.id = quizes.owner_id;
    `).catch(err => {
        res.json(err)
      })
    Promise.all([fetchRandom, fetchUser(req)])
      .then(data => {
        let templateVars = {
          data: data[0].rows,
          user: data[1].rows[0]
        }
        res.render('quiz_play', templateVars)
      }).catch(err => {
        res.json(err)
      })
  })


  // individual quiz page
  router.get("/:quiz_id", (req, res) => {
    fetchUser(req)
      .then(data => {
        let templateVars = {
          user: data.rows[0]
        };
        const queryContent =
          `
        SELECT quizes.*, questions.question as question, choice_a, choice_b, choice_c, answer as choice_d, users.*, questions.id as question_id
        FROM quizes
        JOIN questions ON quizes.id = quiz_id
        JOIN users ON users.id = quizes.owner_id
        WHERE quizes.id = $1
        AND users.id = quizes.owner_id;
        `;
        db.query(queryContent, [req.params.quiz_id])
          .then((quizData) => {
            if (!quizData.rows[0]) {
              res.render('404', templateVars);
              return;
            }
            if (!quizData.rows[0].public) {
              res.redirect('/')
              return;
            }
            templateVars.data = quizData.rows;
            res.render('quiz_play', templateVars)
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: err.message });
          });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  });

  // individual quiz page (answer submission)

  router.post("/result", (req, res) => {
    console.log('line 120 --------', req.body)
    const keys = Object.keys(req.body)
    let counter = 0;
    const queryStr = `SELECT quizes.*, questions.answer as answer, questions.id as question_id
    FROM quizes
    JOIN questions ON quiz_id = quizes.id
    WHERE quizes.id = (SELECT quiz_id
    FROM questions
    WHERE questions.id = $1)`;

    db.query(queryStr, [keys[0]])
      .then((data) => {
        for (let i = 0; i < data.rows.length; i++) {
          let questId = data.rows[i].question_id;
          console.log("i---",i, 'answer----', data.rows[i].answer, '----', req.body[questId])
          if (data.rows[i].answer === req.body[questId]) {
            counter++;
          }
        }
        const score = Math.round((counter / keys.length) * 100);
        const totalQuestion = keys.length;
        const correctAnswer = counter;
        const result = { score, totalQuestion, correctAnswer };
        let reqSessionUserId = req.session.user_id
        if (!req.session.user_id) {
          // quiz saved to default user to log attempt
          reqSessionUserId = 1;
        }
        db.query(`
          INSERT INTO attempts (user_id, quiz_id, score)
          VALUES ($1, $2, $3)
          RETURNING user_id, quiz_id;
        `, [reqSessionUserId, data.rows[0].id, result.score])
          .then(data => {
            const quizId = data.rows[0].quiz_id;
            //Geting attempts Data, using a nested select queries to get the average score for quize.
            const getUsersAttemptsData =
              db.query(`SELECT user_id, MAX(score) as highest_score, COUNT(score) as total_attempts, (SELECT ROUND(AVG(score))
            FROM attempts
            WHERE quiz_id = ${quizId}) as Avg_score_all_users
            FROM attempts
            WHERE quiz_id = ${quizId} AND user_id = ${reqSessionUserId}
            GROUP BY user_id;`).catch(err => { throw `error fetching attempts data` });

            //Using the category id in getting similar quizes from the quizes table
            const getSimilarQuizes =
              db.query(`SELECT quizes.id, title,image_url, created_at, public, categories.type as category
              FROM quizes
              JOIN categories ON quizes.category_id = categories.id
              WHERE category_id = (SELECT category_id FROM quizes WHERE id= ${quizId})`).catch(err => { throw `error fetching similar quizes` });

            Promise.all([getUsersAttemptsData, getSimilarQuizes, fetchUser(req)])
              .then(data => {
                // Sending back result, which contain user score, no of questions and no of correct answer
                // attemptInos, contains all information coming from attemps table, like max sscore, avg score of all users, etc
                // quizes, which is an array of similar quizes
                // user, which is user information needed for showing user name in the nav
                // quizId needed for implementing retake this quiz link
                const templateVars = { result, attemptInfos: data[0].rows[0], quizes: data[1].rows, user: data[2].rows[0], quizId }
                res.render('quiz_result', templateVars)
              }).catch(err => res.json(err));
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: err.message });
          });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Helper function to get user data using cookie
  const fetchUser = (req) => {
    return db.query(`SELECT *
    FROM users
    WHERE id = $1;`, [req.session.user_id])
      .catch(err => { throw `error fetching user information` })
  }
  return router;
};
