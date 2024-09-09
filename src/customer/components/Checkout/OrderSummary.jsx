import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../Cart/CartItem";

const OrderSummary = () => {
  return (
    <div className="p-4">
      {/* Address card section */}
      <div className="p-5 shadow-lg rounded-md border mb-6">
        <AddressCard />
      </div>

      {/* Main order summary */}
      <div>
        <div className="lg:grid grid-cols-3 gap-6 relative">
          {/* Cart items */}
          <div className="col-span-2 space-y-4">
            {[1, 1, 1, 1].map((item, index) => (
              <CartItem key={index} />
            ))}
          </div>

          {/* Cart total section */}
          <div className="px-5 h-auto mt-5 lg:mt-0">
            <div className="border-2 rounded-md shadow-lg p-4">
              <p className="uppercase font-bold opacity-60 pb-4 text-left">
                Cart Total
              </p>
              <hr />
              <div className="space-y-3 font-semibold mb-6">
                <div className="flex justify-between pt-3 text-black">
                  <span>Subtotal</span>
                  <span>₹5,029.00</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Shipping</span>
                  <span>₹316.00</span>
                </div>
                <hr />
                <div className="flex justify-between text-black text-lg font-bold">
                  <span>Total</span>
                  <span>₹5,345.00</span>
                </div>
              </div>

              {/* Proceed to Pay button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#7f0000] px-8 py-3 text-base font-medium text-white hover:bg-[#500000] focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
              >
                Proceed to pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
