const express = require('express');
const path = require('path');
const passport = require('passport');
const router = express.Router();

router.get('/facebook', passport.authenticate('facebook', {
  authType: 'rerequest', scope: ['public_profile', 'email']
}));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
	console.log("callback from facebook");
});

module.exports = router;