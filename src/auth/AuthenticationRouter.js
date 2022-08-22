const express = require('express');
const router = express.Router();
const UserService = require('../user/UserService');

router.post('/auth',async (req, res) => {
  const { email } = req.body;
  const user = await UserService.findByEmail(email);
  res.send({
    id: user.id,
    username: user.username,
  });
});

module.exports = router;
