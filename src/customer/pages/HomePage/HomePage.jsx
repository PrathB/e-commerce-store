import React from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import CarBrandsGrid from "../../components/CarBrandsGrid/CarBrandsGrid";
import PartscategoryGrid from "../../components/PartsCategoryGrid/PartsCategoryGrid";

const HomePage = () => {
  return (
    <div>
      <MainCarousel />

      {/* 1. Best Sellers / Featured
          2. Shop by Category
          3. Shop by Car brand */}

      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10 bg-gray-100">
        <HomeSectionCarousel sectionName={"Featured Products"} />
        <PartscategoryGrid />

        <CarBrandsGrid />
      </div>
    </div>
  );
};

export default HomePage;
