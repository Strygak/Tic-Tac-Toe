var express = require('express');
var User = require('../models/user');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/');
    }
}

//handle register form
router.post('/register', function(req, res, next) {

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    
    User.findOne({ username: username }, function(err, user) {

        if (err) { return next(err); }

        if (user) { return res.redirect('/'); }

        var newUser = new User({
        	username: username,
        	password: password,
        	email: email,
        	createdAt: Date.now()
        });
        newUser.save();
        res.redirect('/');
    });
}, passport.authenticate("/login", {
    successRedirect: "/rooms",
    failureRedirect: "/"
}));

router.post('/login', passport.authenticate('login', {
    successRedirect: '/rooms',
    failureRedirect: '/'
}));

router.get('/room1', function(req, res, next) {
    res.render('room1');
});

router.get('/rooms', function(req, res) {
    res.render('rooms');
});

router.get('/room1', ensureAuthenticated, function(req, res) {
    res.render('room1');
});

router.get('/room2', ensureAuthenticated, function(req, res) {
    res.render('room2');
});

router.get('/room3', ensureAuthenticated, function(req, res) {
    res.render('room3');
});

router.get('/room4', ensureAuthenticated, function(req, res) {
    res.render('room4');
});

router.get('/room5', ensureAuthenticated, function(req, res) {
    res.render('room5');
});

router.get('/room6', ensureAuthenticated, function(req, res) {
    res.render('room6');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;