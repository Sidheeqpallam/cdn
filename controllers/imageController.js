const { status } = require('../helpers/constants/constants')
const utility = require('../helpers/utility')
const fs = require('fs-extra')
const path = require('path')

const getImage = async (req, res) => {
    try {
        // Read the file using fs-extra
        const filePath = path.join(__dirname, '/../public/images/test')
        const imageBuffer = await fs.readFile(filePath);
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
    } catch (error) {
        console.log(error)
    }
}

const postImage = async (req, res) => {
    try {
        const { env, entity, id, name, } = req.params
        const { file } = req
        if (!file) {
            return res.send('missing the file')
        }

        res.send('hello')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getImage,
    postImage,
}                 
