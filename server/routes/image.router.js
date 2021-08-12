const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)


const { uploadFile, getFileStream } = require('../s3') // handmade in s3.js

// multer import and config, this is what interprets files coming to this endpoint, reads formdata, etc
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

/**
 * endpoint for POSTing an image, succesfully posts to s3, sends result back to client
 * 
 *  */
router.post('/s3', upload.single('image'), rejectUnauthenticated, async (req, res) => {


    const file = req.file

    // uploads the image to s3
    const result = await uploadFile(file)

        .then(result => {
            res.send(result)
        })
        .then(() => {
         // scrubs image from server /uploads
        unlinkFile(file.path)
       
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
 * and needs to somehow validate req.user.id, to only get the key if the user is the user that the key is owned by.
 */

//  router.get('/prov/:userID/:key', rejectUnauthenticated, (req, res) => {
 router.get('/prov/:userID/:key', rejectUnauthenticated, (req, res) => {

    
    // checks to see if the currently logged in user matches the get request to protect images
    if (req.user.id == req.params.userID) {
        const key = req.params.key
        const readStream = getFileStream(key)

    // pipes the readestream created in our s3.getObject function to the response object, for render
    readStream.pipe(res)
    }
})

/** 
 * POST route for adding the image Key to the appropriate table in the database
 */
router.post('/db', rejectUnauthenticated, async (req, res) => {

    const image = req.body

    // sending a imageType from props where each image uploader is rendered, using the below switch statement to generate query text based on that
    switch (image.imageType) {
        case 'resume':
            queryText = `UPDATE "provider" SET "resumeKey" = $1 WHERE "provider".user_id = $2`;
            break

        // put more cases here for the different types of images we need to accept [transcript, missionCompletionPDF, medical credentials, insurance info]

    }
    pool.query(queryText, [image.payload.Key, req.user.id])
        .then(result => {
            res.sendStatus(200)
        })
        .catch(error => {
            console.log('error in posting image key to DB', error);

        })

})

module.exports = router;