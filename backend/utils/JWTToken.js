const shareToken = (user, statusCode, res) => {
  const token = user.getToken();
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    path: '/'
  };
  console.log("TOKEN (from shareToken): ", token);
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token: token,
    message: "Login successful",
  });
};

module.exports = shareToken;
