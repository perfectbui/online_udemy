const multer = require('multer');
const { findById } = require('../models/User');

const diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads/videos');
    },
    filename: (req, file, callback) => {
        let extensionFile;
        if (file.mimetype === 'image/png') {
            extensionFile = 'png';
        } else {
            extensionFile = 'mp4';
        }

        // Tên của file gán bằng thời gian để đảm bảo không bị trùng.
        const filename = `${Date.now()}.${extensionFile}`;
        callback(null, filename);
    },
});

module.exports = multer({
    storage: diskStorage,
});