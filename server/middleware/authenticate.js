const { User } = require('./../models/User');

const authenticate = (request, response, next) => {
  const token = request.header('x-auth');
  //verify token
  //fetch user
  //do sthg

  //model method to get user by associated token
  User.findByToken(token)
    .then(user => {
      //do stuff
      if (!user) {
        //needs 401
        return Promise.reject();
      }
      //modify request obj
      request.user = user;
      request.token = token;

      next();
    })
    .catch(err => {
      response.status(401).send();
    });
};
module.exports = { authenticate };
