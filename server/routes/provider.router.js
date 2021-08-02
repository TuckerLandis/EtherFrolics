const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');


/**
 * GETs all providers for render on provider management general page
 */
router.get('/', rejectNonAdmin, (req, res) => {

  const queryText = `SELECT "provider".* FROM "provider"
  JOIN "user" 
  ON "user".id = "provider".user_id
  WHERE "user".authorization = 1;`;

  pool.query(queryText)
    .then(result => {
      console.log('prov mgmt get: ');

      res.send(result.rows)
    })
    .catch(error => {
      console.log('error in prov mgmt get: ');
      res.sendStatus(500)

    })
})

/**
 * GETs a provider's data for rendering on provider management individual
 * rejects non admins
 * 
 */
router.get('/ind/:id', rejectNonAdmin, (req, res) => {

  const queryText = `SELECT 
  "user".id, "user".username, 
  "provider".provider_id, 
  "provider"."firstName", 
  "provider"."lastName", 
  "provider"."DOB", 
  "provider"."emailAddress", 
  "provider"."providerRole", 
  "provider"."streetAddress", 
  "provider".city, 
  "provider".state, 
  "provider"."zipCode", 
  "provider"."soloProvider", 
  "provider".verified, 
  "provider"."recruiterOpt", 
  "provider"."lastMission", 
  "provider"."yearsExperience", 
  "provider"."validPassport", 
  "provider".availability, 
  "provider"."peerReviews", 
  "provider"."missionReviews", 
  "provider".publications,
  "provider"."registrationComplete",
  "provider"."resumeKey",
  (SELECT JSON_AGG(providerCredentials)
    FROM
      (SELECT "credential_id", "licensingBoard", "credentialName", "licenseNumber", "dateInitial", "dateRenewed", "dateExpiring", "credentialImageKey" 
      FROM "credential"
      WHERE "credential".user_id = "user".id) AS providerCredentials) AS credential_array, 
  (SELECT JSON_AGG(providerEducation)
    FROM 
      (SELECT "education_id", "institution", "startDate", "endDate", "degree", "degreeImageKey"
      FROM "education"
      WHERE "education".user_id = "user".id) AS providerEducation) AS education_array, 
  (SELECT JSON_AGG(providerInsurance)
    FROM
      (SELECT "insurance_id", "insuranceType", "insuranceProvider", "state", "dateInitial", "dateRenewed", "dateExpiring", "policyNumber", 		"insuranceImageKey"
      FROM "insurance"
      WHERE "insurance".user_id = "user".id) AS providerInsurance) AS insurance_array, 
  (SELECT JSON_AGG(providerMissionExperience)
    FROM
      (SELECT "missionExperience_id", "organizationName", "location", "startDate", "endDate", "referenceName", "referencePhone", "missionExperienceImageKey"
      FROM "mission_experience"
      WHERE "mission_experience".user_id = "user".id) AS providerMissionExperience) AS mission_experience_array, 
  (SELECT JSON_AGG(providerWorkExperience)
    FROM
      (SELECT "workplace", "jobTitle", "startDate", "endDate", "referenceName", "referencePhone", "referenceEmail", "resumeImageKey"
      FROM "work_experience"
      WHERE "work_experience".user_id = "user".id) AS providerWorkExperience) AS work_experience_array
    FROM "user"
    JOIN "provider" 
    ON "user".id = "provider".user_id
    WHERE "user".id = $1
    GROUP BY "user".id, "user".username, "provider".provider_id
    ORDER BY "provider".verified;`;

  pool.query(queryText, [req.params.id])
    .then(result => {
      console.log('Individual provider GET: ', result.rows);
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error in individual provider get', error);
    })
})


/**
 * GETs a provider's data for rendering onprovider landing page
 * 
 */
