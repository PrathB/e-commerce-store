import React from "react";
import PartCategoryCard from "./PartCategoryCard";

const partCategories = [
  {
    id: "Control-Arm",
    name: "Control Arm",
    imgSrc: "/images/partCategories/control-arm.png",
  },
  {
    id: "Strut-&-Shock-Absorber",
    name: "Strut & Shock Absorber",
    imgSrc: "/images/partCategories/shock-absorber.png",
  },
  {
    id: "Stabilizer-&-Link",
    name: "Stabilizer & Link",
    imgSrc: "/images/partCategories/stabilizer-link.png",
  },

  {
    id: "Filter",
    name: "Filters",
    imgSrc: "/images/partCategories/oil-filter.png",
  },
  {
    id: "Mounting",
    name: "Engine Mounting",
    imgSrc: "/images/partCategories/engine-mount.png",
  },
  {
    id: "Disc-Rotor",
    name: "Disc Rotor",
    imgSrc: "/images/partCategories/disc-rotor.png",
  },
  {
    id: "Brake-pad",
    name: "Brake Pad",
    imgSrc: "/images/partCategories/brake-pads.png",
  },
  {
    id: "Electrical",
    name: "Electrical",
    imgSrc: "/images/partCategories/ecu.png",
  },
  {
    id: "Body-Parts",
    name: "Body Parts",
    imgSrc: "/images/partCategories/wheel-rim.png",
  },
  {
    id: "Safety-System",
    name: "Safety System",
    imgSrc: "/images/partCategories/seatbelt.png",
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
            img={category.imgSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default PartsCategoryGrid;
