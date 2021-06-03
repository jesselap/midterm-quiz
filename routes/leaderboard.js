const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const queryStr = `select users.name, avg(score) as score, rank() over (order by avg(score) desc) rw
    from attempts
    JOIN users ON users.id = user_id
    group by users.name
    limit 5;`;
    db.query(queryStr)
      .then(data => {
        res.json(data.rows)
      })
      .catch(err => res.json(err))
  });



  return router;
};


