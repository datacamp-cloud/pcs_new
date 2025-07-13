// utils/normalizePhone.js
module.exports = function normalizePhone(phone) {
  return phone
    .replace(/^(\+225|00225)/, '')
    .replace(/\s/g, '');
};
