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
 * POST route for initial provider post from /generalinfo
 */
router.post('/', (req, res) => {
  
  console.log('Reached provider reg POST:', req.body);
  
  let provider = req.body

  const queryText = `INSERT INTO "provider" (
      "user_id",
      "firstName",
      "lastName",
      "DOB",
      "providerRole",
      "validPassport",
      "soloProvider",
      "emailAddress"

    
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `
  pool.query(queryText, [
    req.user.id,
    provider.firstName,
    provider.lastName,
    provider.dob,
    provider.providerRole,
    provider.validPassport,
    provider.soleProvider,
    provider.providerEmail

  ])
  .then( result => {
    console.log('created new provider', result.rows);
    res.sendStatus(200)
  })
  .catch (error => {
    console.log('Error in Provider POST', error);
    res.sendStatus(500)
  })


});

router.post('/workhistoryitem', (req, res) => {
  // POST route code here
  console.log('Reached provider reg POST /workhistoryitem', req.body);
  res.sendStatus(200)
  // Tucker
});

router.put('/workhistory', (req, res) => {
  console.log('Reached provider PUT /workhistory', req.body);
  res.sendStatus(200)
  // Tucker
})

router.put('/address', (req, res) => {
  console.log('Reached provider reg PUT /address', req.body);
  res.sendStatus(200)
  // ben
})

router.post('/educationhistoryitem', (req, res) => {
  console.log('Reached provider reg POST: educationhistory', req.body);
  res.sendStatus(200)
  // ben
})

router.put('/lastmission', (req, res) => {
  console.log('reached provider reg PUT: lastmission');
  res.sendStatus(200)
  // pesto
})

router.post('/missionhistoryitem', (req, res) => {
  console.log('Reached provider reg POST: missionHistory', req.body);
  res.sendStatus(200)
  // pesto
})


router.post('/credentialhistory', async (req, res) => {
  console.log('Credential History POST for provider', req.body);
  res.sendStatus(200);
  // pesto/ben
})

module.exports = router;
