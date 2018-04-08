/*
	Auth Controller
*/

const User = require('../models/User');

exports.registerForm = (req, res) => {
  res.render('users/register');
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'You must supply a email').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extensions: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password can not be blank').notEmpty();
  req
    .checkBody('password', 'Password must contain at least 5 characters')
    .isLength({ min: 5 });
  req
    .checkBody('confirm-password', 'Confirmed password can not be blank')
    .notEmpty();
  req
    .checkBody('confirm-password', 'Oops! You passwords does not match.')
    .equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('danger', errors.map(err => err.msg));
    res.render('users/register', {
      name: req.body.name,
      email: req.body.email,
      flashes: req.flash(),
    });
    return;
  }

  next();
};

exports.register = async (req, res, next) => {
  const user = await new User({
    email: req.body.email,
    name: req.body.name,
  });

  await User.register(user, req.body.password);

  next();
};
