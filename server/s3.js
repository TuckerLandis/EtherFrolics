require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

// sourcing in ENV vars for aws config, these are subject to change, i think if we set proc.env vars in heroku, they will be picked up, as our .env file is git-ignored
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

//instantiate a new s3 instance for this app, using .env vars ^
const s3 = new S3({
    region, 
    accessKeyId,
    secretAccessKey,
})

// upload image object to s3, return KEY for submitting to db
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    // sets new uploadParams config object based on our .env and the fileName. 
    // here we are using the filename from multer
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    
    // returns an upload function (built into s3 SDK, as a promise)
    return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile


// download object from s3
function getFileStream(fileKey) {

    // sets downloadParams config object to the passed in fileKey, and the bucketName in our .env
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
    
}
exports.getFileStream = getFileStream

// (fileKey.includes('IMG')) 