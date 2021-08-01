const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');

const { uploadFile } = require('../s3')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// endpoint for posting an image, succesfully posts to s3. this should likely be a try catch finally that both posts to s3, and then posts the images key to the DB
router.post('/s3', upload.single('image'), rejectUnauthenticated, async (req, res) => {

    
    const file = req.file
    const info = req.body // .type?
    console.log('file info', file);
    // uploads the image to s3
    const result = await uploadFile(file)
    .then(result => {
        console.log('response from s3', result);
    res.send(result)
    })
    .catch(error => {
        console.log('error in image post', error);
        
    })
    
})


router.post('/db', rejectUnauthenticated, async (req, res) => {

    const image = req.body
    console.log(image);

    switch (image.imageType) {
        case 'resume' :
            queryText = `UPDATE "provider" SET "resumeKey" = $1 WHERE "provider".user_id = $2`;
            break
    }
    
    pool.query(queryText, [image.payload.Location, req.user.id])
    .then(result => {
        console.log(result);
        
        res.sendStatus(200)
    })
    .catch(error => {
        console.log('error in posting image key to DB', error);
        
    })
    
})








module.exports = router;