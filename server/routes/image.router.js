const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)


const { uploadFile, getFileStream } = require('../s3') // handmade in s3.js

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

/**
 * endpoint for POSTing an image, succesfully posts to s3, sends result back to client
 * 
 *  */
router.post('/s3', upload.single('image'), rejectUnauthenticated, async (req, res) => {


    const file = req.file
    const info = req.body // .type?
    console.log('file info', file);

    // uploads the image to s3
    const result = await uploadFile(file)

    // scrubs image from server /uploads
    // await unlinkFile(file.path)


        .then(result => {
            console.log('response from s3', result);
            res.send(result)
        })
        .catch(error => {
            console.log('error in image post', error);

        })

})


/**
 * GETs an individual image from bucket based on the image's key, stored in the db
 */
router.get('/ind/:key', rejectNonAdmin, (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
})



/** 
 * POST route for adding the image Key to the appropriate table in the database
 */
router.post('/db', rejectUnauthenticated, async (req, res) => {

    const image = req.body

    console.log(image);


    // sending a imageType from props where each image uploader is rendered, using the below switch statement to generate query text based on that
    switch (image.imageType) {
        case 'resume':
            queryText = `UPDATE "provider" SET "resumeKey" = $1 WHERE "provider".user_id = $2`;
            break


    }
    pool.query(queryText, [image.payload.Key, req.user.id])
        .then(result => {
            console.log(result);

            res.sendStatus(200)
        })
        .catch(error => {
            console.log('error in posting image key to DB', error);

        })

})








module.exports = router;