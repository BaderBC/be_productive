const path = require("path");
const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('/ ', req.cookies);
    res.sendFile(path.resolve(__dirname, '../public/index/index.html'));
});

module.exports = router;