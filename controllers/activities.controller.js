const path = require('path');
const router = require('express').Router();


router.get('/list/:name', async (req, res) => {
    try {
        const {name} = req.params;
        const {email} = req.token;

        const activity = await db.one("SELECT * FROM activities WHERE name = $1 AND user_email = $2", [name, email]);
        res.json(activity);

    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({
                ok: false,
                message: `ERROR: ${err}`
            });
    }
});

router.get('/list', async (req, res) => {
    try {
        const {email} = req.token;
        console.log(`\n\n${email}`);

        const activities = await db.any("SELECT name, time_to_spend_weekly AS time_weekly FROM activities WHERE user_email = $1", [email]);
        res.status(200).send(JSON.stringify(activities));

    } catch (err) {
        console.error(err);
        res.status(500).send(`ERROR: ${err}`);
    }
});

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/activities/+page.svelte'));
});

router.post('/add', async (req, res) => {
    try {
        const {name, duration} = req.body;
        const {email} = req.token;

        console.table([name, duration, email]);
        console.log(req.body);

        await db
            .none("INSERT INTO activities(name, time_to_spend_weekly, user_email)" +
                "VALUES ($1, $2, $3)",
                [name, duration, email]);


        res.status(200).json({
            ok: true,
            redirect: 'activities/list'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            err: `Error: ${err.toString()}`
        })
    }
});

module.exports = router;