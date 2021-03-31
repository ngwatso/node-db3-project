const Schemes = require('./scheme-model');

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
			next({
				...Error(),
				status: 404,
				message: `Scheme with ID ${req.params.scheme_id} not found`,
			});
		}
	} catch (err) {
		next({
			...err,
			status: 500,
			message: 'Error processing your request',
		});
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
		next({ ...Error, status: 400, message: 'Invalid scheme_name' });
	} else if (newScheme.scheme_name === ' ') {
		next({ ...Error, status: 400, message: 'Invalid scheme_name' });
	} else if (!newScheme.scheme_name) {
		next({ ...Error, status: 400, message: 'Invalid scheme_name' });
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
		next({ ...Error, status: 400, message: 'Invalid step' });
	} else if (newStep.instructions === ' ') {
		next({ ...Error, status: 400, message: 'Invalid step' });
	} else if (!newStep.instructions) {
		next({ ...Error, status: 400, message: 'Invalid step' });
	} else if (typeof newStep.step_number !== 'number') {
		next({ ...Error, status: 400, message: 'Invalid step' });
	} else if (newStep.step_number < 1) {
		next({ ...Error, status: 400, message: 'Invalid step' });
	} else {
		res.status(200).json(newStep);
	}
};

module.exports = {
	checkSchemeId,
	validateScheme,
	validateStep,
};
