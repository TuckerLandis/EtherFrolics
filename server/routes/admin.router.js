const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {

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

// Get request for info in the Mission Table
router.get('/mission', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "mission"."startDate", "mission".location, "mission".name, "mission"."missionLink" FROM "mission"
		ORDER BY "mission"."startDate" ASC;`

    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all Missions', err);
            res.sendStatus(500);
        })
}) // End of Get route

router.post('/mission', rejectUnauthenticated, (req, res) => {
    console.log('req.body is', req.body);
    let mission = req.body;
    //define query text
    const queryText = `INSERT INTO mission ("name", "location", "soleProvider", "startDate", "endDate",
    "missionLink") VALUES ($1, $2, $3, $4, $5, $6);`;
    //use pool to contact the server
    pool.query(queryText, [mission.name, mission.location, mission.soleProvider, mission.startDate,
                mission.endDate, mission.missionLink])
    .then( result => {
        res.sendStatus(201);
    })
    .catch( err => {
        res.sendStatus(500);
    })
})

module.exports = router;