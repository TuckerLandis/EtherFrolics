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
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error in prov mgmt get:', error);
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
      (SELECT "workplace", "jobTitle", "startDate", "endDate", "referenceName", "referencePhone", "referenceEmail"
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
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error in individual provider get', error);
      res.sendStatus(500)
    })
})


/**
 * GETs a provider's data for rendering onprovider landing page
 * 
 */
router.get('/landing', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT 
  "user".id, "user".username, 
  "provider".provider_id, 
  "provider"."firstName", 
  "provider"."lastName", 
  "provider"."DOB", 
  "provider"."emailAddress",
  "provider"."phoneNumber", 
  "provider"."providerRole", 
  "provider"."streetAddress", 
  "provider".city, 
  "provider".state, 
  "provider"."zipCode", 
  "provider"."soloProvider", 
  "provider".verified, 
  "provider"."recruiterOpt",  
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
      WHERE "credential".user_id = "user".id
      ORDER BY "dateExpiring" ASC) AS providerCredentials) AS credential_array, 
  (SELECT JSON_AGG(providerEducation)
    FROM 
      (SELECT "education_id", "institution", "startDate", "endDate", "degree", "degreeImageKey"
      FROM "education"
      WHERE "education".user_id = "user".id) AS providerEducation) AS education_array, 
  (SELECT JSON_AGG(providerInsurance)
    FROM
      (SELECT "insurance_id", "insuranceType", "insuranceProvider", "state", "dateInitial", "dateRenewed", "dateExpiring", "policyNumber", "insuranceImageKey"
      FROM "insurance"
      WHERE "insurance".user_id = "user".id) AS providerInsurance) AS insurance_array, 
  (SELECT JSON_AGG(providerMissionExperience)
    FROM
      (SELECT "missionExperience_id", "organizationName", "location", "startDate", "endDate", "referenceName", "referencePhone", "missionExperienceImageKey"
      FROM "mission_experience"
      WHERE "mission_experience".user_id = "user".id) AS providerMissionExperience) AS mission_experience_array, 
  (SELECT JSON_AGG(providerWorkExperience)
    FROM
      (SELECT "workplace", "jobTitle", "startDate", "endDate", "referenceName", "referencePhone", "referenceEmail" 
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
      res.sendStatus(500)
    })
})

/**
 * POST route for initial provider post from /generalinfo
 */
router.post('/', rejectUnauthenticated, (req, res) => {
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
      res.sendStatus(200)
    })
    .catch(error => {
      console.log('Error in Provider POST', error);
      res.sendStatus(500)
    })
});

router.post('/workhistoryitem', rejectUnauthenticated, async (req, res) => {
  // make a connection to pool client for transaction
  const client = await pool.connect();

  // make req.body available as workHistoryItems
  let workHistoryItems = req.body;

  // make variable for the user id
  const user_id = req.user.id;

  // queryText makes an insert statement to the work 
  // experience table
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

  try {

    // begin the transaction block
    await client.query('BEGIN;');

    // Promise.all aggregates multiple promises into
    // one and returns an array of results
    await Promise.all(
      // .map statement loops through workHistoryItems array
      workHistoryItems.map(workHistoryItem => {

        // destructure objects in the array
        const {
          workplace,
          jobTitle,
          referenceName,
          referencePhone,
          referenceEmailAddress,
          startDate,
          endDate
        } = workHistoryItem;

        return client.query(queryText, [workplace, jobTitle, referenceName, referencePhone, referenceEmailAddress, startDate, endDate, user_id]);
      }) // end loop
    ) // end Promise

    // commit changes to DB
    await client.query('COMMIT;');

    // send good response
    res.sendStatus(200);
    
  } catch (error) {

    console.error(`Error in workHistoryItems POST, changes rollback ${error}`);

    // erase any changes made that havent been commited
    await client.query('ROLLBACK;');

    // send bad response
    res.sendStatus(500);
    
  } finally {
    // release the pool connection
    await client.release();
  }
});


/**
 * Takes a years of experience value from /workhistory and updates wthe relevant column in the provider table
 */
router.put('/workhistory', rejectUnauthenticated, (req, res) => {
  const provider = req.body

  const queryText = `UPDATE "provider" SET "yearsExperience" = $1 WHERE "user_id" = $2; `;

  pool.query(queryText, [provider.yearsExperience, req.user.id])
    .then(result => {
      res.sendStatus(200)
    })
    .catch(error => {
      console.log('Error in Provider PUT', error);
      res.sendStatus(500)
    })
})

// Put request to the database to update the address info of the provider
router.put('/address', rejectUnauthenticated, (req, res) => {
  let updatedAddress = req.body;

  let queryText = `UPDATE "provider" SET "streetAddress" = $1, "city" = $2, "state" = $3, "zipCode" = $4, "phoneNumber" = $5 WHERE "user_id" = $6;`;

  pool.query(queryText, [updatedAddress.streetAddress, updatedAddress.city, updatedAddress.state, updatedAddress.zip, updatedAddress.phone, req.user.id])
    .then(response => {
      res.sendStatus(200)
    }).catch(err => {
      console.log('address put request error', err);
      res.sendStatus(500);
    })
})

