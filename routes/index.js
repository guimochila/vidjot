const express = require('express');

const router = express.Router();
const { catchErrors } = require('../handlers/errorHandler');
const mainController = require('../controllers/mainController');
const ideaController = require('../controllers/ideaController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.get('/', mainController.index);
router.get('/about', mainController.about);

// Ideas Routes
router.get('/ideas', catchErrors(ideaController.getIdeas));
router.get(
  '/ideas/add',
  authController.isLoggedIn,
  ideaController.showAddIdeas,
);
router.post(
  '/ideas',
  ideaController.validateIdea,
  catchErrors(ideaController.addIdeas),
);
router.get('/ideas/:id/edit', catchErrors(ideaController.editIdeas));
router.put(
  '/ideas/:id',
  ideaController.validateIdea,
  catchErrors(ideaController.updateIdeas),
);
router.delete('/ideas/:id', catchErrors(ideaController.removeIdeas));

// Login routes
router.get('/login', authController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Register routes
router.get('/register', userController.registerForm);
router.post(
  '/register',
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login,
);

module.exports = router;
