const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/add/index.html'));
});

router.post('/', (req, res) => {
    const {
        name,
        duration
    } = req.body;

    console.log(name, duration);
    res.status(200).json({
        ok: true,
        message: "Activity successfully added"
    });
});

module.exports = router;