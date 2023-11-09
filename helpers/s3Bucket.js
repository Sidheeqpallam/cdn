const {
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { s3Client } = require('./config/s3')

const { S3_BUCKET_NAME, NODE_ENV } = process.env

const createObject = async (key, file) => {
  const env = NODE_ENV || 'development'
  const Key = `${env}/${key}`
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key,
    Body: file.buffer,
    ContentType: file.mimetype,
  }
  const command = new PutObjectCommand(params)
  return s3Client.send(command)
}

const getImageUrl = async (key) => {
  const env = NODE_ENV || 'development'
  const Key = `${env}/${key}`
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key,
  }
  let signedUrl
  try {
    const command = new GetObjectCommand(params)
    await s3Client.send(new HeadObjectCommand(params))
    signedUrl = getSignedUrl(s3Client, command, { expiresIn: 3600 })
  } catch (error) {
    if (error.name === 'NotFound') {
      signedUrl = 'https://picsum.photos/612/408'
    } else {
      signedUrl = 'https://picsum.photos/612/408'
    }
  }
  return signedUrl
}

const deleteFolder = async (folder) => {
  // not tested and verified
  const env = NODE_ENV || 'development'
  const listParams = {
    Bucket: S3_BUCKET_NAME,
    Prefix: `${env}/${folder}/`,
  }
  const listCommand = new ListObjectsV2Command(listParams)
  const response = await s3Client.send(listCommand)
  const objects = response.Contents
  const objectKeys = objects.map((obj) => ({ Key: obj.Key }))
  const deleteParams = {
    Bucket: S3_BUCKET_NAME,
    Delete: { Objects: objectKeys },
  }
  const deleteCommand = new DeleteObjectsCommand(deleteParams)
  return s3Client.send(deleteCommand)
}
const deleteObject = async (key) => {
  const env = NODE_ENV || 'development'
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: `${env}/${key}`,
  }
  const command = new DeleteObjectCommand(params)
  return s3Client.send(command)
}

module.exports = {
  createObject,
  getImageUrl,
  deleteFolder,
  deleteObject,
}
