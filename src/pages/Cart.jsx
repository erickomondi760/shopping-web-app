import { useSelector } from "react-redux";
import { CartItemsList, CartTotals, SectionTitle } from "../Components";
import { Link } from "react-router-dom";

const Cart = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  const user = useSelector((state) => state.userState.user);

  if (numItemsInCart === 0) {
    return (
      <div>
        <SectionTitle text="Shopping cart" />
        Your cart is empty
      </div>
    );
  }

  return (
    <>
      <SectionTitle text="Shopping cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="mt-8 btn btn-block btn-primary">
              Proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="mt-8 btn btn-block btn-primary">
              Login to checkout
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
