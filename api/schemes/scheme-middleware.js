const Schemes = require('./scheme-model');
const ExpressError = require('../ExpressError');

/*
  * If `scheme_id` does not exist in the database:

  * status 404
  * {
  *   "message": "scheme with scheme_id <actual id> not found"
  * }
*/
const checkSchemeId = async (req, res, next) => {
	try {
		const scheme = await Schemes.findById(req.params.scheme_id);
		if (scheme) {
			req.scheme = scheme;
			next();
		} else {
			next(
				new ExpressError(
					`scheme with ID ${req.params.scheme_id} not found`,
					404
				)
			);
		}
	} catch (err) {
		next(err, 500);
	}
};

/*
  * If `scheme_name` is missing, empty string or not a string:

  * status 400
  * {
  *  "message": "invalid scheme_name"
  * }
*/

const validateScheme = (req, res, next) => {
	const newScheme = req.body;
	if (typeof newScheme.scheme_name !== 'string') {
		next(new ExpressError('invalid scheme_name', 400));
	} else if (newScheme.scheme_name === ' ') {
		next(new ExpressError('invalid scheme_name', 400));
	} else if (!newScheme.scheme_name) {
		next(new ExpressError('invalid scheme_name', 400));
	} else {
		res.status(200).json(newScheme);
		next();
	}
};

/*
  * If `instructions` is missing, empty string or not a string, or
  * if `step_number` is not a number or is smaller than one:

  * status 400
  * {
  *   "message": "invalid step"
  * }
*/

const validateStep = (req, res, next) => {
	const newStep = req.body;
	if (typeof newStep.instructions !== 'string') {
		next(new ExpressError('invalid step', 400));
	} else if (newStep.instructions === ' ') {
		next(new ExpressError('invalid step', 400));
	} else if (!newStep.instructions) {
		next(new ExpressError('invalid step', 400));
	} else if (typeof newStep.step_number !== 'number') {
		next(new ExpressError('invalid step', 400));
	} else if (newStep.step_number < 1) {
		next(new ExpressError('invalid step', 400));
	} else {
		res.status(200).json(newStep);
	}
};

module.exports = {
	checkSchemeId,
	validateScheme,
	validateStep,
};
