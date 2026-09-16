const multer = require('multer');
const path = require('path');
const { Readable } = require('stream');
const cloudinary = require('../config/cloudinary');

// 1. RAM Memory Storage - Does NOT write files to local disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp4|webm|ogg|mov|jpeg|jpg|png|gif|webp|pdf|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname || mimetype) {
    return cb(null, true);
  }
  cb(new Error('Only video, image, and pdf files are allowed!'), false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: fileFilter,
});

const uploadToCloudinary = (fileBuffer, folder = 'svasc', resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
      return reject(new Error('Invalid file buffer for upload'));
    }

    const options = {
      folder: folder,
      resource_type: resourceType,
      chunk_size: 6000000, // 6MB chunks for fast video & large media transfer
      timeout: 300000, // 5 min timeout for high quality videos
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.on('error', (err) => {
      reject(err);
    });

    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

upload.uploadToCloudinary = uploadToCloudinary;

module.exports = upload;
module.exports.uploadToCloudinary = uploadToCloudinary;
