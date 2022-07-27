const emailValidator = require('email-validator');

module.exports = function taskValidator(task) {
  const { description, user_email, user_name } = task;
  const errors = [];
  if (description.trim() === '') {
    errors.push('description');
  }
  if (user_name.trim() === '') {
    errors.push('user_name');
  }
  if (!emailValidator.validate(user_email)) {
    errors.push('user_email');
  }
  return !errors.length ? { validated: true } : { validated: false, errors };
};
