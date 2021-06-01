// Routes for a user's played quiz history
// /users/:id/activity GET (all quizes created by a user)

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/:id/activity", (req, res) => {
    const queryParams = [req.params.id];
    const queryContent = `SELECT * FROM attempts
                          FROM attempts
                          WHERE attempts.user_id = $1`
    db.query(queryContent, queryParams)
    .then(data => {
      console.log(data.rows)
      res.json(data.rows)
    })
      .catch(err => res.json(err))
  });
  return router;
};