router.get('/landing', rejectUnauthenticated, (req, res) => {

  console.log('got to providerLanding GET');


  const queryText = `SELECT 
  "user".id, "user".username, 
  "provider".provider_id, 
  "provider"."firstName", 
  "provider"."lastName", 
  "provider"."DOB", 
  "provider"."emailAddress", 
  "provider"."providerRole", 
  "provider"."streetAddress", 
  "provider".city, 
  "provider".state, 
  "provider"."zipCode", 
  "provider"."soloProvider", 
  "provider".verified, 
  "provider"."recruiterOpt", 
  "provider"."lastMission", 
  "provider"."yearsExperience", 
  "provider"."validPassport", 
  "provider".availability, 
  "provider"."peerReviews", 
  "provider"."missionReviews", 
  "provider".publications,
  "provider"."registrationComplete",
  "provider"."resumeKey",
  (SELECT JSON_AGG(providerCredentials)
    FROM
      (SELECT "credential_id", "licensingBoard", "credentialName", "licenseNumber", "dateInitial", "dateRenewed", "dateExpiring", "credentialImageKey" 
      FROM "credential"
      WHERE "credential".user_id = "user".id) AS providerCredentials) AS credential_array, 
  (SELECT JSON_AGG(providerEducation)
    FROM 
      (SELECT "education_id", "institution", "startDate", "endDate", "degree", "degreeImageKey"
      FROM "education"
      WHERE "education".user_id = "user".id) AS providerEducation) AS education_array, 
  (SELECT JSON_AGG(providerInsurance)
    FROM
      (SELECT "insurance_id", "insuranceType", "insuranceProvider", "state", "dateInitial", "dateRenewed", "dateExpiring", "policyNumber", 		"insuranceImageKey"
      FROM "insurance"
      WHERE "insurance".user_id = "user".id) AS providerInsurance) AS insurance_array, 
  (SELECT JSON_AGG(providerMissionExperience)
    FROM
      (SELECT "missionExperience_id", "organizationName", "location", "startDate", "endDate", "referenceName", "referencePhone", "missionExperienceImageKey"
      FROM "mission_experience"
      WHERE "mission_experience".user_id = "user".id) AS providerMissionExperience) AS mission_experience_array, 
  (SELECT JSON_AGG(providerWorkExperience)
    FROM
      (SELECT "workplace", "jobTitle", "startDate", "endDate", "referenceName", "referencePhone", "referenceEmail", "resumeImageKey"
      FROM "work_experience"
      WHERE "work_experience".user_id = "user".id) AS providerWorkExperience) AS work_experience_array
    FROM "user"
    JOIN "provider" 
    ON "user".id = "provider".user_id
    WHERE "user".id = $1
    GROUP BY "user".id, "user".username, "provider".provider_id
    ORDER BY "provider".verified;`;

  pool.query(queryText, [req.user.id])
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error in provider landing get', error);

    })
})

/**
 * POST route for initial provider post from /generalinfo
 */
router.post('/', rejectUnauthenticated, (req, res) => {

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
    .then(result => {
      console.log('created new provider');
      res.sendStatus(200)
    })
    .catch(error => {
      console.log('Error in Provider POST', error);
      res.sendStatus(500)
    })
});

router.post('/workhistoryitem', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log('Reached provider reg POST /workhistoryitem', req.body);
  // res.sendStatus(200)
  // Tucker

  let workHistoryItems = req.body

  // loops over the sent array of work history objects, posts all
  workHistoryItems.forEach(workHistoryItem => {

    let queryText = `INSERT INTO "work_experience" 
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
      .then(result => {
        console.log('POSTED new work histories');

      })
      .catch(error => {
        console.log('Error in WorkHistory POST', error);
        res.sendStatus(500)
      })

  }) // end loop
  res.sendStatus(200)


});


/**
 * Takes a years of experience value from /workhistory and updates wthe relevant column in the provider table
 */
router.put('/workhistory', rejectUnauthenticated, (req, res) => {
  console.log('Reached provider PUT /workhistory', req.body);

  const provider = req.body

  const queryText = `UPDATE "provider" SET "yearsExperience" = $1 WHERE "user_id" = $2; `;

  pool.query(queryText, [provider.yearsExperience, req.user.id])
    .then(result => {
      console.log('updated yearsExperience');
      res.sendStatus(200)
    })
    .catch(error => {
      console.log('Error in Provider PUT', error);
      res.sendStatus(500)
    })
})

// Put request to the database to update the address info of the provider
router.put('/address', rejectUnauthenticated, (req, res) => {
  console.log('Reached provider reg PUT /address', req.body);

  console.log(req.user.id);

  let updatedAddress = req.body;
  console.log('the updated address is', updatedAddress);

  let queryText = `UPDATE "provider" SET "streetAddress" = $1, "city" = $2, "state" = $3, "zipCode" = $4, "phoneNumber" = $5 WHERE "user_id" = $6;`;

  pool.query(queryText, [updatedAddress.streetAddress, updatedAddress.city, updatedAddress.state, updatedAddress.zip, updatedAddress.phone, req.user.id])
    .then(response => {
      console.log(response.rowCount);
      res.sendStatus(200)
    }).catch(err => {
      console.log('address put request error', err);
      res.sendStatus(500);
    })
}) // End PUT Route

/**
 * Takes an object from /education and posts it to the education table
 */
router.post('/educationhistoryitem', rejectUnauthenticated, (req, res) => {
  console.log('Reached provider reg POST: educationhistory', req.body);
  const educationhistoryItems = req.body

  educationhistoryItems.forEach(educationhistoryItem => {
    let queryText = `INSERT INTO "education"
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

    .then(result => {
      console.log('created new education history item');
      
    })
    .catch(error => {
      console.log('Error in Education Post', error);
      res.sendStatus(500)
    })
  })

 
    res.sendStatus(200)
})

