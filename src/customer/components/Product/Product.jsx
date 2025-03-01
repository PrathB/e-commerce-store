import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../State/Product/action";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { FilterList } from "@mui/icons-material";
import { Box, CircularProgress, Pagination } from "@mui/material";

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filter1 = [
  {
    id: "category",
    name: "Category",
    options: [
      {
        value: "suspension-and-steering",
        label: "Suspension And Steering",
        checked: false,
        subcategories: [
          {
            value: "strut-and-shock-absorber",
            label: "Strut And Shock Absorber",
          },
          { value: "control-arm", label: "Control Arm" },
          {
            value: "stabilizer-and-link",
            label: "Stabilizer And Link",
          },
          {
            value: "bush-strut-mounting-and-kit",
            label: "Bush, Strut Mounting And Kit",
          },
        ],
      },

      {
        value: "engine-parts",
        label: "Engine Parts",
        checked: false,
        subcategories: [
          { value: "filter", label: "Filter" },
          { value: "mounting", label: "Mounting" },
        ],
      },
      {
        value: "braking-system",
        label: "Braking System",
        checked: false,
        subcategories: [
          { value: "brake-pad", label: "Brake Pad" },
          { value: "disc-rotor", label: "Disc Rotor" },
          { value: "brake-booster", label: "Brake Booster" },
        ],
      },
      {
        value: "electrical",
        label: "Electrical",
        checked: false,
        subcategories: [
          { value: "sensor", label: "Sensor" },
          { value: "ignition", label: "Ignition" },
          {
            value: "electronic-control-unit",
            label: "Electronic Control Unit",
          },
          { value: "battery", label: "Battery" },
        ],
      },
      {
        value: "cooling-and-hvac",
        label: "Cooling And HVAC",
        checked: false,
        subcategories: [
          { value: "refrigerant-system", label: "Refrigerant System" },
          { value: "radiator", label: "Radiator" },
          { value: "condensor", label: "Condensor" },
          { value: "evaporator", label: "Evaporator" },
          { value: "compressor", label: "Compressor" },
        ],
      },
      {
        value: "body-parts",
        label: "Body Parts",
        checked: false,
        subcategories: [
          { value: "rear-view-mirror", label: "Rear View Mirror" },
          {
            value: "fender-and-fender-liner",
            label: "Fender And Fender Liner",
          },
          { value: "wheel-rim", label: "Wheel Rim" },
          { value: "wheel-cover", label: "Wheel Cover" },
          { value: "bumper", label: "Bumper" },
          { value: "headlight", label: "Headlight" },
          { value: "tailight", label: "Tailight" },
        ],
      },
      {
        value: "safety-system",
        label: "Safety System",
        checked: false,
        subcategories: [
          { value: "airbag-system", label: "Airbag System" },
          { value: "seatbelt-system", label: "Seatbelt System" },
        ],
      },
      {
        value: "accessories",
        label: "Accessories",
        checked: false,
        subcategories: [
          { value: "windshield-and-wiper", label: "Windshield And Wiper" },
          { value: "seatcover-and-mat", label: "Seatcover And Mat" },
          { value: "entertainment-system", label: "Entertainment System" },
        ],
      },
    ],
  },
];

