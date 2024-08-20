const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncErrors = require("../middleware/CatchAsyncErrors");
const shareToken = require("../utils/JWTToken");
const sendEmailFunction = require("../utils/EmailTemplate");
const crypto = require("crypto");
const cloudinary = require("cloudinary")

exports.createUser = CatchAsyncErrors(async (req, res, next) => {
  // const { name, email, password } = req.body;

  const myCloud = await cloudinary.v2.uploader.upload(req.body.profileImage, {folder: 'Profile Image', width: 150, crop: "scale"});
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  const user = await User.create({
    name,
    email,
    password,
    profileImage: { public_id: myCloud.public_id , url: myCloud.secure_url },
    role
  });
  shareToken(user, 201, res);
});

exports.loginUser = CatchAsyncErrors(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log("Email: ", email, "Password: ", password)

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    // console.log("Invalid email or password")
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const checkPassword = await user.comparePassword(password);
  if (!checkPassword) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  // const token = user.getToken();
  // res.status(200).json({ success: true, user, token });
  console.log("Userjs Controller: ABOUT TO LOGIN");
  // console.log("res: ", res)
  shareToken(user, 200, res);
});

exports.logoutUser = CatchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
  });
  console.log("Userjs Controller: ABOUT TO LOGOUT");
  res.status(200).json({ success: true, message: "Logged Out Successfully" });
});

exports.postForgetPassword = CatchAsyncErrors(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new ErrorHandler("User not registered :/", 404));
  }

  const resetToken = user.resetPassword();
  console.log(`RESETToken: `, resetToken);

  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  const messageTemplate = `Hey User!  \n\n
  Your password reset token is: \n
  ${resetUrl} \n\n
  NOTE: If you have not requested this email then, please ignore it`;

  try {
    await sendEmailFunction({
      email: user.email,
      subject: `SwiftCart Hub Password Recovery`,
      message: messageTemplate,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully! `,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {
  //CREATING TOKEN HASH
  const extractToken = req.params.token;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(extractToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Invalid Reset token or token is expired :/", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("New password does not match with confirm password", 400)
    );
  }

  user.password = req.body.password;
  console.log("New Password", user.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  shareToken(user, 200, res);
});

exports.myAccountDetails = CatchAsyncErrors(async (req, res, next) => {
  const getId = req.user.id;
  const user = await User.findById(getId);
  // console.log("HEREEEEEE")
  if (!user) {
    return next(
      new ErrorHandler(
        "User not logged in(This error may not even get called)",
        401
      )
    );
  }
  res.status(200).json({
    success: true,
    user: user,
  });
});

exports.changePassword = CatchAsyncErrors(async (req, res, next) => {
  const getId = req.user.id;
  const user = await User.findById(getId).select("+password");
  if (!user) {
    return next(
      new ErrorHandler(
        "User not logged in(This error may not even get called)",
        401
      )
    );
  }
  const checkPassword = await user.comparePassword(req.body.currentPassword);
  if (!checkPassword) {
    return next(new ErrorHandler("Current Password is incorrect", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("New password does not match with confirm password", 400)
    );
  }
  user.password = req.body.newPassword;
  await user.save();

  shareToken(user, 200, res);
});

exports.updateUser = CatchAsyncErrors(async (req, res, next) => {
  const getId = req.user.id;
  // console.log(getId)
  
  const newUser = { name: req.body.name, email: req.body.email };
  if(req.body.profileImage !== ""){
    const user = await User.findById(getId);
    const imageId = user.profileImage.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.profileImage, {folder: 'Profile Image', width: 150, crop: "scale"});

    newUser.profileImage = { public_id: myCloud.public_id , url: myCloud.secure_url }
  }
  const user = await User.findByIdAndUpdate(getId, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({ success: true, user: user });
  // shareToken(user, 200, res);
});

exports.getAllUsersDetails = CatchAsyncErrors(async (req, res, next) => {
  const allUsersData = await User.find();
  res.status(200).json({ success: true, allUsers: allUsersData });
});

exports.getUserDetails = CatchAsyncErrors(async (req, res, next) => {
  const extractId = req.params.id;
  const userData = await User.findById(extractId);
  if (!userData) {
    return next(
      new ErrorHandler(`User with id ${extractId} does not exists`, 400)
    );
  }
  res.status(200).json({ success: true, user: userData });
});

exports.updateUserRole = CatchAsyncErrors(async (req, res, next) => {
  const extractId = req.params.id;
  const findUser = await User.findById(extractId);
  if(!findUser){
    return next(
      new ErrorHandler(`User with id ${extractId} does not exists`, 400)
    );
  }
  const newUser = { name: req.body.name, email: req.body.email, role: req.body.role };
  const user = await User.findByIdAndUpdate(extractId, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({ success: true, user: user });
  // shareToken(user, 200, res);
});

exports.deleteUser = CatchAsyncErrors(async (req, res, next) => {
  const extractId = req.params.id;

  const user = await User.findById(extractId);
  if(!user){
    return next(
      new ErrorHandler(`User with id ${extractId} does not exists`, 400)
    );
  }

  const imageId = user.profileImage.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.deleteOne();
  res.status(200).json({ success: true, message: "User deleted successfully", userDeleted: user });
  // shareToken(user, 200, res);
});

