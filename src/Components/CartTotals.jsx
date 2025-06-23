import { useSelector } from "react-redux";
import { formatPrice } from "../Utils";

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );
  // console.log(cartTotal, shipping);

  return (
    <div className="bg-base-300 card">
      <div className="card-body">
        <p className="text-sm flex justify-between pb-2 border-b border-base-300">
          <span className="font-medium">Subtotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>
        <p className="text-sm flex justify-between pb-2 border-b border-base-300">
          <span className="font-medium">Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>
        <p className="text-sm flex justify-between pb-2 border-b border-base-300">
          <span className="font-medium">tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>
        <p className="text-xl flex justify-between mt-2 ">
          <span className="font-medium">Total</span>
          <span className="font-medium">{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};
export default CartTotals;
