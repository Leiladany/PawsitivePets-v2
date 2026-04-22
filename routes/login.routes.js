const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');
const router = express.Router();

router.get('/login', isLoggedOut, (req, res) => {
  res.render('auth/login', { user: req.session.user });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      // User found
      if (bcrypt.compareSync(password, user.passwordHash)) {
        // Correct password
        const tempUser = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        req.session.user = tempUser;
        return res.redirect('/profile');
      } else {
        // Incorrect password
        return res.render('auth/login', { errorMessage: 'Incorrect password', user: req.session.user });
      }
    } else {
      // User not found
      return res.render('auth/login', { errorMessage: 'User not found', user: req.session.user });
    }
  } catch (error) {
    // Handle other errors
    console.error(error);
    return res.render('auth/login', { errorMessage: 'An error occurred', user: req.session.user });
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });

});

module.exports = router;