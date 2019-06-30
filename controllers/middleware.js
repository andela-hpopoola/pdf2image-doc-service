require('dotenv').config();
const fetch = require('node-fetch');
const AUTH_SERVICES_API = process.env.AUTH_SERVICES_API;

module.exports = {
  checkUserAuth(req, res, next) {
    const token = req.header('x-auth');
    console.log('AUTH_SERVICES_API', AUTH_SERVICES_API);

    if (!token) {
      return res.status(401).json({ msg: 'Invalid Token' });
    }

    fetch(`${AUTH_SERVICES_API}/authenticate`, {
      method: 'GET',
      headers: {
        'x-auth': token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.valid_user) {
          next();
        } else {
          res.status(401).json({ msg: 'Invalid Token' });
        }
      })
      .catch(error => res.status(401).json(error));
  }
};
