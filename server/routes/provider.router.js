const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('got to provider GET 🧍‍♂️');
  res.send('🧍‍♂️');
});

/**
 * GET featured provider route template
 */
router.get('/:id', (req, res) => {
  console.log('got to selected provider GET 👨🏻‍⚕️');
  res.send('👨🏻‍⚕️');
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

module.exports = router;
