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
    // await unlinkFile(file.path) // seems to work but throws an error, need to ask dane? - maybe just put it in the .then


        .then(result => {
            console.log('response from s3', result);
            res.send(result)
        })
        .catch(error => {
            console.log('error in image post', error);

        })

})


/**
 * GETs an individual image from bucket based on the image's key, stored in the db , this is protected by rejectNonAdmin middleware, and only to be used in the provider mgmt page
 */
router.get('/ind/:key', rejectNonAdmin, (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key)

    // pipes the readestream created in our s3.getObject function to the response object, for render
    readStream.pipe(res)
})

/**
 * GETs an individual image from bucket based on the image's key, stored in the db , this is protected by rejectUnauthenticated middleware, 
 * and needs to somehow validate req.user.id, to only get the key if the user is the user that the key is owned by. something like if (req.user.id !=== provider.credential_array[0].user_id) {return 'swiper no swiping'}
 */
 router.get('/prov/:key', rejectUnauthenticated, (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key)

    // pipes the readestream created in our s3.getObject function to the response object, for render
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
        // put more cases here for the different types of images we need to accept [transcript, missionCompletionPDF, medical credentials, insurance info]

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