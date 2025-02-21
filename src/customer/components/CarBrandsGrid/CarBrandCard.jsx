import React from "react";
import { useNavigate } from "react-router-dom";

const CarBrandCard = ({ id, name, logo }) => {
  const navigate = useNavigate();
  const handleCardClick = (brandId) => {
    navigate(`browse/?car-make=${brandId}`);
    window.scrollTo(0, 0);
  };
  return (
    <div
      onClick={() => handleCardClick(id)}
      className="flex flex-col items-center justify-center cursor-pointer p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:border-[#7f0000]"
    >
      <img
        src={logo}
        alt={name}
        className="w-[8rem] h-[8rem] object-contain mb-4"
      />
      <span className="text-lg font-medium text-gray-800">{name}</span>
    </div>
  );
};

export default CarBrandCard;