router.post('/missionhistoryitem', rejectUnauthenticated, async (req, res) => {
  console.log('Reached provider reg POST: missionHistory', req.body);

  // // make connection to pool client 
  // // to initiate transaction
  // const client = await pool.connect();

  // // variable for the user id
  // const user_id = req.user.id;

  // // variable for the organization name
  // const organizationName = req.body.organization;

  // // variable for mission location
  // const location = req.body.location;

  // // variable for the name of the reference
  // const referenceName = req.body.referenceName;

  // // variable for phone number of reference
  // const referencePhone = req.body.referencePhone;

  // // variable for mission start date
  // const startDate = req.body.startDate;

  // // variable for mission end date
  // const endDate = req.body.endDate;

  // {
  //   organization: 'Organization ',
  //   location: 'Location',
  //   referenceName: 'Reference Name',
  //   referencePhone: '6128596090',
  //   startDate: '2021-08-19',
  //   endDate: '2021-08-04'
  // },

  let missionHistoryItems = req.body

  missionHistoryItems.forEach(missionHistory => {

    // query text makes post of data from MissionHistoryMultiRow to mission_experience table
    let queryText = `
  INSERT INTO "mission_experience" ("organizationName", "location", "referenceName", "referencePhone", "startDate", "endDate", "user_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7);
`;

    pool.query(queryText, [
      missionHistory.organization,
      missionHistory.location,
      missionHistory.referenceName,
      missionHistory.referencePhone,
      missionHistory.startDate,
      missionHistory.endDate,
      req.user.id
    ])
      .then(result => {
        console.log('posted mission history item');
      })
      .catch(error => {
        console.log('error posting mission history item', error);

      })
  })



  res.sendStatus(200)

  // try {

  //   await client.query('BEGIN;');

  //   await client.
  //     query(queryText, [organizationName, location, referenceName, referencePhone, startDate, endDate, user_id])
  //     await client.query('COMMIT;');

  //     res.sendStatus(200)

  // } catch (error) {

  //   await client.query('ROLLBACK')
  //   console.error('Could not finish mission experience POST, /missionhistoryitem', error);
  // } finally {

  //   client.release();

  // }
})

router.post('/insuranceitem', rejectUnauthenticated, (req, res) => {
  console.log('Reg.body in /insurance item is', req.body);
  console.log('user id is', req.user.id);
  const insuranceItems = req.body;

  insuranceItems.forEach(ins => {
    //define the query text of where you want to post in the database
  let queryText = `INSERT INTO "insurance" ("insuranceType", "insuranceProvider", "policyNumber", 
  "state", "dateInitial", "dateRenewed", "dateExpiring", "user_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

  pool.query(queryText, [ins.insuranceType, ins.insuranceProvider, ins.policyNumber, ins.state, ins.dateInitial,
  ins.dateRenewed, ins.dateExpiring, req.user.id])
    .then(result => {
      
    })
    .catch(err => {
      console.log('error is', err);
      res.sendStatus(500);
    })
  })


  
    res.sendStatus(201);
})


router.post('/credentialhistory', rejectUnauthenticated, async (req, res) => {
  console.log('Credential History POST for provider', req.body);

  // make a connection to pool client for transaction
  const client = await pool.connect();

  // req.body destructured by variables to post
  const providerCredentialArray = req.body

  // variable for user ID
  const user_id = req.user.id;

  const credentialInsertStatement = `
  INSERT INTO "credential" ("licensingBoard", "credentialName", "licenseNumber", "dateInitial", "dateRenewed", "dateExpiring", "user_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  try {

    await client.query('BEGIN;');

    await Promise.all( 
      providerCredentialArray.map( medicalCredential => {

        const
          {
            licensingBoard,
            credentialTaxonomy,
            licenseNumber,
            dateReceived,
            dateRenewed,
            dateExpired } = medicalCredential

        return client.query(credentialInsertStatement, [licensingBoard, credentialTaxonomy, licenseNumber, dateReceived, dateRenewed, dateExpired, user_id]);

    }) )

    await client.query('COMMIT;');

    res.sendStatus(200);

  } catch (error) {

    console.error(`Error in Credential POST, changes rolledback ${error}`);

    await client.query('ROLLBACK;');

    res.sendStatus(500);

  } finally {
    console.log('End cred POST')

    await client.release();

  }

  // pesto/ben
})

router.put('/completeregistration', rejectUnauthenticated, (req, res) => {
  console.log('completing registration for: ', req.user.id);

  const queryText = `UPDATE "provider" SET "registrationComplete" = true
    WHERE "provider".user_id = $1
    ;`;

  pool.query(queryText, [req.user.id])
    .then(result => {
      res.sendStatus(200)
    })
    .catch(error => {
      console.log('error completing registration', error);

    })
})


module.exports = router;
