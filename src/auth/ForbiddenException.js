module.exports = function ForbiddenException() {
  this.status = 403;
  this.message = 'account is inactive';
};
