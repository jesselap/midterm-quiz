const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // register user
  router.get('/register', (req, res) => {
    let templateVars = {
      user: null
    }
    res.render('../views/register', templateVars);
  });

  router.post('/register', (req, res) => {
    const { name, email, password } = req.body
    db.query(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id;
    `, [name, email, password])
      .then((data) => {
        req.sessions.user_id = data.rows[0];
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
};

