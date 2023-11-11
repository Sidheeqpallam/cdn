const router = require('express').Router()
const imageController = require('../controllers/imageController')
const { upload } = require('../helpers/config/multer')

router.get('/fit-in/:resolution/:entity/:id/:name', imageController.getImage)
router.get('/:entity/:id/:name', imageController.getImage)
router.post('/:env/:entity/:id/:name', upload.single('test'), imageController.postImage)




module.exports = router
