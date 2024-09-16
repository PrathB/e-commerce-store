import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button } from "@mui/material";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const HomeSectionCarousel = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowSize = useWindowSize();

  const responsive = {
    0: { items: 1 }, // For mobile devices
    600: { items: 3 }, // For smaller tablets
    900: { items: 3 }, // For larger tablets
    1200: { items: 4 }, // For laptops
    1440: { items: 5 }, // For larger screens
  };

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);

  const syncActiveIndex = ({ item }) => {
    setActiveIndex(item);
  };

  const items = data.map((item) => (
    <HomeSectionCard key={item.id} product={item} />
  ));

  // If the window width is less than 720px, use a grid layout
  if (windowSize.width && windowSize.width < 720) {
    return (
      <div className="border bg-white">
        <h2 className="text-2xl font-bold text-gray-800 py-5 text-left mx-5">
          {sectionName}
        </h2>
        <div className="grid grid-cols-2 gap-1 p-2">
          {data.map((item) => (
            <HomeSectionCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    );
  }

  // For larger screens, display the carousel
  return (
    <div className="border bg-white">
      <h2 className="text-2xl font-bold text-gray-800 py-5 text-left mx-5">
        {sectionName}
      </h2>
      <div className="relative p-5">
        <AliceCarousel
          key={activeIndex}
          items={items}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />

        {activeIndex !== items.length - 5 && (
          <Button
            variant="contained"
            className="z-50"
            onClick={slideNext}
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg) ",
              bgcolor: "white",
            }}
            aria-label="next"
          >
            <KeyboardArrowRightIcon
              sx={{ transform: "rotate(-90deg)", color: "black" }}
            />
          </Button>
        )}

        {activeIndex !== 0 && (
          <Button
            variant="contained"
            className="z-50"
            onClick={slidePrev}
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%) rotate(-90deg) ",
              bgcolor: "white",
            }}
            aria-label="prev"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
