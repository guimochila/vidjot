const mongoose = require('mongoose');
const Idea = mongoose.model('Ideas');

// Index controller
exports.index = (req, res) => {
	res.render('index');
};

exports.about = (req, res) => {
	res.render('about');
};
