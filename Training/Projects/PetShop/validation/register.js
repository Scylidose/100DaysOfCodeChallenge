const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.courriel = !isEmpty(data.courriel) ? data.courriel : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isLength(data.username, { min: 2, max: 15 })) {
    errors.username = 'Username must be between 2 and 15 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (Validator.isEmpty(data.courriel)) {
    errors.courriel = 'Email field is required';
  }

  if (!Validator.isEmail(data.courriel)) {
    errors.courriel = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = 'Password must be at least 5 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
