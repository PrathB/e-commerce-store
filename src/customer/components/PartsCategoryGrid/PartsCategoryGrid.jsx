import React from "react";
import PartCategoryCard from "./PartCategoryCard";

const partCategories = [
  {
    id: "service-kits",
    name: "Service Kits",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "oils-and-lubricants",
    name: "Oils and Lubricants",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "filters",
    name: "Filters",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "brake-system",
    name: "Brake System",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "clutch-system",
    name: "Clutch System",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "suspension-and-arms",
    name: "Suspension and Arms",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "lighting",
    name: "Lighting",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "body-parts",
    name: "Body Parts",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
];

const PartsCategoryGrid = () => {
  return (
    <div className="border bg-white">
      <h2 className="text-2xl font-bold text-gray-800 py-5 text-left mx-5">
        Shop By Part Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-5">
        {partCategories.map((category, index) => (
          <PartCategoryCard
            key={index}
            id={category.id}
            name={category.name}
            img={category.imgUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default PartsCategoryGrid;
