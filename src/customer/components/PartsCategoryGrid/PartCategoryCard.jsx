import React from "react";
import { useNavigate } from "react-router-dom";

const PartsCategoryCard = ({ id, name, img }) => {
  const navigate = useNavigate();
  const handleCardClick = (categoryId) => {
    navigate(`browse/?category=${categoryId}`);
    window.scrollTo(0, 0);
  };
  return (
    <div
      onClick={() => handleCardClick(id)}
      className="flex flex-col items-center justify-center cursor-pointer p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:border-[#7f0000]"
    >
      <img
        src={img}
        alt={name}
        className="w-[8rem] h-[8rem] object-contain mb-4"
      />
      <span className="text-lg font-medium text-gray-800">{name}</span>
    </div>
  );
};

export default PartsCategoryCard;
