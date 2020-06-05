const jwt = require('express-jwt');
require('dotenv');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader){
        req.isValid = false;
        return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === ''){
        req.isValid = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.APP_SECRET)
    } catch (err) {
        req.isValid = false;
        return next();
    }

    if (!decodedToken){
        req.isValid = false;
        return next();
    }

    req.isValid = true;
    req.userId = decodedToken.userId;
    next();
}