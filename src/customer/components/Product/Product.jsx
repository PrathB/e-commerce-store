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
import { volkswagen_parts } from "../../../Data/volkswagen_parts";
import ProductCard from "./ProductCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../../State/Product/action";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { FilterList } from "@mui/icons-material";

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
        value: "Suspension-And-Steering",
        label: "Suspension & Steering",
        checked: false,
        subcategories: [
          {
            value: "Strut-And-Shock-Absorber",
            label: "Strut & Shock Absorber",
          },
          { value: "Control-Arm", label: "Control Arm" },
          {
            value: "Stabilizer-And-Link",
            label: "Stabilizer & Link",
          },
          {
            value: "Bush-Strut-Mounting-And-Kit",
            label: "Bush, Strut Mounting & Kit",
          },
        ],
      },

      {
        value: "Engine-Parts",
        label: "Engine Parts",
        checked: false,
        subcategories: [
          { value: "Filter", label: "Filter" },
          { value: "Mounting", label: "Mounting" },
        ],
      },
      {
        value: "Braking-System",
        label: "Braking System",
        checked: false,
        subcategories: [
          { value: "Brake-Pad", label: "Brake Pad" },
          { value: "Disc-Rotor", label: "Disc Rotor" },
          { value: "Brake-Booster", label: "Brake Booster" },
        ],
      },
      {
        value: "Electrical",
        label: "Electrical",
        checked: false,
        subcategories: [
          { value: "Sesnsor", label: "Sesnsor" },
          { value: "Ignition", label: "Ignition" },
          {
            value: "Electronic-Control-Unit",
            label: "Electronic Control Unit",
          },
          { value: "Battery", label: "Battery" },
        ],
      },
      {
        value: "Cooling-And-HVAC",
        label: "Cooling & HVAC",
        checked: false,
        subcategories: [
          { value: "Refrigerant-System", label: "Refrigerant System" },
          { value: "Radiator", label: "Radiator" },
          { value: "Condensor", label: "Condensor" },
          { value: "Evaporator", label: "Evaporator" },
          { value: "Compressor", label: "Compressor" },
        ],
      },
      {
        value: "Body-Parts",
        label: "Body Parts",
        checked: false,
        subcategories: [
          { value: "Rear-View-Mirror", label: "Rear View Mirror" },
          { value: "Fender-And-Fender-Liner", label: "Fender & Fender Liner" },
          { value: "Wheel-Rim", label: "Wheel Rim" },
          { value: "Wheel-Cover", label: "Wheel Cover" },
          { value: "Bumper", label: "Bumper" },
          { value: "Headlight", label: "Headlight" },
          { value: "Tailight", label: "Tailight" },
        ],
      },
      {
        value: "Safety-System",
        label: "Safety System",
        checked: false,
        subcategories: [
          { value: "Airbag-System", label: "Airbag System" },
          { value: "Seatbelt-System", label: "Seatbelt System" },
        ],
      },
      {
        value: "Accessories",
        label: "Accessories",
        checked: false,
        subcategories: [
          { value: "Windshield-And-Wiper", label: "Windshield & Wiper" },
          { value: "Seatcover-And-Mat", label: "Seatcover & Mat" },
          { value: "Entertainment-System", label: "Entertainment System" },
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
      { value: "Audi", label: "Audi", checked: false },
      { value: "BMW", label: "BMW", checked: false },
      { value: "Mercedes", label: "Mercedes", checked: false },
      { value: "Kia", label: "Kia", checked: false },
      { value: "Mahindra", label: "Mahindra", checked: false },
      { value: "Maruti-Suzuki", label: "Maruti Suzuki", checked: false },
      { value: "Tata", label: "Tata", checked: false },
      { value: "Honda", label: "Honda", checked: false },
      { value: "Volkswagen", label: "Volkswagen", checked: false },
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

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);

  const category = searchParams.get("category");
  const carMake = searchParams.get("car-make");
  const priceValue = searchParams.get("price");
  const minDiscount = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const stock = searchParams.get("stock");
  const pageNumber = searchParams.get("page") || 1;

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
    carMake,
    category,
    priceValue,
    minDiscount,
    sortValue,
    stock,
    pageNumber,
  ]);

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
                                            section.id,
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
                <div className="flex flex-wrap justify-center sm:justify-start bg-white py-5">
                  {volkswagen_parts.map((item) => (
                    <ProductCard product={item} key={item.title} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
