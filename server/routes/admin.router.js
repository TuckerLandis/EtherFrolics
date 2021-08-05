const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');

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
    const queryText = `SELECT * FROM mission ORDER BY "startDate" ASC;`;

    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
            console.log(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all Missions', err);
            res.sendStatus(500);
        })
}) // End of Get route

router.post('/mission', rejectNonAdmin, (req, res) => {
    console.log('req.body is', req.body);
    let mission = req.body;
    //define query text
    const queryText = `INSERT INTO mission ("name", "location", "startDate", "endDate",
    "missionLink", "applyLink") VALUES ($1, $2, $3, $4, $5, $6);`;
    //use pool to contact the server
    pool.query(queryText, [mission.name, mission.location, mission.startDate,
                mission.endDate, mission.missionLink, mission.applyLink])
    .then( result => {
        res.sendStatus(201);
    })
    .catch( err => {
        console.log('error is', err);
        res.sendStatus(500);
    })
})

router.put('/mission/:id', rejectNonAdmin, (req, res) => {
    console.log('req.body is', req.body);
    console.log('req.params is', req.params);
    const queryText = `UPDATE mission
    SET "startDate" = $1,
    "endDate" = $2,
    "location" = $3,
    "name" = $4,
    "missionLink" = $5,
    "applyLink" = $6
    WHERE "mission_id" = $7;`;

    let mission = req.body;

    pool.query(queryText, [mission.startDate, mission.endDate, mission.location, mission.name,
    mission.missionLink, mission.applyLink, mission.mission_id])
    .then( result => {
        res.sendStatus(200) 
    })
    .catch( err => {
        res.sendStatus(500);
    })
})

module.exports = router;