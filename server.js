// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const morgan        = require('morgan');
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const quizesRoutes = require("./routes/quizes");
const userQuizzes = require('./routes/userQuizzes');
const quizactivity = require('./routes/quizactivity');
const leaderboardRoutes = require('./routes/leaderboard');
const authRoutes = require("./routes/auth");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own


app.use("/quizes", quizesRoutes(db));
app.use("/users", userQuizzes(db));
app.use("/users", quizactivity(db));
app.use("/", authRoutes(db));
app.use("/leaderboard", leaderboardRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  if (!req.session.user_id) {
    let templateVars = {
      user: null
    }
    res.render("index", templateVars);
  } else {
    db.query(`SELECT *
    FROM users
    WHERE id = $1;`, [req.session.user_id])
      .then(data => {
        let templateVars = {
          user: data.rows[0] };
        res.render("index", templateVars);
      })
    .catch(err => {
      res.status(500).json({ error: err.message });
    })
  }
});
app.get('/:id', (req, res)=> {
  db.query(`SELECT *
  FROM users
  WHERE id = $1;`, [req.session.user_id])
  .then(data => {
    let templateVars = {
      user: data.rows[0]
    };
  res.render('404', templateVars);
})
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
