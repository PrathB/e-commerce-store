import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate();
  const productId = product?._id;

  const handleProductClick = () => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleProductClick}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-auto mx-2 mb-4 border py-2 hover:border-[#7f0000]"
    >
      <div className="h-auto w-auto sm:h-[15rem] sm:w-auto">
        <img
          className="object-cover w-full h-full"
          src={product?.imageUrl}
          alt="Product"
        />
      </div>

      <div className="textPart bg-white p-3 w-full">
        <div>
          <p className="text-sm sm:text-base">{product?.title}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center mt-2 mb-1">
          <p className="font-semibold text-sm sm:text-base mr-2">
            ₹{product?.discountedPrice.toLocaleString("en-IN")}
          </p>

          {product?.discountPercent > 0 && (
            <p className="line-through opacity-50 text-sm sm:text-base">
              ₹{product?.price.toLocaleString("en-IN")}
            </p>
          )}
        </div>
        {product?.discountPercent > 0 && (
          <div className="text-center">
            <p className="text-green-600 font-semibold text-sm sm:text-base">
              {product?.discountPercent}% off
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCard;
