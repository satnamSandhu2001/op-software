const tryCatchError = require('../middleware/tryCatchError');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
var resetPasswordfilePath = path.join(
  __dirname,
  '../utils/resetPasswordEmail.html'
);
var contactFormEnquiryEmail = path.join(
  __dirname,
  '../utils/contactFormEnquiryEmail.html'
);

// Register a user
exports.registerUser = tryCatchError(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user;

  user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 200, res);
});

// Login user
exports.loginUser = tryCatchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('Please Enter Email & Password!!', 400));
  }
  //   .select('+password'); used because password select : false in userMode
  let user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password!!', 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password!!', 401));
  }

  sendToken(user, 200, res);
});
// logout user
exports.logout = tryCatchError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: 'Logged Out' });
});

//Forgot password
exports.forgotPassword = tryCatchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ErrorHandler('No Account found associated with this email', 404)
    );
  }

  fs.readFile(
    resetPasswordfilePath,
    { encoding: 'utf-8' },
    async function (err, data) {
      if (err) {
        return next(
          new ErrorHandler(
            'Email Service unavailable. Please try again later',
            404
          )
        );
      }

      // Get reset token
      const resetToken = user.getResetPasswordToken();
      // save user because in userModel(middleware) we only stored values of resetPasswordToken
      await user.save({
        validateBeforeSave: false,
      });

      const resetPasswordUrl = `${req.protocol}://${req.get(
        'host'
      )}/password/reset/${resetToken}`;

      data = data.toString();
      data = data.replace(/##replaceUrl/g, resetPasswordUrl);

      try {
        await sendEmail({
          email: user.email,
          subject: 'Opsoftware Password Recovery',
          message: data,
        });
        let privacyEmail =
          user.email.slice(0, 3) +
          '.....' +
          user.email.split('@')[0].slice(-3) +
          '@' +
          user.email.split('@')[1];
        res.status(200).json({
          success: true,
          message: `Please Check Your Mail ${privacyEmail}`,
        });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({
          validateBeforeSave: false,
        });
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );
});
// reset password
exports.resetpassword = tryCatchError(async (req, res, next) => {
  // Hashing password to match in database
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  let user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler('Reset Password Token Is Invalid or has been Expired')
    );
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't Match"));
  }
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  await sendToken(user, 200, res);
});

// Get user self details
exports.getUserDetails = tryCatchError(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});
// Update User password
exports.updatePassword = tryCatchError(async (req, res, next) => {
  let user = await User.findById(req.user.id).select('+password');
  if (req.body.newPassword.length < 8) {
    return next(
      new ErrorHandler('Password Must be greater than 8 characters', 400)
    );
  }
  let resetPassword = await user.comparePassword(req.body.oldPassword);
  if (!resetPassword) {
    return next(new ErrorHandler('Old Password is Incorrrect', 400));
  }
  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler('Password not Match', 400));
  }
  user.password = req.body.newPassword;
  await user.save({ validateBeforeSave: true });

  sendToken(user, 200, res);
});
// Update User profile
exports.updateProfile = tryCatchError(async (req, res, next) => {
  let { name } = req.body;
  let user = await User.findByIdAndUpdate(req.user._id, { $set: { name } });
  if (!user) {
    return next(new ErrorHandler("User doesn't Exist!!"));
  }
  res.status(200).json({ success: true });
});
// Update User role --Admin
exports.updateUser = tryCatchError(async (req, res, next) => {
  const { id } = req.params;

  if (id === req.user._id.toString().split('"')[0]) {
    return next(
      new ErrorHandler("Request Denied! You can't edit your own role", 403)
    );
  }
  let user = await User.findByIdAndUpdate(id, {
    $set: { role: req.body.role },
  });
  if (!user) {
    return next(new ErrorHandler("User doesn't Exist!!"));
  }
  res.status(200).json({ success: true });
});
// Get individual user --Admin
exports.getSingleUserDetails = tryCatchError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler('User not exist!'), 404);
  }
  res.status(200).json({ success: true, user });
});
// Get all user details --Admin
exports.getAllUserDetails = tryCatchError(async (req, res, next) => {
  let users = await User.find({
    _id: {
      $ne: { _id: new mongoose.Types.ObjectId(req.user._id) },
    },
  });
  res.status(200).json({ success: true, users });
});
// Delete User
exports.deleteUser = tryCatchError(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler('Error Deleting Account!'), 404);
  }
  await user.deleteOne();
  res.status(201).json({ success: true, message: 'Account Deleted' });
});
exports.deleteSelfAccount = tryCatchError(async (req, res, next) => {
  let user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler('Error Deleting Account!'), 404);
  }
  if (user.role == 'admin') {
    return next(
      new ErrorHandler('Admin cannot delete their account Itself!'),
      404
    );
  }
  await user.deleteOne();
  res.status(201).json({ success: true, message: 'Account Deleted' });
});
exports.contactForm = tryCatchError(async (req, res, next) => {
  const { name, email, phone, message } = req.body;
  if ((!name, !email, !phone, !message)) {
    return next(new ErrorHandler('Fill all the required fields!'), 403);
  }

  fs.readFile(
    contactFormEnquiryEmail,
    { encoding: 'utf-8' },
    async function (err, data) {
      if (err) {
        return next(
          new ErrorHandler(
            'Enquiry Service unavailable. Please try again later',
            404
          )
        );
      }

      data = data.toString();
      data = data
        .replace(/##name/g, name)
        .replace(/##email/g, email)
        .replace(/##phone/g, phone)
        .replace(/##message/g, message);

      try {
        let admins = await User.find({ role: 'admin' })
          .sort({ createdAt: -1 })
          .limit(2);

        await Promise.all(
          admins.map(async (admin) => {
            try {
              await sendEmail({
                email: admin.email,
                subject: 'Opsoftware Enquiry',
                message: data,
              });
            } catch (error) {
              console.log(error);
            }
          })
        );
        res.status(200).json({
          success: true,
          message: 'Thanks for reaching out, We will get back to you shortly',
        });
      } catch (error) {
        return new ErrorHandler(
          'Enquiry Service unavailable. Please try again later',
          404
        );
      }
    }
  );
});
