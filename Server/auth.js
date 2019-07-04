const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('Auth_token');
    if (!token)
        return res.send('Access Denied: No Token Provided!');
    }