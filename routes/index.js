const express = require('express')
const { status } = require('../helpers/constants/constants')
const utility = require('../helpers/utility')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => res.status(status.SUCCESS).send(utility.successRes('CDN - Stitching App', [])))

router.get('/', (req, res) => res.send('api is pending...'))

module.exports = router