const filter2 = [
  {
    id: "car-make",
    name: "Car Make",
    options: [
      { value: "audi", label: "Audi", checked: false },
      { value: "bmw", label: "BMW", checked: false },
      { value: "mercedes", label: "Mercedes", checked: false },
      { value: "kia", label: "Kia", checked: false },
      { value: "mahindra", label: "Mahindra", checked: false },
      { value: "maruti-suzuki", label: "Maruti Suzuki", checked: false },
      { value: "tata", label: "Tata", checked: false },
      { value: "honda", label: "Honda", checked: false },
      { value: "volkswagen", label: "Volkswagen", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [subCategoryOpen, setSubCategoryOpen] = useState({});

  const toggleSubCategory = (categoryId) => {
    setSubCategoryOpen((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const [mobileSubCategoryOpen, setMobileSubCategoryOpen] = useState({});

  const toggleMobileSubCategory = (categoryId) => {
    setMobileSubCategoryOpen((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);

  const category = searchParams.get("category");
  const carMake = searchParams.get("car-make");
  const priceValue = searchParams.get("price");
  const minDiscount = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const stock = searchParams.get("stock");
  const pageNumber = searchParams.get("page") || 1;

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: query });
  };

  useEffect(() => {
    const [minPrice, maxPrice] =
      priceValue === null ? [0, 1000000] : priceValue.split("-").map(Number);

    const data = {
      category,
      carMake,
      minPrice,
      maxPrice,
      minDiscount: minDiscount || 0,
      sort: sortValue || "low_to_high",
      stock: stock || "in_stock",
      pageNumber,
      pageSize: 10,
    };

    dispatch(getProducts(data));
  }, [
    dispatch,
    carMake,
    category,
    priceValue,
    minDiscount,
    sortValue,
    stock,
    pageNumber,
  ]);

  const pageData = useSelector((store) => store.product.pageData);
  const loading = useSelector((store) => store.product.loading);

  const selectFilters = () => {
    const searchParams = location.search;

    const carMakeIndex = searchParams.indexOf("car-make");
    const categoryIndex = searchParams.indexOf("category");

    let filters = null;
    if (
      carMakeIndex !== -1 &&
      (categoryIndex === -1 || carMakeIndex < categoryIndex)
    ) {
      filters = filter1; // car-make comes first
    } else if (
      categoryIndex !== -1 &&
      (carMakeIndex === -1 || categoryIndex < carMakeIndex)
    ) {
      filters = filter2; // category comes first
    }
    return filters;
  };

  const filters = selectFilters();

  const handleFilterChange = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    let filterValue = searchParams.getAll(sectionId);
    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);
      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValue.push(value);
    }

    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(","));
    }

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex flex-col">
                            <div className="flex items-center">
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                checked={(searchParams.getAll(section.id) || [])
                                  .join(",")
                                  .split(",")
                                  .includes(option.value)} // ✅ This ensures checkboxes remain checked
                                onChange={() =>
                                  handleFilterChange(option.value, section.id)
                                }
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                              {option.subcategories && (
                                <button
                                  type="button"
                                  className="ml-2 text-gray-500"
                                  onClick={() =>
                                    toggleMobileSubCategory(option.value)
                                  }
                                >
                                  {mobileSubCategoryOpen[option.value] ? (
                                    <MinusIcon className="h-4 w-4" />
                                  ) : (
                                    <PlusIcon className="h-4 w-4" />
                                  )}
                                </button>
                              )}
                            </div>

                            {/* Subcategories */}
                            {mobileSubCategoryOpen[option.value] &&
                              option.subcategories && (
                                <div className="pl-6 mt-2 space-y-2">
                                  {option.subcategories.map((subOption) => (
                                    <div
                                      key={subOption.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`sub-filter-mobile-${section.id}-${option.value}-${subOption.value}`}
                                        name={`${section.id}[]`}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={() =>
                                          handleFilterChange(
                                            subOption.value,
                                            section.id
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={`sub-filter-mobile-${section.id}-${option.value}-${subOption.value}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {subOption.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>
        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-l sm:text-xl lg:text-2xl font-bold tracking-tight text-gray-900"></h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters*/}
              <div className="hidden lg:block">
                <div className="py-6 flex justify-between items-center">
                  <h1 className="text-lg opacity-50 font-bold text-left">
                    Filters
                  </h1>
                  <FilterList />
                </div>

                <form className="hidden lg:block">
                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex flex-col">
                              <div className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={() =>
                                    handleFilterChange(option.value, section.id)
                                  }
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                                {option.subcategories && (
                                  <button
                                    type="button"
                                    className="ml-2 text-gray-500"
                                    onClick={() =>
                                      toggleSubCategory(option.value)
                                    }
                                  >
                                    {subCategoryOpen[option.value] ? (
                                      <MinusIcon className="h-4 w-4" />
                                    ) : (
                                      <PlusIcon className="h-4 w-4" />
                                    )}
                                  </button>
                                )}
                              </div>

                              {/* Subcategories */}
                              {subCategoryOpen[option.value] &&
                                option.subcategories && (
                                  <div className="pl-6 mt-2 space-y-2">
                                    {option.subcategories.map((subOption) => (
                                      <div
                                        key={subOption.value}
                                        className="flex items-center"
                                      >
                                        <input
                                          id={`sub-filter-${section.id}-${option.value}-${subOption.value}`}
                                          name={`${section.id}[]`}
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          onChange={() =>
                                            handleFilterChange(
                                              subOption.value,
                                              section.id
                                            )
                                          }
                                        />
                                        <label
                                          htmlFor={`sub-filter-${section.id}-${option.value}-${subOption.value}`}
                                          className="ml-3 text-sm text-gray-600"
                                        >
                                          {subOption.label}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-4 w-full">
                {loading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <div className="flex flex-wrap justify-center sm:justify-start bg-white py-5">
                    {pageData?.content.length === 0 && (
                      <h1 className="text-center w-full text-2xl font-semibold opacity-70">
                        Sorry, no products found!
                      </h1>
                    )}
                    {pageData?.content.length > 0 &&
                      pageData.content.map((item) => (
                        <ProductCard product={item} key={item.title} />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Pagination */}
          <section className="w-full px=[3.6rem]">
            <div className="px-4 py-5 flex justify-center">
              <Pagination
                count={pageData?.totalPages}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#000000", // Default text color for items
                    "&.Mui-selected": {
                      backgroundColor: "#7f0000", // Background color when selected
                      color: "#ffffff", // Text color when selected
                      "&:hover": {
                        backgroundColor: "#500000", // Hover background for selected item
                      },
                    },
                    "&:hover": {
                      backgroundColor: "#dddddd", // Background on hover
                    },
                  },
                }}
                onChange={handlePaginationChange}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
