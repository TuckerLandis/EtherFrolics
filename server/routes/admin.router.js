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
            res.send(result.rows);
        })
        .catch(err => {
            console.error('error getting admin info:', err);
            res.sendStatus(500);
        })
});

// Get request for info in the Mission Table
router.get('/mission', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM mission WHERE "missionActive" = TRUE 
    ORDER BY "startDate" ASC;`;

    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all Missions', err);
            res.sendStatus(500);
        })
}) // End of Get route

router.post('/mission', rejectNonAdmin, (req, res) => {
    let mission = req.body;

    if (mission.missionLink === ''){
        mission.missionLink = '#0';
    };
    if (mission.applyLink === '') {
        mission.applyLink = '#0';
    };
    //define query text
    const queryText = `INSERT INTO mission ("name", "location", "startDate", "endDate",
    "missionLink", "applyLink", "missionActive") VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    //use pool to contact the server
    pool.query(queryText, [mission.name, mission.location, mission.startDate,
                mission.endDate, mission.missionLink, mission.applyLink, mission.missionActive])
    .then( result => {
        res.sendStatus(201);
    })
    .catch( err => {
        console.log('error is', err);
        res.sendStatus(500);
    })
})

router.put('/mission/:id', rejectNonAdmin, (req, res) => {
    const queryText = `UPDATE mission
    SET "startDate" = $1,
    "endDate" = $2,
    "location" = $3,
    "name" = $4,
    "missionLink" = $5,
    "applyLink" = $6,
    "missionActive" = $7
    WHERE "mission_id" = $8;`;

    let mission = req.body;

    pool.query(queryText, [mission.startDate, mission.endDate, mission.location, mission.name,
    mission.missionLink, mission.applyLink, mission.missionActive, mission.mission_id])
    .then( result => {
        res.sendStatus(200) 
    })
    .catch( err => {
        res.sendStatus(500);
    })
})

module.exports = router;