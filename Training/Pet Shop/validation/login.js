const isEmpty = require("./isempty");

const Validator = require("validator");

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.name : "";
    data.password = !isEmpty(data.password) ? data.name : "";
    
    if (Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
        errors.password = "Password must be between 6 to 30 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};