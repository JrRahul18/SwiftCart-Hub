const express = require("express");
const cors = require("cors");
const app = express();
// const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

const productRoutes = require("./routes/Product");
const userRoutes = require("./routes/User");
const orderRoutes = require("./routes/Order");
const paymentRoutes = require("./routes/Payment");
const errorMiddleware = require("./middleware/Error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json({limit: '500mb'}))
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: "500mb",
  })
);
// app.use(express.urlencoded({extended: true}))
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

app.use(errorMiddleware);

module.exports = app;
