import React from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { volkswagen_parts } from "../../../Data/volkswagen_parts";

const HomePage = () => {
  return (
    <div>
      <MainCarousel />

      {/* 1. Best Sellers / Featured
          2. Shop by category
          3. Shop by Car brand */}

      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10 bg-gray-100">
        <HomeSectionCarousel
          data={volkswagen_parts}
          sectionName={"Featured Products"}
        />
        <HomeSectionCarousel
          data={volkswagen_parts}
          sectionName={"Shop By Category"}
        />
        <HomeSectionCarousel
          data={volkswagen_parts}
          sectionName={"Shop by Car Brand"}
        />
      </div>
    </div>
  );
};

export default HomePage;
