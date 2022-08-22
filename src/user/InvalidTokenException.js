module.exports = function InvalidTokenException() {
  this.message = 'account activation failure';
  this.status = 400;
};
