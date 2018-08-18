const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.courriel = !isEmpty(data.courriel) ? data.courriel : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.courriel)) {
        errors.courriel = 'Email is invalid';
    }

    if (Validator.isEmpty(data.courriel)) {
        errors.courriel = 'Email field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};