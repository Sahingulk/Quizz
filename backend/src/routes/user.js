const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
