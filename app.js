// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')
const app = express()

const session = require("express-session");
const MongoStore = require("connect-mongo");

// Use dotenv early
// ...

app.use(
  session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // in milliseconds
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Pawsitive-Pets",
      ttl: 7 * 24 * 60 * 60, // 1 day => in seconds
    }),
  })
);

// This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

// default value for title local
const capitalize = require('./utils/capitalize')
const projectName = 'Pawsitive-Pets'

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`

// Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)

const profileRoutes = require('./routes/profile.routes')
app.use('/profile', profileRoutes)

const authRoutes = require('./routes/signup.routes')
app.use('/auth', authRoutes)

const loginRoutes = require('./routes/login.routes')
app.use('/auth', loginRoutes)

// To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app