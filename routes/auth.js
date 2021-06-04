const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  // login page
  router.get('/login', (req, res) => {
    if (!req.session.user_id) {
      let templateVars = {
        user: null
      }
      res.render("login", templateVars);
    } else {
      res.redirect("/");
    }
  });
  // login form
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    db.query(`
    SELECT * FROM users WHERE email = $1
    `, [email])
      .then(data => {
        if (bcrypt.compareSync(password, data.rows[0].hashed_password)) {
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

  // logout
  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect("/");
  });


  // register user
  router.get('/register', (req, res) => {
    let templateVars = {
      user: null
    }
    res.render('register', templateVars);
  });

  router.post('/register', (req, res) => {
    const { name, email, password } = req.body
    const hashed_password = bcrypt.hashSync(password, 10);
    db.query(`
      INSERT INTO users (name, email, hashed_password)
      VALUES ($1, $2, $3)
      RETURNING id;
    `, [name, email, hashed_password])
      .then((data) => {
        req.session.user_id = data.rows[0].id;
        res.redirect("/");
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
