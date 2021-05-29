// All routes related to quizes

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    const queryContent = `SELECT * FROM quizes;`
    db.query(queryContent).then(data => res.json(data.rows))
      .catch(err => res.json(err))
  });
  router.get("/create", (req, res) => {
    res.render('create_quiz')
  });
  return router;
};
