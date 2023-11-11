const express = require('express')
const { status } = require('../helpers/constants/constants')
const utility = require('../helpers/utility')
const imageRouter = require('./images')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => res.status(status.SUCCESS).send(utility.successRes('CDN - Stitching App', [])))

router.use('/images', imageRouter)

module.exports = router
