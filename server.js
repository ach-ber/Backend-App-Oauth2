const express = require("express");
const session = require("express-session");
const db = require("./src/db/connection");
const userRoute = require('./src/routes/user.js');
require("dotenv").config();
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require("passport");

const morgan = require("morgan");
const helmet = require("helmet");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.ATLAS_URI)
    .catch((err) => console.log(Error))

const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use('', userRoute);

const port = 5000;
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});


