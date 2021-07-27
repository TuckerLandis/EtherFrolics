const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

    const queryText = `
    SELECT "user".id, "user".username
    FROM "user"
    WHERE "authorization" = 100;
    `;
    pool
        .query(queryText)
        .then(result => {
            console.log('admin GET result.rows:', result.rows);
            res.send(result.rows);
        })
        .catch(err => {
            console.error('error getting admin info:', err);
            res.sendStatus(500);
        })
});

router.post('/mission', (req, res) => {
    console.log(req.body);
})

module.exports = router;