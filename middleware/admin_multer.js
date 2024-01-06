
const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        // Use the user's name and the current date for the filename
         // Adjust this based on your authentication setup
        const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

        const filename = `${currentDate}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedImageTypes = /jpeg|jpg|png/;
    const allowedVideoTypes = /mp4/;

    const isImage = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
    const isVideo = allowedVideoTypes.test(path.extname(file.originalname).toLowerCase());

    if (isImage || isVideo) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images (jpeg, jpg, png) and videos (mp4) are allowed.'));
    }
};

const uploadImage = multer({
    storage: Storage,
    fileFilter: fileFilter
}).single('file');

module.exports = uploadImage;
