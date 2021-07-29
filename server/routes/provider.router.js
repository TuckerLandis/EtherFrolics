const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', async (req, res) => {
  // GET route code here
  // console.log('got to provider GET 🧍‍♂️');
  // res.send('🧍‍♂️');

  const queryText = `
  SELECT "provider".*,
  "credential".*,
  "education".*,
  "insurance".*,
  "mission_experience".*,
  "work_experience".*
  FROM "provider"
  JOIN "credential"
  ON "provider".user_id = "credential".user_id
  JOIN "education"
  ON "education".user_id = "provider".user_id
  JOIN "insurance"
  ON "insurance".user_id = "provider".user_id
  JOIN "mission_experience"
  ON "mission_experience".user_id = "provider".user_id
  JOIN "work_experience"
  ON "work_experience".user_id = "provider".user_id
  JOIN "user"
  ON "user".id = "provider".user_id
  WHERE "user".authorization = 1;
  `;

  try {
    const result = await pool.query(queryText);
    console.log('provider get result: ', result.rows);
    res.send(result.rows);
  }
  catch (err) {
    console.log('Error getting provider info: ', err);
    res.sendStatus(500);
  }

});

/**
 * GET featured provider route template
 */
router.get('/:id', async (req, res) => {
  // console.log('got to selected provider GET 👨🏻‍⚕️');
  // res.send('👨🏻‍⚕️');

  console.log('selected provider req.params.id: ', req.params.id);
  

  const queryText = `
  SELECT "provider".*,
  "credential".*,
  "education".*,
  "insurance".*,
  "mission_experience".*,
  "work_experience".*
  FROM "provider"
  JOIN "credential"
  ON "provider".user_id = "credential".user_id
  JOIN "education"
  ON "education".user_id = "provider".user_id
  JOIN "insurance"
  ON "insurance".user_id = "provider".user_id
  JOIN "mission_experience"
  ON "mission_experience".user_id = "provider".user_id
  JOIN "work_experience"
  ON "work_experience".user_id = "provider".user_id
  JOIN "user"
  ON "user".id = "provider".user_id
  WHERE "user".id = $1;
  `;

  try {
    const result = await pool.query(queryText, [req.params.id]);
    console.log('selected provider get result: ', result.rows);
    res.send(result.rows);
  }
  catch (err) {
    console.error('Error getting selected provider info: ', err);
    res.sendStatus(500);
  }

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('Reached provider reg POST:', req.body);
  res.sendStatus(200)

});

router.post('/workhistoryitem', (req, res) => {
  // POST route code here
  console.log('Reached provider reg POST /workhistoryitem', req.body);
  res.sendStatus(200)

});

router.put('/workhistory', (req, res) => {
  console.log('Reached provider PUT /workhistory', req.body);
  res.sendStatus(200)

})

router.put('/address', (req, res) => {
  console.log('Reached provider reg PUT /address', req.body);
  res.sendStatus(200)

})

router.post('/educationhistoryitem', (req, res) => {
  console.log('Reached provider reg POST: educationhistory', req.body);
  res.sendStatus(200)

})

router.put('/lastmission', (req, res) => {
  console.log('reached provider reg PUT: lastmission');
  res.sendStatus(200)

})

router.post('/missionhistoryitem', (req, res) => {
  console.log('Reached provider reg POST: missionHistory', req.body);
  res.sendStatus(200)

})

router.post('/insuranceitem', (req, res) => {
  console.log('Reg.body in /insurance item is', req.body);
  console.log('user id is', req.user.id);
  let ins = req.body;
  //define the query text of where you want to post in the database
  const queryText = `INSERT INTO "insurance" ("insuranceType", "insuranceProvider", "policyNumber", 
  "state", "dateInitial", "dateRenewed", "dateExpiring", "user_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

  pool.query(queryText, [ins.insuranceType, ins.insuranceProvider, ins.policyNumber, ins.state, ins.dateInitial,
  ins.dateRenewed, ins.dateExpiring, req.user.id])
  .then( result => {
    res.sendStatus(201);
  })
  .catch (err => {
    console.log('error is', err);
    res.sendStatus(500);
  })

})





router.post('/credentialhistory', async (req, res) => {
  console.log('Credential History POST for provider', req.body);
  res.sendStatus(200);

})

module.exports = router;
