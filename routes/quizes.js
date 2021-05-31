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
    const queryContent = `
                          SELECT * FROM quizes
                          WHERE id = ${req.params.id};
                         `;
    db.query(queryContent)
      .then(data => res.json(data.rows))
      .catch(err => res.json(err))
  });


  // CREATE TABLE quizes (
  //   id SERIAL PRIMARY KEY NOT NULL,
  //   owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  //   category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  //   title VARCHAR(255) NOT NULL,
  //   created_at TIMESTAMP,
  //   public BOOLEAN NOT NULL DEFAULT TRUE
  // );
  router.post("/", (req, res) => {
    const owner_id = req.session.user_id;
    const created_at = Date.now();
    const {category_id, title} = req.body
    const public = req.body.public ? true : false;
    console.log(owner_id, created_at)
    const queryContent = `
                          INSERT INTO quizes
                          VALUES(owner_id, category_id, title)
                         `
    res.send(req.body)
  });
  return router;
};
