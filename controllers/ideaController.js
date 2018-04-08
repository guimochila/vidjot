const mongoose = require('mongoose');

const Idea = mongoose.model('Ideas');

exports.showAddIdeas = (req, res) => {
  res.render('ideas/edit', { pageTitle: 'Add Ideas' });
};

// Middleware to validate data
exports.validateIdea = (req, res, next) => {
  req.sanitizeBody('title');
  req.checkBody('title', 'You must supply a title').notEmpty();
  req.checkBody('details', 'You must supply details').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.render('ideas/edit', {
      errors,
      title: req.body.title,
      details: req.body.details,
    });
  }

  return next();
};

exports.addIdeas = async (req, res) => {
  const idea = await new Idea(req.body).save();
  req.flash('success', `Idea "${idea.title} was created."`);
  res.redirect('/ideas');
};

exports.getIdeas = async (req, res) => {
  const ideas = await Idea.find({}).sort({ date: 'desc' });

  res.render('ideas/show', { ideas });
};

exports.editIdeas = async (req, res) => {
  const idea = await Idea.findOne({ _id: req.params.id });
  idea.pageTitle = 'Update Idea';
  idea.methodURL = '?_method=PUT';
  idea.method = 'PUT';

  res.render('ideas/edit', idea);
};

exports.updateIdeas = async (req, res) => {
  const idea = await Idea.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });

  res.flash('success', `Successfully updated <strong> ${idea.title}</strong>`);
  res.redirect('/ideas');
};

exports.removeIdeas = async (req, res) => {
  const idea = await Idea.findByIdAndRemove({ _id: req.params.id });

  req.flash('success', `${idea.title} was removed!`);
  res.redirect('/ideas');
};