/**
 * Takes an object from /education and posts it to the education table
 */
router.post('/educationhistoryitem', rejectUnauthenticated, async (req, res) => {
  // make a connection to pool client for transaction
  const client = await pool.connect();

  // make req.body available as educationhistoryItems
  const educationHistoryItems = req.body

  // make variable for the user id
  const user_id = req.user.id;

  // queryText runs insert statement to education table
  let queryText = `INSERT INTO "education"
  (
    "institution",
    "degree",
    "degreeImageKey",
    "startDate",
    "endDate",
    "user_id"
  )
  VALUES ($1, $2, $3, $4, $5, $6);
  `;

  try {

    // begin the transaction block
    await client.query('BEGIN;');

    // Promise.all aggregates multiple promises into
    // one and returns an array of results
    await Promise.all(
      // .map statement loops through educationHistoryItems array
      educationHistoryItems.map(educationHistoryItem => {

        // destructure objects in the array
        const {
          school,
          degree,
          degreeImageKey,
          startDate,
          endDate
        } = educationHistoryItem;

        return client.query(queryText, [school, degree, degreeImageKey, startDate, endDate, user_id]);
      }) // end loop
    ) // end Promise

    // commit changes to DB
    await client.query('COMMIT;');

    // send good response
    res.sendStatus(200);

  } catch (error) {

    console.error(`Error in educationHistoryItems POST, changes rollback ${error}`);

    // erase any changes made that havent been commited
    await client.query('ROLLBACK;');

    // send bad response
    res.sendStatus(500);

  } finally {
    // release the pool connection
    await client.release();
  }
})

router.post('/missionhistoryitem', rejectUnauthenticated, async (req, res) => {
  // make connection to pool client 
  // to initiate transaction
  const client = await pool.connect();

  // variable for the user id
  const user_id = req.user.id;

  // make req.body available as missionHistoryItems
  let missionHistoryItems = req.body;

  // queryText is an insert statement for mission experience table
  const queryText = `
    INSERT INTO "mission_experience" ("organizationName", "location", "referenceName", "referencePhone", "missionExperienceImageKey", "startDate", "endDate", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
  `;

  try {

    // begin the transaction block
    await client.query('BEGIN;');

    // Promise.all aggregates multiple promises into
    // one and returns an array of results
    await Promise.all(
      // .map statement loops through workHistoryItems array
      missionHistoryItems.map(missionHistoryItem => {

      // destructure objects in the array
      const {
        organization,
        location,
        referenceName,
        referencePhone,
        missionExperienceImageKey,
        startDate,
        endDate } = missionHistoryItem;

        return client.query(queryText, [organization, location, referenceName, referencePhone, missionExperienceImageKey, startDate, endDate, user_id]);
      }) // end loop
    ) // end Promise

    // commit changes to DB
    await client.query('COMMIT;');

    // send good response
    res.sendStatus(200);

  } catch (error) {

    console.error(`Error in missionHistoryItems POST, changes rollback ${error}`);

    // erase any changes made that havent been commited
    await client.query('ROLLBACK;');

    // send bad response
    res.sendStatus(500);

  } finally {
    // release the pool connection
    await client.release();
  }
})

router.post('/insuranceitem', rejectUnauthenticated, async (req, res) => {
  // make connection to pool client 
  // to initiate transaction
  const client = await pool.connect();

  // variable for the user id
  const user_id = req.user.id;

  // make req.body available as insuranceItems
  const insuranceItems = req.body;

  //define the query text of where you want to post in the database
  let queryText = `INSERT INTO "insurance" ("insuranceType", "insuranceProvider", "policyNumber", 
    "state", "insuranceImageKey", "dateInitial", "dateRenewed", "dateExpiring", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

  try {

    // begin the transaction block
    await client.query('BEGIN;');

    // Promise.all aggregates multiple promises into
    // one and returns an array of results
    await Promise.all(
      // .map statement loops through insuranceItems array
      insuranceItems.map(insuranceItem => {

        // destructure objects in the array
      const {
        insuranceType,
        insuranceProvider,
        policyNumber,
        state,
        insuranceImageKey,
        dateInitial,
        dateRenewed,
        dateExpiring } = insuranceItem;

      return client.query(queryText, [insuranceType, insuranceProvider, policyNumber, state, insuranceImageKey, dateInitial, dateRenewed, dateExpiring, user_id]);
      }) // end loop
    ) // end Promise

    // commit changes to DB
    await client.query('COMMIT;');

    // send good response
    res.sendStatus(200);

  } catch (error) {

    console.error(`Error in insuranceItems POST, changes rollback ${error}`);

    // erase any changes made that havent been commited
    await client.query('ROLLBACK;');

    // send bad response
    res.sendStatus(500);

  } finally {
    // release the pool connection
    await client.release();
  }
})


router.post('/credentialhistory', rejectUnauthenticated, async (req, res) => {
  // make a connection to pool client for transaction
  const client = await pool.connect();

  // req.body destructured by variables to post
  const providerCredentialArray = req.body

  // variable for user ID
  const user_id = req.user.id;

  const credentialInsertStatement = `
  INSERT INTO "credential" ("licensingBoard", "credentialName", "licenseNumber", "credentialImageKey", "dateInitial", "dateRenewed", "dateExpiring", "user_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
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
            credentialImageKey,
            dateReceived,
            dateRenewed,
            dateExpired } = medicalCredential

        return client.query(credentialInsertStatement, [licensingBoard, credentialTaxonomy, licenseNumber, credentialImageKey, dateReceived, dateRenewed, dateExpired, user_id]);

    }) )

    await client.query('COMMIT;');

    res.sendStatus(200);

  } catch (error) {

    console.error(`Error in Credential POST, changes rolledback ${error}`);

    await client.query('ROLLBACK;');

    res.sendStatus(500);

  } finally {
    // release the pool connection
    await client.release();
  }
})

