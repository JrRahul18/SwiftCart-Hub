const app = require("./app");

// const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDB = require("./config/database");



if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

process.on("uncaughtException", (error) => {
  console.log(`Uncaught Exception Error: `, error);
  console.log("Server Shutting Down");
  process.exit(1);
});

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`Unhandled Rejection Error: `, error);
  console.log("Server Shutting Down");
  server.close(() => {
    process.exit(1);
  });
});
