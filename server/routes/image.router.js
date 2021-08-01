const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');

const { uploadFile } = require('../s3')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// endpoint for posting an image, succesfully posts to s3. this should likely be a transaction that both posts to s3, and then posts the images key to the DB
router.post('/', upload.single('image'), rejectUnauthenticated, async (req, res) => {

    const file = req.file
    const info = req.body // .type?

    console.log('file info', file);

    const result = await uploadFile(file)

    console.log('response from s3', result);



    res.sendStatus(200)
})









module.exports = router;