const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const User = require('../models/user');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        User.findOne({ _id: decoded.id }, {_id: 1, username: 1, email: 1})
          .then(user => {
            if(!user) {
              res.status(404).json({
                error: 'No such user'
              });
            }
            req.currentUser = user;
            next();
          })
      }
    });
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
};