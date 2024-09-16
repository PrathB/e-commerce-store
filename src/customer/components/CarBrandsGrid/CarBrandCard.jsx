import React from "react";
import { useNavigate } from "react-router-dom";

const CarBrandCard = ({ name, logo }) => {
  const navigate = useNavigate();
  const handleCardClick = (brand) => {
    navigate(`browse/car-make/${brand}`);
  };
  return (
    <div
      onClick={() => handleCardClick(name)}
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
