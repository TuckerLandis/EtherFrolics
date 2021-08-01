const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');

const { uploadFile } = require('../s3')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// endpoint for posting an image, succesfully posts to s3. this should likely be a try catch finally that both posts to s3, and then posts the images key to the DB
router.post('/', upload.single('image'), rejectUnauthenticated, async (req, res) => {

    
    const file = req.file
    const info = req.body // .type?
    console.log('file info', file);
    // uploads the image to s3
    const result = await uploadFile(file)
    .then(result => {
        console.log('response from s3', result);
    res.sendStatus(result)
    })
    .catch(error => {
        console.log('error in image post', error);
        
    })
    
})









module.exports = router;