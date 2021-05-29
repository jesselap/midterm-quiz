const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // login
  router.get('/login', (req, res) => {
    if (!req.session.user_id) {
      let templatevars = {
        user: null
      }
      res.render('../views/login', templateVars);
    } else {
      res.redirect('/');
    }
  });

  router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query(`
    SELECT * FROM users WHERE id = $1
    `, [email])
      .then(data => {
        if (password === data.rows[0].password) {
          req.session.user_id = data.rows[0].id;
          res.redirect('/');
        } else {
          res
          .status(403)
          .send({error: 'error'});
          return;
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
};
