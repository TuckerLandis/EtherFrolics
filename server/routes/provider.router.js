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
    console.log('created new provider');
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
  // res.sendStatus(200)
  // Tucker

  const workHistoryItem = req.body
  const queryText = `INSERT INTO "work_experience" 
  (
    "workplace",
    "jobTitle",
    "referenceName",
    "referencePhone",
    "referenceEmail",
    "startDate",
    "endDate",
    "user_id"
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
  `;

  pool.query(queryText, [
    workHistoryItem.workplace,
    workHistoryItem.jobTitle,
    workHistoryItem.referenceName,
    workHistoryItem.referencePhone,
    workHistoryItem.referenceEmailAddress,
    workHistoryItem.startDate,
    workHistoryItem.endDate,
    req.user.id
  ])
  .then( result => {
    console.log('POSTED new work history');
    res.sendStatus(200)
  })
  .catch (error => {
    console.log('Error in WorkHistory POST', error);
    res.sendStatus(500)
  })

});

router.put('/workhistory', (req, res) => {
  console.log('Reached provider PUT /workhistory', req.body);

  // Tucker
  const provider = req.body

  const queryText = `UPDATE "provider" SET "yearsExperience" = $1 WHERE "user_id" = $2; `;

  pool.query(queryText, [provider.yearsExperience, req.user.id])
  .then( result => {
    console.log('updated yearsExperience');
    res.sendStatus(200)
  })
  .catch (error => {
    console.log('Error in Provider PUT', error);
    res.sendStatus(500)
  })
})

router.put('/address', (req, res) => {
  console.log('Reached provider reg PUT /address', req.body);
  res.sendStatus(200)
  // ben
})

router.post('/educationhistoryitem', (req, res) => {
  console.log('Reached provider reg POST: educationhistory', req.body);
  const educationhistoryItem = req.body

  const queryText = `INSERT INTO "education"
  (
    "institution",
    "degree",
    "startDate",
    "endDate",
    "user_id"
  )
  VALUES ($1, $2, $3, $4, $5);
  `;
    pool.query(queryText, [
      educationhistoryItem.school,
      educationhistoryItem.degree,
      educationhistoryItem.startDate,
      educationhistoryItem.endDate,
      req.user.id
    ])

    .then( result => {
      console.log('created new education history item');
      res.sendStatus(200)
    })
    .catch (error => {
      console.log('Error in Education Post', error);
      res.sendStatus(500)
    })
})

router.put('/lastmission', (req, res) => {
  console.log('reached provider reg PUT: lastmission');
  res.sendStatus(200)
  // pesto
})

router.post('/missionhistoryitem', async (req, res) => {
  console.log('Reached provider reg POST: missionHistory', req.body);

  // make connection to pool client 
  // to initiate transaction
  const client = await pool.connect();

  // variable for the user id
  const user_id = req.user.id;

  // variable for the organization name
  const organizationName = req.body.organization;

  // variable for mission location
  const location = req.body.location;

  // variable for the name of the reference
  const referenceName = req.body.referenceName;

  // variable for phone number of reference
  const referencePhone = req.body.referencePhone;

  // variable for mission start date
  const startDate = req.body.startDate;

  // variable for mission end date
  const endDate = req.body.endDate;

  // query text makes post of data from MissionHistoryMultiRow to mission_experience table
  const queryText = `
    INSERT INTO "mission_experience" ("organizationName", "location", "referenceName", "referencePhone", "startDate", "endDate", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  try {

    await client.query('BEGIN;');

    await client.
      query(queryText, [organizationName, location, referenceName, referencePhone, startDate, endDate, user_id])
      await client.query('COMMIT;');

      res.sendStatus(200)

  } catch (error) {

    await client.query('ROLLBACK')
    console.error('Could not finish mission experience POST, /missionhistoryitem', error);
  } finally {

    client.release();

  }
})


router.post('/credentialhistory', async (req, res) => {
  console.log('Credential History POST for provider', req.body);
  res.sendStatus(200);
  // pesto/ben
})

module.exports = router;
