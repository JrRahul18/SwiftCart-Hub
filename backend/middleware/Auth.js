const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncErrors = require("./CatchAsyncErrors");
const jwtToken = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.isAuthenticated = CatchAsyncErrors(async (req, res, next) => {
  const {token} = req.cookies;
  // console.log("User token(from auth.js): ",req.cookies);
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const data = jwtToken.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(data.id);

  next();
});

// exports.checkRole = (...roles) => {
//     console.log(`ROLES`, roles)
//   // return next(new ErrorHandler("Please login to access this resource", 401));
//   // next();
//   return (req, res, next) => {
//     return next(new ErrorHandler("Please addin to access this resource", 401));
//   };
// };
exports.checkRole = (...roles) => {
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
          console.log("Not admin")
            return next(new ErrorHandler(`User with role: ${req.user.role} is not allowed to access the resource`, 403))
        }
        next();
    }
};
