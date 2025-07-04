import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Box, CircularProgress, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import ProductCard from "../components/Product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../State/Product/action";
import { useLocation, useNavigate } from "react-router-dom";

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const query = searchParams.get("q");
  const pageNumber = searchParams.get("page") || 1;
  const pageSize = 10;

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: query });
  };

  useEffect(() => {
    dispatch(
      searchProducts({
        query,
        pageNumber,
        pageSize,
      })
    );
  }, [dispatch, query, pageNumber]);

  const pageData = useSelector((store) => store.product.searchPageData);
  const loading = useSelector((store) => store.product.loading);
  return (
    <div className="bg-white">
      <main className="mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-l sm:text-xl lg:text-2xl font-bold tracking-tight text-gray-800">
            Search Results for <b>{query}</b>
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
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white 
                shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 
                data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 
                data-[enter]:ease-out data-[leave]:ease-in"
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
            {/* Product grid */}
            <div className="lg:col-span-5 w-full">
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
                  {pageData?.totalResults === 0 && (
                    <h1 className="text-center w-full text-2xl font-semibold opacity-70">
                      Sorry, no products found!
                    </h1>
                  )}
                  {pageData?.totalResults > 0 &&
                    pageData?.products?.map((item) => (
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
  );
};

export default ProductSearchPage;
