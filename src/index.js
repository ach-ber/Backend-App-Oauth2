const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth');
require("dotenv").config();

const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(morgan("dev"));
//app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


const successLoginUrl = "http://localhost:3000/LoginSuccess";
const errorLoginUrl = "http://localhost:3000/Error";

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401).send("You must login first!");
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: successLoginUrl,
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  //res.send(`Hello ${req.user.displayName}`);
  //res.setHeader("Access-Control-Allow-Origin",'http://localhost:3000');
  //res.setHeader("Access-Control-Allow-Credentials",'true');
  res.status(200).json({ email: req.user.email });
  console.log(req.user.email);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});


const port = 5000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

