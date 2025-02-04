import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Alert, Avatar, Button, Menu, MenuItem, Snackbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../../authorization/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logout } from "../../../State/Authorization/action";
import { ArrowDropDown } from "@mui/icons-material";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = {
  categories: [
    {
      id: "browse",
      name: "Browse",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://cartrends.in/cdn/shop/files/2_06a68d48-eef5-47fa-9abc-52d1afa12b0b_1920x.png?v=1723270930",
          imageAlt: "Different car parts on display.",
        },
        {
          name: "Service Kits",
          href: "#",
          imageSrc:
            "https://cartrends.in/cdn/shop/files/Oil-Filter-2-banner_720x.jpg?v=1723029431",
          imageAlt: "Service kit.",
        },
      ],
      sections: [
        {
          id: "car-make",
          name: "Car Make",
          items: [
            { id: "Audi", name: "Audi", href: "#" },
            { id: "BMW", name: "BMW", href: "#" },
            { id: "Mercedes", name: "Mercedes", href: "#" },
            { id: "Kia", name: "Kia", href: "#" },
            { id: "Mahindra", name: "Mahindra", href: "#" },
            { id: "Maruti-Suzuki", name: "Maruti Suzuki", href: "#" },
            { id: "Tata", name: "Tata", href: "#" },
            { id: "Honda", name: "Honda", href: "#" },
            { id: "Volkswagen", name: "Volkswagen", href: "#" },
          ],
        },
        {
          id: "category",
          name: "Category",
          items: [
            {
              id: "Suspension-And-Steering",
              name: "Suspension & Steering",
              href: "#",
              subItems: [
                {
                  id: "Strut-And-Shock-Absorber",
                  name: "Strut & Shock Absorber",
                  href: "#",
                },
                { id: "Control-Arm", name: "Control Arm", href: "#" },
                {
                  id: "Stabilizer-And-Link",
                  name: "Stabilizer & Link",
                  href: "#",
                },
                {
                  id: "Bush-Strut-Mounting-And-Kit",
                  name: "Bush, Strut Mounting & Kit",
                  href: "#",
                },
              ],
            },
            {
              id: "Engine-Parts",
              name: "Engine Parts",
              href: "#",
              subItems: [
                { id: "Filter", name: "Filter", href: "#" },
                { id: "Mounting", name: "Mounting", href: "#" },
              ],
            },
            {
              id: "Braking-System",
              name: "Braking System",
              href: "#",
              subItems: [
                { id: "Brake-Pad", name: "Brake Pad", href: "#" },
                { id: "Disc-Rotor", name: "Disc Rotor", href: "#" },
                { id: "Brake-Booster", name: "Brake Booster", href: "#" },
              ],
            },
            {
              id: "Electrical",
              name: "Electrical",
              href: "#",
              subItems: [
                { id: "Sesnsor", name: "Sensor", href: "#" },
                { id: "Ignition", name: "Ignition", href: "#" },
                {
                  id: "Electronic-Control-Unit",
                  name: "Electronic Control Unit",
                  href: "#",
                },
                { id: "Battery", name: "Battery", href: "#" },
              ],
            },
            {
              id: "Cooling-And-HVAC",
              name: "Cooling & HVAC",
              href: "#",
              subItems: [
                {
                  id: "Refrigerant-System",
                  name: "Refrigerant System",
                  href: "#",
                },
                { id: "Radiator", name: "Radiator", href: "#" },
                {
                  id: "Condensor",
                  name: "Condensor",
                  href: "#",
                },
                { id: "Evaporator", name: "Evaporator", href: "#" },
                { id: "Compressor", name: "Compressor", href: "#" },
              ],
            },
            {
              id: "Body-Parts",
              name: "Body Parts",
              href: "#",
              subItems: [
                { id: "Rear-View-Mirror", name: "Rear View Mirror", href: "#" },
                {
                  id: "Fender-And-Fender-Liner",
                  name: "Fender & Fender Liner",
                  href: "#",
                },
                {
                  id: "Wheel-Rim",
                  name: "Wheel Rim",
                  href: "#",
                },
                { id: "Wheel-Cover", name: "Wheel Cover", href: "#" },
                { id: "Bumper", name: "Bumper", href: "#" },
                { id: "Headlight", name: "Headlight", href: "#" },
                { id: "Tailight", name: "Tailight", href: "#" },
              ],
            },
            {
              id: "Safety-System",
              name: "Safety System",
              href: "#",
              subItems: [
                { id: "Airbag-System", name: "Airbag System", href: "#" },
                { id: "Seatbelt-System", name: "Seatbelt System", href: "#" },
              ],
            },
            {
              id: "Accessories",
              name: "Accessories",
              href: "#",
              subItems: [
                {
                  id: "Windshield-And-Wiper",
                  name: "Windshield & Wiper",
                  href: "#",
                },
                {
                  id: "Seatcover-And-Mat",
                  name: "Seatcover & Mat",
                  href: "#",
                },
                {
                  id: "Entertainment-System",
                  name: "Entertainment System",
                  href: "#",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  pages: [],
};

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDropdown, setOpenDropdown] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const openUserMenu = Boolean(anchorEl);
  const location = useLocation();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const jwtFromState = useSelector((store) => store.auth.jwt);
  const userFromState = useSelector((store) => store.auth.user);

  const toggleDropdown = (itemId) => {
    setOpenDropdown((prev) => ({
      prev: false,
      [itemId]: !prev[itemId],
    }));
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };
  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, subItem, close) => {
    {
      if (subItem === null) {
        navigate(`/${category.id}/?${section.id}=${item.id}`);
      } else {
        navigate(`/${category.id}/?${section.id}=${subItem.id}`);
      }
    }

    close();
  };

  const handleMyOrdersClick = (close) => {
    navigate("/account/order-history");
    close();
  };

  const handleAddToCart = () => {
    if (userFromState) {
      navigate("/cart");
    } else {
      setOpenSnackbar(true);
    }
  };

  const navigateRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [jwt, jwtFromState]);

  useEffect(() => {
    if (userFromState) {
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate("/");
    }
  }, [userFromState]);

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <TabGroup as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <TabList className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium border-none"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </TabList>
                  </div>
                  <TabPanels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <TabPanel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <div key={item.name} className="flex flex-col">
                                  <li className="flex relative">
                                    <p
                                      onClick={() =>
                                        handleCategoryClick(
                                          category,
                                          section,
                                          item,
                                          null,
                                          () => setOpen(false)
                                        )
                                      }
                                      className="-m-2 block p-2 text-gray-500"
                                    >
                                      {item.name}
                                    </p>
                                    {section.id === "category" && (
                                      <ArrowDropDown
                                        onClick={() =>
                                          toggleDropdown(item.name)
                                        }
                                        className="absolute mr-2 right-0"
                                      />
                                    )}
                                  </li>
                                  {/* Render subcategories directly under the item */}
                                  {section.id === "category" &&
                                    openDropdown[item.name] &&
                                    item.subItems && (
                                      <ul className="ml-2">
                                        {item.subItems.map((subItem) => (
                                          <li
                                            key={subItem.name}
                                            className="p-2 text-gray-500 "
                                          >
                                            <button
                                              onClick={() =>
                                                handleCategoryClick(
                                                  category,
                                                  section,
                                                  item,
                                                  subItem,
                                                  () => setOpen(false)
                                                )
                                              }
                                              className="text-left w-full"
                                            >
                                              {subItem.name}
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                </div>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </TabPanel>
                    ))}
                  </TabPanels>
                </TabGroup>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Avatar
                      className="text-white"
                      onClick={handleUserClick}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      // onClick={handleUserClick}
                      sx={{
                        bgcolor: "#7f0000",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      P
                    </Avatar>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <header className="relative bg-white">
        <p
          className="flex h-10 items-center justify-center px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
          style={{ backgroundColor: "#7f0000" }}
        ></p>

        <nav aria-label="Top" className="mx-auto">
          <div className="border-y border-gray-500">
            <div
              className="flex h-16 items-center px-2 lg:px-11 "
              style={{ backgroundColor: "#2c2c2c" }}
            >
              <button
                type="button"
                className="rounded-md p-2 text-gray-400 lg:hidden"
                style={{ backgroundColor: "#2c2c2c" }}
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div
                onClick={() => navigate("/")}
                className="ml-4 flex lg:ml-0 cursor-pointer"
              >
                <span className="sr-only">Caraid</span>
                <img
                  src="logo-no-background.png"
                  alt="Caraid logo"
                  className="h-8 w-auto sm:h-10 lg:h-12"
                />
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <PopoverButton
                              className={classNames(
                                open
                                  ? "border-indigo-500 text-indigo-500"
                                  : "border-transparent text-white hover:text-gray-500",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-base font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </PopoverButton>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <PopoverPanel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-lg text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1 text-base"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-base">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-bold text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <div
                                                key={item.name}
                                                className="relative flex group cursor-pointer hover:font-semibold"
                                              >
                                                {" "}
                                                {/* Outer div with `group` */}
                                                <p
                                                  onClick={() =>
                                                    handleCategoryClick(
                                                      category,
                                                      section,
                                                      item,
                                                      null,
                                                      close
                                                    )
                                                  }
                                                  className="text-gray-900"
                                                >
                                                  {item.name}
                                                </p>
                                                {section.id === "category" && (
                                                  <span className="absolute right-0 opacity-100 group-hover:opacity-0">
                                                    &gt;
                                                  </span>
                                                )}
                                                {item.subItems && (
                                                  <ul className="absolute left-full w-full top-0 hidden group-hover:block bg-white border border-gray-300 shadow-lg">
                                                    {item.subItems.map(
                                                      (subItem) => (
                                                        <li
                                                          key={subItem.name}
                                                          className="px-4 py-2 hover:bg-gray-200 hover:text-gray-800"
                                                        >
                                                          <button
                                                            onClick={() =>
                                                              handleCategoryClick(
                                                                category,
                                                                section,
                                                                item,
                                                                subItem,
                                                                close
                                                              )
                                                            }
                                                            className="text-left w-full"
                                                          >
                                                            {subItem.name}
                                                          </button>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                )}
                                              </div>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </PopoverPanel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {userFromState?.firstName ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        // onClick={handleUserClick}
                        sx={{
                          bgcolor: "#7f0000",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {userFromState.firstName[0].toUpperCase()}
                      </Avatar>
                      {/* <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleUserClick}
                      >
                        Dashboard
                      </Button> */}
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          Profile
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleCloseUserMenu();
                            handleMyOrdersClick(() => setOpen(false));
                          }}
                        >
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        navigateRegister();
                        handleOpen();
                      }}
                      className="text-sm font-medium hover:text-gray-500"
                      sx={{ color: "white" }}
                    >
                      Signin
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="flex items-center lg:ml-6">
                  <p className="p-2 text-white hover:text-gray-500">
                    <span className="sr-only">Search</span>

                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </p>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Button
                    onClick={handleAddToCart}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {/* <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-500">
                      2
                    </span> */}
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                  {/* Snackbar Notification */}
                  <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000} // Auto-hide after 3 seconds
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert
                      onClose={() => setOpenSnackbar(false)}
                      severity="warning"
                      sx={{ width: "100%" }}
                    >
                      You must be signed in to view your cart!
                    </Alert>
                  </Snackbar>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}
