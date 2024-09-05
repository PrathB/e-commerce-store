import React from "react";
import CartItem from "./CartItem";

const Cart = () => {
  return (
    <div>
      <div className="lg:grid grid-cols-3 pt-6 lg:px-16 relative">
        <div className="col-span-2 space-y-4">
          {[1, 1, 1, 1].map((item) => (
            <CartItem />
          ))}
        </div>
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
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#7f0000] px-8 py-3 text-base font-medium text-white hover:bg-[#500000] focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
