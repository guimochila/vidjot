/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

// exports.catchErrors = fn => {
// 	return function(req, res, next) {
// 		return fn(req, res, next).catch(next);
// 	};
// };

// For Eslint/Airbnb/Prettier the code bellow is the refactoring of the code commented above.
exports.catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
};

/*
	Rendering errors
*/

exports.errorRender = (err, req, res) => {
  res.status(err.status || 500);
  res.send(`${err.message}`);
};
