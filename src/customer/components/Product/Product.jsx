import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { volkswagen_parts } from "../../../Data/volkswagen_parts";
import ProductCard from "./ProductCard";

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const productNavigation = {
  sections: [
    {
      id: "brands",
      name: "Brands",
      items: [
        { name: "Audi", href: "#" },
        { name: "Honda", href: "#" },
        { name: "Hyundai", href: "#" },
        { name: "Kia", href: "#" },
        { name: "Mahindra", href: "#" },
        { name: "Maruti Suzuki", href: "#" },
        { name: "Tata", href: "#" },
        { name: "Toyota", href: "#" },
        { name: "Volkswagen", href: "#" },
      ],
    },
    {
      id: "categories",
      name: "Categories",
      items: [
        { name: "Service Kits", href: "#" },
        { name: "Oils and Lubricants", href: "#" },
        { name: "Filters", href: "#" },
        { name: "Brake System", href: "#" },
        { name: "Clutch System", href: "#" },
        { name: "Suspension and Arms", href: "#" },
        { name: "Lighting", href: "#" },
        { name: "Body Parts", href: "#" },
      ],
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

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
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Product Browse*/}
              <div className="hidden lg:block pb-4">
                {productNavigation.sections.map((section) => (
                  <div
                    key={section.id}
                    className="mb-6 pb-4 border-b border-gray-200"
                  >
                    <h3 className="text-lg font-medium text-gray-900">
                      {section.name}
                    </h3>
                    <ul role="list" className="mt-2 space-y-3">
                      {section.items.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="text-gray-600 hover:text-gray-900 hover:font-semibold"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
