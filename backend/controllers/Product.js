const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncErrors = require("../middleware/CatchAsyncErrors");
const APIFEATURES = require("../utils/ApiFeatures");

const cloudinary = require("cloudinary");

//admin route
// exports.createProduct = async (req, res, next) => {
//   const product = await Product.create(req.body);
//   res.status(201).json({ success: true, product });
// };

// exports.updateProduct = async (req, res, next) => {
//   let temp = await Product.findById(req.params.id);

//   if (!temp) {
//     return next(new ErrorHandler("Product not found :/", 404));
//   }
//   temp = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({ success: true, temp });
// };

// exports.deleteProduct = async (req, res, next) => {
//   const temp = await Product.findById(req.params.id);
//   if (!temp) {
//     return next(new ErrorHandler("Product not found :/", 404));
//   }
//   // temp = await Product.findByIdAndDelete(req.params.id);

//   await Product.findByIdAndDelete(req.params.id);

//   res
//     .status(200)
//     .json({ success: true, message: "Product Deleted Successfully", temp });
// };

// exports.getAllProducts = async (req, res, next) => {
//   const allProducts = await Product.find();
//   res.status(200).json({
//     success: true,
//     allProducts,
//   });
// };

// exports.getProduct = async (req, res, next) => {
//   const temp = await Product.findById(req.params.id);
//   if (!temp) {
//     return next(new ErrorHandler("Product not found :/", 404));
//   }
//   return res.status(200).json({
//     success: true,
//     temp,
//   });
// };

exports.createProduct = CatchAsyncErrors(async (req, res, next) => {
  let imagesArrays = [];
  if (typeof req.body.image === "string") {
    imagesArrays.push(req.body.image);
  } else {
    imagesArrays = req.body.image;
  }

  const imagesLinkArray = [];

  for (let i = 0; i < imagesArrays.length; i++) {
    const result = await cloudinary.v2.uploader.upload(imagesArrays[i], {
      folder: "products",
    });

    imagesLinkArray.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.image = imagesLinkArray;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

exports.updateProduct = CatchAsyncErrors(async (req, res, next) => {
  let temp = await Product.findById(req.params.id);

  if (!temp) {
    return next(new ErrorHandler("Product not found :/", 404));
  }

  let imagesArrays = [];
  if (typeof req.body.image === "string") {
    imagesArrays.push(req.body.image);
  } else {
    imagesArrays = req.body.image;
  }

  if (imagesArrays !== undefined) {
    for (let i = 0; i < temp.image.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        temp.image[i].public_id
      );
    }

    const imagesLinkArray = [];

    for (let i = 0; i < imagesArrays.length; i++) {
      const result = await cloudinary.v2.uploader.upload(imagesArrays[i], {
        folder: "products",
      });

      imagesLinkArray.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.image = imagesLinkArray;
  }

  temp = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, temp });
});

exports.deleteProduct = CatchAsyncErrors(async (req, res, next) => {
  const temp = await Product.findById(req.params.id);
  if (!temp) {
    return next(new ErrorHandler("Product not found :/", 404));
  }
  // temp = await Product.findByIdAndDelete(req.params.id);

  for (let i = 0; i < temp.image.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      temp.image[i].public_id
    );
  }

  await Product.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully", temp });
});

exports.getAllProducts = CatchAsyncErrors(async (req, res, next) => {
  // return next(new ErrorHandler("This is temp error", 500));
  const perPage = 5;
  const productCount = await Product.countDocuments();
  // console.log(`GETALL PRODUCTS`, req.query)
  const apiFeatures = new APIFEATURES(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredCount = products.length;

  apiFeatures.pagination(perPage);

  const productsQuery = apiFeatures.query.clone();
  const allProducts = await productsQuery;

  res.status(200).json({
    success: true,
    allProducts,
    perPage,
    productCount,
    filteredCount,
  });
});

exports.getProduct = CatchAsyncErrors(async (req, res, next) => {
  // console.log("From Backend", req.params.id)

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found :/", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

exports.createReview = CatchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const extractReview = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };
  // console.log(`.ID`, req.user.id);
  // console.log(extractReview);
  const getProductData = await Product.findById(productId);

  const isReviewed = getProductData.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    getProductData.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        (review.rating = rating), (review.comment = comment);
      }
    });
  } else {
    getProductData.reviews.push(extractReview);
    getProductData.numberOfReviews = getProductData.reviews.length;
  }
  let totalRatings = 0;
  getProductData.ratings = getProductData.reviews.forEach((review) => {
    totalRatings += Number(review.rating);
  });
  getProductData.ratings = totalRatings / getProductData.reviews.length;

  await getProductData.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, updatedProductData: getProductData });
});

exports.getProductReviews = CatchAsyncErrors(async (req, res, next) => {
  const extractProductId = req.query.productId;
  const getProduct = await Product.findById(extractProductId);
  // if (!getProduct) {
  //   return next(new ErrorHandler("Product not found :/", 404));
  // }
  res.status(200).json({ success: true, allReviews: getProduct.reviews });
});

exports.deleteReview = CatchAsyncErrors(async (req, res, next) => {
  const extractProductId = req.query.productId;
  const getProduct = await Product.findById(extractProductId);
  if (!getProduct) {
    return next(new ErrorHandler("Product not found :/", 404));
  }
  const newReviewsData = getProduct.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  let totalRatings = 0;
  newReviewsData.forEach((review) => {
    totalRatings += Number(review.rating);
  });
  let newRatings = 0;
  if (newReviewsData.length === 0) {
    newRatings = 0;
  } else {
    newRatings = totalRatings / newReviewsData.length;
  }
  const newNumberOfReviews = newReviewsData.length;

  const updatedProductData = await Product.findByIdAndUpdate(
    extractProductId,
    {
      reviews: newReviewsData,
      ratings: newRatings,
      numberOfReviews: newNumberOfReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  // console.log(updatedProductData);

  res.status(200).json({
    success: true,
    updatedProductReviews: updatedProductData.reviews,
  });
});

exports.getAllAdminProducts = CatchAsyncErrors(async (req, res, next) => {
  // return next(new ErrorHandler("This is temp error", 500));

  const adminAllProducts = await Product.find();

  res.status(200).json({
    success: true,
    adminAllProducts,
  });
});
