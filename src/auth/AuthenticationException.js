module.exports = function AuthenticationException() {
  this.status = 401;
  this.message = 'incorrect credentials';
};
