const path = require("path");
const router = require('express').Router();

router.use((req, res, next) => {
    console.log(req.url + '\n\n');
    next();
});

router.get('/', (req, res) => {
    console.log('/ cookies: ', req.cookies);
    res.sendFile(path.resolve(__dirname, '../public/index/+page.svelte'));
});

module.exports = router;