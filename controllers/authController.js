/*
	Auth Controller
*/

const passport = require('passport');

exports.loginForm = (req, res, next) => {
	res.render('users/login');
};

exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Login failed',
	successRedirect: '/ideas',
	successFlash: 'You are now logged in.',
});

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
		return;
	}

	req.flash('error', 'Oops you must be logged in to do that!');
	res.redirect('/login');
};

exports.logout = (req, res,) => {
	req.logout();
	req.flash('success', 'You are now logged out!');
	res.redirect('/');
}
