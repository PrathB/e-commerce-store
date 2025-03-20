import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="productCard w-auto sm:w-[15rem] m-3 transition-all cursor-pointer shadow-md"
    >
      <div className="h-[18rem] sm:h-[20rem]">
        <img
          className="h-full w-full object-cover"
          src={product.imageUrl}
          alt="product"
        />
      </div>

      <div className="textPart bg-white p-3">
        <div>
          <p className="text-sm sm:text-base">{product.title}</p>
        </div>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <p className="font-semibold text-sm sm:text-base">
            ₹{product.discountedPrice.toLocaleString("en-IN")}
          </p>

          {product?.discountPercent > 0 && (
            <>
              <p className="line-through opacity-50 text-sm sm:text-base">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              <p className="text-green-600 font-semibold text-sm sm:text-base">
                {product.discountPercent}% off
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
