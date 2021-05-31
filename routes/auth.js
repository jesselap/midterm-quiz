const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // login
  router.get('/', (req, res) => {
    if (!req.session.user_id) {
      let templateVars = {
        user: null
      }
      res.render("login", templateVars);
    } else {
      res.redirect("/");
    }
  });

  router.post('/', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    db.query(`
    SELECT * FROM users WHERE email = $1
    `, [email])
      .then(data => {
        if (password === data.rows[0].password) {
          req.session.user_id = data.rows[0].id;
          console.log(`line 28 ${req.session.user_id}`);
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


  // register user
  router.get('/', (req, res) => {
    let templateVars = {
      user: null
    }
    res.render('register', templateVars);
  });

  router.post('/', (req, res) => {
    console.log('inside^^^^^^^^^^')
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

  return router;
};
