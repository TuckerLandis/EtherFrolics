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
  console.log('Reached provider POST:', req.body);
  
  
});

module.exports = router;
