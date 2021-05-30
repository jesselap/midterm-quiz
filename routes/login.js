const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // login
  router.get('/', (req, res) => {
    let templateVars = {};
    if (!req.session.user_id) {
      templatevars = {
        user: null
      };
      res.render('login', templateVars);
    } //else {
    //   res.redirect('/');
    // }
  });

  router.post('/', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    db.query(`
    SELECT * FROM users WHERE email = $1
    `, [email])
      .then(data => {
        if (password === data.rows[0].password) {
          req.session["user_id"] = data.rows[0].email;
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
  return router;
};