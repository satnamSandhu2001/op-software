// Create token and saving in cookie
const sendToken = async (user, statusCode, res) => {
  const token = await user.getJwtToken();
  user.password = undefined;
  console.log('Login token sent for user : ', user.name);
  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
