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
  console.log('Reached provider reg POST:', req.body);
  res.sendStatus(200)

})

module.exports = router;
