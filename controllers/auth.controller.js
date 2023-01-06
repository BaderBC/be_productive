const path = require('path');
const jwt = require('jsonwebtoken');
//const emailCheck = require('email-check');
const dayjs = require('dayjs');
const sha512 = require('js-sha512');
const router = require('express').Router();

const {
    checkIfLoggedIn
} = require('../services/authorization.middleware')
const e = require("express");

const {
    SECRET = "c23487908n3410nx3as1dx",
    NODE_ENV = "development",
    cookieExpiration = dayjs().add(30, 'days').toDate()
} = process.env

router.use((req, res, next) => {
    console.log(req.url)
    next();
})

router.get('/', (req, res) => {
    console.log('ok')
    res.sendFile(path.resolve(__dirname, '../public/auth/index.html'));
});

router.post('/register', async (req, res) => {
    try {

        const {
            firstname = null,
            lastname = null,
            email,
            password
        } = req.body;

        await db.none("INSERT INTO users(email, firstname, lastname, hashed_password)" +
            "VALUES ($1, $2, $3, $4)",
            [email, firstname, lastname, sha512(password)]);

        res
            .status(200)
            .cookie('jwt-auth', ...await generateCookie(email))
            .redirect('/');

    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            message: err.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const hashed_password = await getHashedPasswordByEmail(email);

        if (sha512(password) === hashed_password) {
            return res
                .status(200)
                .cookie('jwt-auth', ...await generateCookie(email))
                .redirect('/');
        }

        return res.status(400).json({
            ok: false,
            message: "Wrong password or email"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            message: err.message
        });
    }
});

router.post('/logout', checkIfLoggedIn, (req, res) => {
    res.clearCookie('jwt-auth');
    res.redirect('/auth');
});


async function generateCookie(email) {
    //TODO: validation for email bellow
    if(true) {

        const token = generateJwtToken(email);

        const cookieParams = {
            secure: NODE_ENV !== "development",
            httpOnly: true,
            expires: cookieExpiration
        };

        //TODO: change object with token to just token
        return [{token}, cookieParams];
    }
}

function generateJwtToken(email) {
    return jwt.sign({
        email
    }, SECRET);
}

async function getHashedPasswordByEmail(email) {
    try {
        const ans = await db
            .one("SELECT hashed_password FROM users WHERE email = $1", [email])
        return ans.hashed_password;

    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = router;