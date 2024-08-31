import { useState } from "react";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { volkswagen_parts } from "../../../Data/volkswagen_parts";

const product = {
  name: "Clutch Set (Clutch & Pressure Plate) 8V2Z7B546V – Fits Ford Ecosport / Figo / Fiesta (T2) / Figo Aspire (Dsl)",
  price: "₹5,029.00",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Home", href: "#" },
    { id: 2, name: "Clutch Set", href: "#" },
  ],
  images: [
    {
      src: "https://www.motrparts.com/wp-content/uploads/2019/12/Ford-Ecosport-Figo-Type-2-Diesel-Clutch-Set-8V2Z7B546V.jpg",
      alt: "Clutch set image 1",
    },
    {
      src: "https://cartrends.in/cdn/shop/products/twice_clutch_540x.jpg?v=1643914049",
      alt: "Clutch set image 2",
    },
  ],
  description:
    "Clutch Set OE Part No. 8V2Z7B546V is a genuine Ford spare part for Ford Figo and Fiesta, Ecosport, Figo Aspire (Diesel). This Product comes in Genuine Ford Packing and sold by Ford India Private Limited. This item is sold as set of 2 Pieces containing Clutch Plate and Pressure Plate in a box",
  highlights: [
    "Ford Ecosport, Figo, Fiesta, Figo Aspire Clutch Set",
    "Brand Name: Ford Genuine Part",
    "Part Number: 8V2Z7B546V",
  ],
  specs: [
    { label: "Weight", value: "6 kg" },
    { label: "Dimensions (L*B*H)", value: "46 × 46 × 16 cm" },
    { label: "Car Make", value: "Ford" },
    { label: "Car Model", value: "Ecosport, Fiesta, Figo, Figo Aspire" },
    { label: "Car Sub Model", value: "All Diesel Models., Type 2." },
    { label: "Parts Brand", value: "Ford Genuine Part" },
    { label: "Parts Origin", value: "Genuine" },
    { label: "Net Quantity", value: "Set Of 2 Pcs." },
    { label: "Country Of Origin", value: "India" },
    { label: "Part Number", value: "8V2Z7B546V" },
    { label: "Parts Category", value: "Ford Genuine Clutch Sets" },
  ],
  compatibility: [
    "Ford Ecosport 1st & Facelift Model | 1.5L Diesel | 06.2013 – 09.2021",
    "Ford Fiesta 2nd Gen & Facelift Model | 1.5L Diesel | 09.2011 – 09.2015",
    "Ford Figo 2nd Gen | 1.5L Diesel | 08.2015 – 03.2019",
    "Ford Figo Aspire 1st Gen | 1.5L Diesel | 08.2015 – 03.2018",
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  // Functions to handle quantity selector
  
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity === "" ? 1 : prevQuantity + 1));
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (value === "" || (!isNaN(value) && parseInt(value, 10) > 0)) {
      setQuantity(value === "" ? "" : parseInt(value, 10));
    }
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900 hover:text-gray-600"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:cursor-text"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                alt={product.images[0].alt}
                src={product.images[0].src}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {product.images.map((item) => (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                  <img
                    alt={item.alt}
                    src={item.src}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 max-h-auto max-w-2xl px-4 pb-2 sm:px-6 lg:max-w-7xl lg:px-8 text-left">
            <div className="lg:col-span-2 border-b pb-2 mb-5">
              <h1 className="text-base lg:text-lg font-semibold text-gray-900 opacity-60 cursor-pointer hover:opacity-80">
                Clutch Set
              </h1>
              <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 pt-1">
                Clutch Set (Clutch & Pressure Plate) 8V2Z7B546V – Fits Ford
                Ecosport / Figo / Fiesta (T2) / Figo Aspire (Dsl)
              </h1>
              <div className="mt-3">
                <span className=" text-gray-600">Availability: </span>
                <span className="text-green-600 font-semibold">In Stock</span>
              </div>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center">
                <p className="text-3xl tracking-tight text-gray-900">
                  ₹5,029.00
                </p>
                <p className="text-xl tracking-tight text-gray-900 opacity-60 line-through">
                  ₹5,529.00
                </p>
                <p className="text-xl text-green-600 font-semibold">9% off</p>
              </div>

              <form className="mt-10">
                <div className="flex items-center">
                  {/* Quantity Selector */}
                  <div className="flex flex-col items-start mr-4">
                    <span className="mb-2 text-base font-medium text-gray-700">
                      Quantity
                    </span>

                    <div className="flex items-center mb-4">
                      <button
                        type="button"
                        onClick={decrementQuantity}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-l-md"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        onChange={handleInputChange}
                        className="w-12 text-center border-t border-b border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={incrementQuantity}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#7f0000] px-8 py-3 text-base font-medium text-white hover:bg-[#500000] focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </div>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-4 lg:pr-8 lg:pt-6">
              {/* Description and Highlights*/}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-semibold text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center px-8 lg:px-24 pb-8 text-left ">
          {/* Specifications */}
          <h2 className="text-lg font-semibold mb-4">Specifications</h2>
          <div className="border border-gray-300 rounded-lg p-4 w-full mb-10">
            {product.specs.map((detail, index) => (
              <div
                key={index}
                className={`grid grid-cols-2 py-2 ${
                  index !== product.specs.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <span className="font-semibold">{detail.label}</span>
                <span>{detail.value}</span>
              </div>
            ))}
          </div>
          {/* Compatibility */}
          <h2 className="text-lg font-semibold mb-2">Compatibility</h2>
          <div className="mt-4">
            <ul className="list-disc space-y-2 pl-4 text-base">
              {product.compatibility.map((compatibleVehicle) => (
                <li key={compatibleVehicle} className="text-gray-400">
                  <span className="text-gray-900">{compatibleVehicle}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        
        {/* Related Products */}
        <section className="px-8 lg:px-24 pb-8 text-left">
          <h1 className="py-5 text-xl font-semibold">Related Products</h1>
          <div className="flex flex-wrap space-y-5">
              {volkswagen_parts.slice(0,5).map((item)=><HomeSectionCard product={item}/>)}
          </div>

        </section>
      </div>
    </div>
  );
}
