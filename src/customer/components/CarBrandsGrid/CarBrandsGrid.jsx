import React from "react";
import CarBrandCard from "./CarBrandCard";

const carBrands = [
  {
    id: "Audi",
    name: "Audi",
    logo: "/images/carMake/audi.png",
  },
  {
    id: "Honda",
    name: "Honda",
    logo: "/images/carMake/honda.png",
  },
  {
    id: "Hyundai",
    name: "Hyundai",
    logo: "/images/carMake/hyundai.png",
  },
  {
    id: "Kia",
    name: "Kia",
    logo: "/images/carMake/kia.png",
  },
  {
    id: "Mahindra",
    name: "Mahindra",
    logo: "/images/carMake/mahindra.png",
  },
  {
    id: "Maruti-Suzuki",
    name: "Maruti Suzuki",
    logo: "/images/carMake/suzuki.png",
  },
  {
    id: "Tata",
    name: "Tata",
    logo: "/images/carMake/tata.png",
  },
  {
    id: "Toyota",
    name: "Toyota",
    logo: "/images/carMake/toyota.png",
  },
  {
    id: "Volkswagen",
    name: "Volkswagen",
    logo: "/images/carMake/volkswagen.png",
  },
];

const CarBrandsGrid = () => {
  return (
    <div className="border bg-white">
      <h2 className="text-2xl font-bold text-gray-800 py-5 text-left mx-5">
        Shop By Car Make
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-5">
        {carBrands.map((brand, index) => (
          <CarBrandCard
            key={index}
            id={brand.id}
            name={brand.name}
            logo={brand.logo}
          />
        ))}
      </div>
    </div>
  );
};

export default CarBrandsGrid;
