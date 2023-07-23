const tryCatchError = require('../middleware/tryCatchError');
const Subscription = require('../models/subscriptionModel');
const Order = require('../models/orderModel');
const path = require('path');
const fs = require('fs');
const { default: mongoose } = require('mongoose');
const ErrorHandler = require('../utils/errorHandler');

//file is uploaded using middleware in softwareRoute.js
exports.uploadSoftware = tryCatchError(async (req, res, next) => {
  let { item, name } = req.body;
  let filename = req.file.originalname;

  try {
    await Subscription.create({
      item,
      name,
      filename,
    });
  } catch (error) {
    try {
      fs.unlinkSync(
        path.join(__dirname, '../uploads/software/' + req.file.originalname)
      );
    } catch (err) {
      console.log(err);
    }
    console.log(error);
    return next(new ErrorHandler('Error Uploading Software', 500));
  }

  res.status(200).json({ success: true, message: 'Software Uploaded' });
});

exports.deleteSoftware = tryCatchError(async (req, res, next) => {
  const { id } = req.params;
  const findSoft = await Subscription.findById(id);

  if (findSoft) {
    const fileName = findSoft.filename;
    const deleteSoft = await Subscription.findByIdAndDelete(id);
    fs.unlinkSync(path.join(__dirname, '../uploads/software/' + fileName));

    console.log('Deleted : ', id);
    return res.status(200).json({
      success: true,
      message: 'Software deleted : ' + findSoft.name,
    });
  } else {
    return next(new ErrorHandler('Error Deleting Software', 404));
  }
});

exports.updateSoftware = tryCatchError(async (req, res, next) => {
  const { id } = req.params;
  const findSoft = await Subscription.findById(id);

  if (findSoft) {
    const oldfileName = findSoft.filename;
    try {
      fs.unlinkSync(path.join(__dirname, '../uploads/software/' + oldfileName));
    } catch (error) {
      console.log(error);
    }
    const newFileName = req.file.originalname;
    await Subscription.updateOne(
      { _id: id },
      {
        $set: { filename: newFileName },
      }
    );

    console.log('Updated : ', id);
    return res.status(200).json({
      success: true,
      message: 'Software updated : ' + findSoft.name,
    });
  } else {
    try {
      fs.unlinkSync(
        path.join(__dirname, '../uploads/software/' + req.file.originalname)
      );
    } catch (error) {
      console.log(error);
    }
    return next(new ErrorHandler('Error Updating Software', 404));
  }
});

exports.downloadSoftware = tryCatchError(async (req, res, next) => {
  const { id } = req.params;
  const findSoft = await Subscription.findById(id);

  if (!findSoft) {
    return next(
      new ErrorHandler('Software not found or has been deleted!', 404)
    );
  }
  const findOrder = await Order.findOne({
    'orderItem._id': new mongoose.Types.ObjectId(id),
    user: new mongoose.Types.ObjectId(req.user._id),
    expiryDate: { $gt: Date.now() },
  });
  if (!findOrder) {
    return next(
      new ErrorHandler(
        'You are not allowed to download this software or Your subscription is expired!',
        404
      )
    );
  }

  const filePath = path.join(
    __dirname,
    `../uploads/software/${findSoft.filename}`
  );

  res.setHeader('Content-type', 'application/x-msdownload');
  res.download(filePath, `${findSoft.filename.substr(7)}`, (err) => {
    if (err) {
      console.log(err);
      res.setHeader('Content-type', 'text/html');
      return next(new ErrorHandler('Error Downloading Software', 404));
    }
  });
});
