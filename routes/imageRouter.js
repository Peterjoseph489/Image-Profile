const {
    createImage,
    getImages,
    getImage,
    updateImage,
    deleteImage
} = require('../controllers/imageController');
const upload = require('../utils/multer')

const express = require('express');
const route = express.Router();

route.post('/image', upload.fields( [ { name: "image", maxCount: 1 } ] ), createImage)
route.get('/images', getImages);
route.get('/image/:id', getImage);
route.put('/image/:id', upload.fields( [ { name: "image", maxCount: 1 } ] ), updateImage);
route.delete('/image/:id', deleteImage);

module.exports = route;