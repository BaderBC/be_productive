const jwt = require('jsonwebtoken');
const {
    SECRET = "c23487908n3410nx3as1dx"
} = process.env;

const checkIfLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies['jwt-auth'].token;
        req.token = jwt.verify(token, SECRET);
        next();

    } catch (err) {
        res.redirect('/auth');
    }
}

module.exports = {
    checkIfLoggedIn
}