const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const { isLoggedOut } = require('../middleware/route-guard');

router.get("/", (req, res, next) => {
  res.render("index", { user: req.session.user });
});

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup", { user: req.session.user });
});

router.post('/signup', async (req, res, next) => {
  const body = { ...req.body };

  if (body.password.length < 6) {
    res.render('auth/signup', { errorMessage: 'Password too short', userData: req.body });
  } else {
    try {
      const saltRounds = 13;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(body.password, salt);

      delete body.password;
      body.passwordHash = passwordHash;

      const user = await User.create(body);

      const tempUser = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      req.session.user = tempUser;
      res.redirect('/profile');
    } catch (error) {
      if (error.code === 11000) {
        console.log('Duplicate username!');
        res.render('auth/signup', { errorMessage: 'Username already used!', userData: req.body });
      } else {
        console.error('Error creating user:', error);
        res.render('auth/signup', { errorMessage: 'An error occurred. Please try again later.', userData: req.body });
      }
    }
  }
});

module.exports = router;
