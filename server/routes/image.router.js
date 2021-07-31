const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');

const multer = require('multer')
const upload = multer({dest: 'uploads/' })

router.post('/', upload.single('image'), (req, res) => {
    res.sendStatus(200)
})









module.exports = router;