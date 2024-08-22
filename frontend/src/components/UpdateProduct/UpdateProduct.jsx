import React, { useEffect, useState } from "react";
import styles from "./UpdateProduct.module.css";
import "./UpdateProduct.css";
import AdminSidebar from "../layouts/AdminSidebar/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import { MdDescription } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { categoriesArray } from "../route/Products/Category";
import { FaBoxes } from "react-icons/fa";
import { MdImage } from "react-icons/md";
import { IoIosImages } from "react-icons/io";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductDetails,
  productDetailsClearError,
  putUpdateProduct,
  updateProductClearErrors,
} from "../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../reducers/productReducer";
import MetaData from "../layouts/MetaData/MetaData";
import Loading from "../layouts/LoadingPage/Loading";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { error: updateError, isUpdated } = useSelector(
    (store) => store.productCombine.productReducer
  );
  const { loading, error, product } = useSelector(
    (store) => store.productCombine.productDetailsReducer
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState();
  const [oldProductImageArray, setOldProductImageArray] = useState([]);
  const [productImageArray, setProductImageArray] = useState([]);
  const [prodImagePreview, setProdImagePreview] = useState([]);

  const updateImageHandler = (event) => {
    const files = Array.from(event.target.files);

    setProductImageArray([]);
    setProdImagePreview([]);
    setOldProductImageArray([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductImageArray((prev) => [...prev, reader.result]);
          setProdImagePreview((prev) => [...prev, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (product && product._id !== params.id) {
      // console.log("productid: ", product._id, "paramsid: ", params.id);
      dispatch(getProductDetails(params));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldProductImageArray(product.image);
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      dispatch(productDetailsClearError());
    }

    if (updateError) {
      toast.error(updateError, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      dispatch(updateProductClearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      dispatch(UPDATE_PRODUCT_RESET());
      navigate("/admin/products?productEditSuccess=true");
    }
  }, [dispatch, toast, error, isUpdated, params.id, product, updateError]);

  const editProductFormSubmitHandler = (event) => {
    event.preventDefault();

    const newForm = new FormData();

    newForm.set("name", name);
    newForm.set("price", price);
    newForm.set("description", description);
    newForm.set("stock", stock);
    newForm.set("category", category);

    productImageArray.forEach((image) => {
      newForm.append("image", image);
    });
    // console.log("imageArray length: ", productImageArray.length);

    dispatch(putUpdateProduct(params.id, newForm));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={"Update Product"} />
          <div className={styles.mainPage}>
            <AdminSidebar />
            <div className={styles.outerContainer}>
              <div className={styles.headingBox}>
                <h1 className={styles.heading}>Update Product Details</h1>
              </div>
              <hr className={styles.horizontalLine} />

              <div className={styles.formBox}>
                <form
                  encType="multipart/form-data"
                  action=""
                  className={styles.productForm}
                  onSubmit={editProductFormSubmitHandler}
                >
                  <div className={styles.headingBox}>
                    <h2 className={styles.heading}>Add Product Information</h2>
                  </div>

                  <div className={styles.nameInputBox}>
                    <MdOutlineDriveFileRenameOutline
                      className={styles.nameIcon}
                    />
                    <input
                      name="name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      required
                      type="text"
                      className={styles.nameInput}
                      placeholder="Enter Product Name"
                    />
                  </div>

                  <div className={styles.priceInputBox}>
                    <IoMdPricetags className={styles.priceIcon} />
                    <input
                      name="price"
                      value={price}
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                      required
                      className={styles.priceInput}
                      type="number"
                      placeholder="Enter Product Price"
                    />
                  </div>

                  <div className={styles.descriptionInputBox}>
                    <MdDescription className={styles.descriptionIcon} />
                    <textarea
                      name="description"
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                      required
                      className={styles.descriptionInput}
                      id=""
                      placeholder="Enter Product Description"
                    ></textarea>
                  </div>

                  <div className={styles.categoryInputBox}>
                    <BiCategory className={styles.categoryIcon} />
                    <select
                      value={category}
                      onChange={(event) => {
                        setCategory(event.target.value);
                      }}
                      className={styles.categoryInput}
                      name="category"
                      id=""
                    >
                      <option disabled value="">
                        Enter Category
                      </option>
                      {categoriesArray.map((item, index) => (
                        <option
                          className={styles.categoryOptions}
                          key={index}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.stockInputBox}>
                    <FaBoxes className={styles.stockIcon} />
                    <input
                      name="Stock"
                      value={stock}
                      onChange={(event) => {
                        setStock(event.target.value);
                      }}
                      required
                      className={styles.stockInput}
                      type="number"
                      placeholder="Enter Product Stock"
                    />
                  </div>

                  <div className={styles.imageInputBox}>
                    {/* <p>Attach Product Images</p> */}
                    <MdImage className={styles.imageIcon} />
                    <input
                      name="productImage"
                      onChange={updateImageHandler}
                      placeholder="Add Images of Product"
                      className={styles.imageInput}
                      type="file"
                      accept="image/"
                      multiple
                    />
                  </div>

                  <div className={styles.imagePreviewBox}>
                    <IoIosImages className={styles.imagePreviewIcon} />
                    <div className={styles.imageBox}>
                      {oldProductImageArray.length === 0 && (
                        <p>Your Product Images</p>
                      )}
                      {oldProductImageArray &&
                        oldProductImageArray.map((image, index) => (
                          <img
                            key={index}
                            className={styles.image}
                            src={image.url}
                            alt="Product Image"
                          />
                        ))}
                    </div>
                  </div>

                  <div className={styles.imagePreviewBox}>
                    <IoIosImages className={styles.imagePreviewIcon} />
                    <div className={styles.imageBox}>
                      {prodImagePreview.length === 0 && (
                        <p>Your Product Images</p>
                      )}
                      {prodImagePreview.map((image, index) => (
                        <img
                          key={index}
                          className={styles.image}
                          src={image}
                          alt="Product Image"
                        />
                      ))}
                    </div>
                  </div>

                  <div className={styles.createProductButtonBox}>
                    <button
                      disabled={loading ? true : false}
                      className={styles.createProductButton}
                    >
                      Update Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer containerId={"admin_updateProduct"}/>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