router.put('/completeregistration', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "provider" SET "registrationComplete" = true
    WHERE "provider".user_id = $1
    ;`;

  pool.query(queryText, [req.user.id])
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error completing registration', error);

    })
})

// PUT Route to update provider table
router.put('/update/:userId/:providerId', rejectUnauthenticated, async (req, res) => {
  // destructure query params
  const {
    userId,
    providerId
  } = req.params;

  // destructure request body
  const {
    firstName,
    lastName,
    providerRole,
    phoneNumber,
    emailAddress,
    validPassport
  } = req.body;

  const updateQuery = 
    `UPDATE "provider" 
    SET "firstName" = $1,
    "lastName" = $2,
    "providerRole" = $3, 
    "phoneNumber" = $4,
    "emailAddress" = $5,
    "validPassport" = $6 
    WHERE provider_id = $7;`;

  if (userId == req.user.id) {

    // make a connection to pool client for transaction
    const client = await pool.connect();

    try {

      // start transaction block
      await client.query('BEGIN;');

      await client.query(updateQuery, [firstName, lastName, providerRole, phoneNumber, emailAddress, validPassport, providerId]);

      // commit changes to the DB
      await client.query('COMMIT;');

      // send good response
      res.sendStatus(204);
      
    } catch (error) {

      console.error(`Error in Provider PUT, changes rolledback ${error}`);

      await client.query('ROLLBACK;');
  
      res.sendStatus(500);
      
    } finally {
      // release the pool connection
      await client.release();
    }
  } else {

    res.sendStatus(401);

  }
}) // end provider table PUT

// PUT Route to update credential table
router.put('/update/credential/:userId/:credentialId', rejectUnauthenticated, async (req, res) => {
  // destructure query params
  const {
    userId,
    credentialId
  } = req.params;

  // destructure request body
  const {
    credentialTaxonomy,
    licensingBoard,
    licenseNumber,
    dateReceived,
    dateRenewed,
    dateExpired,
    credentialImageKey
  } = req.body;

  const updateQuery = 
    `UPDATE "credential"
    SET "credentialName" = $1,
    "licensingBoard" = $2,
    "licenseNumber" = $3,
    "dateInitial" = $4,
    "dateRenewed" = $5,
    "dateExpiring" = $6,
    "credentialImageKey" = $7
    WHERE credential_id = $8;
    `;

    if (userId == req.user.id) {

      // make a connection to pool client for transaction
      const client = await pool.connect();

      try {

        // start transaction block
        await client.query('BEGIN;');

        await client.query(updateQuery, [credentialTaxonomy, licensingBoard, licenseNumber, dateReceived, dateRenewed, dateExpired, credentialImageKey, credentialId]);

        // commit changes to the DB
        await client.query('COMMIT;');

        // send good response
        res.sendStatus(204);
        
      } catch (error) {

        console.error(`Error in Provider PUT, changes rolledback ${error}`);

        await client.query('ROLLBACK;');
    
        res.sendStatus(500);
        
      } finally {
        // release the pool connection
        await client.release();
      }

    } else {

      res.sendStatus(401);
      
    }
  })

router.put('/verify/:id', rejectUnauthenticated, (req, res) => {
  let verifyQuery = `
  UPDATE "provider"
  SET "verified" = TRUE
  WHERE "user_id" = $1;
  `;

  pool
  .query(verifyQuery, [req.params.id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.error('Error verifying provider: ', err);
    res.sendStatus(500);
  })
  
})

router.put('/disable/:id', rejectUnauthenticated, (req, res) => {
  let disableQuery = `
  UPDATE "provider"
  SET "verified" = FALSE
  WHERE "user_id" = $1;
  `;

  pool
  .query(disableQuery, [req.params.id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.error('Error disabling provider: ', err);
    res.sendStatus(500);
  })

})

module.exports = router;
