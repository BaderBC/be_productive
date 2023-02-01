const jwt = require('jsonwebtoken');
const {
    SECRET = "c23487908n3410nx3as1dx"
} = process.env;

const checkIfLoggedIn = (req, res, next) => {
    try {
        console.log('\n\n cookies', req.cookies, '\n');
        const { token } = req.cookies['jwt-auth'];
        console.log('token: ', token);
        req.token = jwt.verify(token, SECRET);

        next();
    } catch (err) {
        console.error(err);
        return res
            .status(401)
            .json({
                ok: false,
                redirect: '/auth',
                message: 'ERROR: you need to be logged in'
            });
    }
}

module.exports = {
    checkIfLoggedIn
}