import { useEffect, useState } from "react";
import { volkswagen_parts } from "../../../Data/volkswagen_parts";
import ProductCard from "../Product/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Rating,
  Typography,
} from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { findProductById, getProducts } from "../../../State/Product/action";
import { addItemToCart } from "../../../State/Cart/action";

const specs = [
  { id: "weight", label: "Weight", value: "-" },
  { id: "dimensions", label: "Dimensions (L*B*H)", value: "-" },
  { id: "carMake", label: "Car Make", value: "-" },
  { id: "carModel", label: "Car Model", value: "-" },
  { id: "carSubModel", label: "Car Sub Model", value: "-" },
  { id: "partBrand", label: "Part Brand", value: "-" },
  { id: "partOrigin", label: "Part Origin", value: "-" },
  { id: "netQuantity", label: "Net Quantity", value: "-" },
  { id: "countryOfOrigin", label: "Country Of Origin", value: "-" },
  { id: "partNumber", label: "Part Number", value: "-" },
  { id: "partCategory", label: "Part Category", value: "-" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  // Functions to handle quantity selector
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity === "" ? 1 : prevQuantity + 1));
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (value === "" || (!isNaN(value) && parseInt(value, 10) > 0)) {
      setQuantity(value === "" ? "" : parseInt(value, 10));
    }
  };

  const navigate = useNavigate();

  const handleAddToCart = () => {
    const data = { productId: params.productId, quantity: quantity };
    dispatch(addItemToCart(data));
    navigate("/cart");
  };

  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector((store) => store.product.product);
  const loading = useSelector((store) => store.product.loading);
  const inStock = product?.quantity === 0 ? "Out Of stock" : "In Stock";

  const relatedProducts = useSelector(
    (store) => store.product.pageData.content
  )?.filter((p) => p._id !== product?._id);

  useEffect(() => {
    // Dispatch to fetch product by ID first
    dispatch(findProductById(params.productId));
  }, [params.productId, dispatch]);

  useEffect(() => {
    // Ensure the product is loaded and category is available
    if (product && product.category) {
      const category = product?.category?.level2; // Extract category from product
      if (category) {
        const data = {
          category: category,
          carMake: null,
          minPrice: 0,
          maxPrice: 100000,
          minDiscount: 0,
          sort: null,
          stock: "in_stock",
          pageNumber: 1,
          pageSize: 10,
        };

        setLoadingRelated(true);
        dispatch(getProducts(data)).finally(() => {
          setLoadingRelated(false);
        });
      }
    }
  }, [product, dispatch]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          {/* TO DO: implement breadcrumbs */}
          {/* <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900 hover:text-gray-600"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:cursor-text"
              >
                {product.name}
              </a>
            </li>
          </ol> */}
        </nav>

        {/* Product overview */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                // alt={product.images[0].alt}
                src={product?.imageUrl}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {/* {product.images.map((item) => (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                  <img
                    alt={item.alt}
                    src={item.src}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))} */}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 max-h-auto max-w-2xl px-4 pb-2 sm:px-6 lg:max-w-7xl lg:px-8 text-left">
            <div className="lg:col-span-2 border-b pb-2 mb-5">
              <h1 className="text-base lg:text-lg font-semibold text-gray-900 opacity-60 cursor-pointer hover:opacity-80">
                {product?.category.name}
              </h1>
              <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 pt-1">
                {product?.title}
              </h1>
              <div className="mt-3">
                <span className=" text-gray-600">Availability: </span>
                <span className="text-green-600 font-semibold">{inStock}</span>
              </div>
            </div>

            {/* Price */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center">
                <p className="text-3xl tracking-tight text-gray-900">
                  ₹{product?.discountedPrice}
                </p>
                <p className="text-xl tracking-tight text-gray-900 opacity-60 line-through">
                  ₹{product?.price}
                </p>
                <p className="text-xl text-green-600 font-semibold">
                  {product?.discountPercent}% off
                </p>
              </div>

              {/* Rating and reviews preview*/}
              {/* TO DO: implement ratings and reviews preview */}
              {/* <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={4.5} readOnly />
                  <p className="opacity-60 text-sm">100 Ratings</p>
                  <p className="ml-3 text-sm font-medium text-[#7f0000] hover:opacity-50">
                    80 Reviews
                  </p>
                </div>
              </div> */}

              <form className="mt-10">
                <div className="flex items-center">
                  {/* Quantity Selector */}
                  <div className="flex flex-col items-start mr-4">
                    <span className="mb-2 text-base font-medium text-gray-700">
                      Quantity
                    </span>

                    <div className="flex items-center mb-4">
                      <button
                        type="button"
                        onClick={decrementQuantity}
                        className="px-2 py-1 bg-[#2c2c2c] hover:bg-[#4c4c4c] rounded-l-md text-white"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        onChange={handleInputChange}
                        className="w-12 text-center border-t border-b border-[#2c2c2c]"
                      />
                      <button
                        type="button"
                        onClick={incrementQuantity}
                        className="px-2 py-1 bg-[#2c2c2c] hover:bg-[#4c4c4c] rounded-r-md text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#7f0000] px-2 sm:px-8 py-3 text-base font-medium text-white hover:bg-[#500000] focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </div>
              </form>
            </div>

            {/* Description and Highlights*/}
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-4 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-semibold text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {product?.highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product specs and compatibility*/}
        <section className="flex flex-col justify-center px-8 lg:px-24 pb-8 text-left ">
          {/* Specifications */}
          <h2 className="text-lg font-semibold mb-4">Specifications</h2>
          <div className="border border-gray-300 rounded-lg p-4 w-full mb-10">
            {specs.map((detail, index) => (
              <div
                key={index}
                className={`grid grid-cols-2 py-2 ${
                  index !== specs.length - 1 ? "border-b border-gray-300" : ""
                }`}
              >
                <span className="font-semibold">{detail.label}</span>
                <span>{product?.specifications?.[detail.id]}</span>
              </div>
            ))}
          </div>
          {/* Compatibility */}
          <h2 className="text-lg font-semibold mb-2">Compatibility</h2>
          <div className="mt-4">
            <ul className="list-disc space-y-2 pl-4 text-base">
              {product?.compatibility.map((compatibleVehicle, index) => (
                <li key={index} className="text-gray-400">
                  <span className="text-gray-900">{compatibleVehicle}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Rating and reviews*/}
        {/* TO DO: implement ratings and reviews */}
        {/* <section className="px-8 lg:px-24 pb-8">
          <Typography
            variant="h5"
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
            className="font-semibold pb-4 text-left"
          >
            Ratings and Reviews
          </Typography>
          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={12} md={5}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                  className="font-semibold pb-1 text-left"
                >
                  Product Ratings
                </Typography>
                <div className="flex items-center space-x-3 pt-2">
                  <Rating value={4.6} precision={0.5} readOnly />
                  <Typography sx={{ opacity: 0.6, fontSize: { xs: "0.9rem" } }}>
                    100 Ratings
                  </Typography>
                </div>
                <Box className="mt-5 space-y-3">
                  {[
                    { label: "Excellent", value: 40, color: "#4BB543" },
                    { label: "Very Good", value: 30, color: "#81C784" },
                    { label: "Good", value: 25, color: "#FFBF00" },
                    { label: "Average", value: 20, color: "#FF7800" },
                    { label: "Poor", value: 10, color: "#F44336" },
                  ].map((rating, index) => (
                    <Grid container alignItems="center" gap={2} key={index}>
                      <Grid item xs={3}>
                        <Typography
                          sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                          className="text-left"
                        >
                          {rating.label}
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <LinearProgress
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: rating.color,
                            },
                          }}
                          variant="determinate"
                          value={rating.value}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={7}>
                <div className="space-y-5">
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                    className="font-semibold pb-1 text-left"
                  >
                    Product Reviews
                  </Typography>
                  {[1, 1, 1].map((item, index) => (
                    <ProductReviewCard key={index} />
                  ))}
                </div>
              </Grid>
            </Grid>
          </div>
        </section> */}

        {/* Related Products */}
        {/* TO DO: implement recommended products */}
        <section className="px-8 lg:px-24 pb-8 text-left">
          <h1 className="py-5 text-xl font-semibold">Related Products</h1>
          <div className="flex flex-wrap">
            {loadingRelated ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
              >
                <CircularProgress />
              </Box>
            ) : (
              relatedProducts
                .slice(0, 5)
                .map((item) => <ProductCard key={item._id} product={item} />)
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
