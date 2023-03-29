const express = require('express');
const {
  uploadSoftware,
  deleteSoftware,
  updateSoftware,
  downloadSoftware,
} = require('../controlers/softwareController');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const tryCatchError = require('../middleware/tryCatchError');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../uploads/software/'));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      (null,
      (file.originalname =
        Math.floor(Math.random() * 1000000) +
        '-' +
        file.originalname.replace(' ', '-')))
    );
  },
});
const upload = multer({ storage: storage });

router
  .route('/software')
  .post(
    isAuthenticatedUser,
    authorizedRoles('admin'),
    tryCatchError(upload.single('software')),
    uploadSoftware
  );

router
  .route('/software/:id')
  .get(isAuthenticatedUser, downloadSoftware)
  .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteSoftware)
  .put(
    isAuthenticatedUser,
    authorizedRoles('admin'),
    tryCatchError(upload.single('software')),
    updateSoftware
  );

module.exports = router;
