import React from "react";
import PartCategoryCard from "./PartCategoryCard";

const partCategories = [
  {
    id: "Control-Arm",
    name: "Control Arm",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "Strut-&-Shock-Absorber",
    name: "Strut & Shock Absorber",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "Stabilizer-&-Link",
    name: "Stabilizer & Link",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },

  {
    id: "Filter",
    name: "Filters",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "Mounting",
    name: "Engine Mounting",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "Disc-Rotor",
    name: "Disc Rotor",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "Brake-pad",
    name: "Brake Pad",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "Sensor",
    name: "Sensors",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "Body-Parts",
    name: "Body Parts",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
  {
    id: "Safety-System",
    name: "Safety System",
    imgUrl: "https://www.motrparts.com/wp-content/uploads/2023/12/filters.png",
  },
];

const PartsCategoryGrid = () => {
  return (
    <div className="border bg-white">
      <h2 className="text-2xl font-bold text-gray-800 py-5 text-left mx-5">
        Top Categories
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
