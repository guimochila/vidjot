require('dotenv').config({ path: './variables.env' });

const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const errorHandlers = require('./handlers/errorHandler');
const hbsConfig = require('./utils/handlebars-helpers');

const app = express();

// Connect to Mongoose
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
// Map global Promise - Mongo default promise is deprecated.
mongoose.Promise = global.Promise;

// Load Models
require('./models/Idea');
require('./models/User');

// Load passport Strategy
require('./handlers/passport');

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define statics assets
app.use(express.static(path.join(__dirname, 'public')));

// Method override Middleware
app.use(methodOverride('_method'));

// Express Validator middleware
app.use(expressValidator());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: true,
    saveUninitialized: true,
  }),
);

// Initializing passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  next();
});

// Loading Routes
const routes = require('./routes/index');

const hbs = exphbs.create(hbsConfig);

// Handlebars MiddleWare
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

// Error Hanlding
app.use(errorHandlers.notFound);
app.use(errorHandlers.errorRender);

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`),
);
