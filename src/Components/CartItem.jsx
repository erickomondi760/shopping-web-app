import { useDispatch } from "react-redux";
import { formatPrice, generateProductQuantity } from "../Utils";
import { editItems, removeItem } from "../Features/Cart/CartSlice";

const CartItem = ({ cartItem }) => {
  const { cartId, title, price, image, quantity, company, prodColor } =
    cartItem;

  const dispatch = useDispatch();

  const removeItemFromCart = () => {
    dispatch(removeItem(cartId));
  };

  const changeQuantity = (e) => {
    dispatch(editItems({ cartId, quantity: parseInt(e.target.value) }));
  };

  return (
    <article
      key={cartId}
      className="flex flex-col sm:flex-row flex-wrap border-b border-base-300 last:border-b-0 mb-12 gap-y-4 pb-6"
    >
      <img
        src={image}
        alt={title}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
      />

      {/* Info */}
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{title}</h3>
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>
        <p className="mt-5 flex items-center gap-x-2 text-sm capitalize">
          color:
          <span
            className="badge badge-sm"
            style={{ backgroundColor: prodColor }}
          ></span>
        </p>
      </div>

      {/* totals */}
      <div className="sm:ml-12">
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="p-0 label">
            <span className="label-text capitalize">Quantity</span>
          </label>
          <select
            name="amount"
            id="amount"
            value={quantity}
            onChange={changeQuantity}
            className="mt-2 select select-base select-bordered select-xs rounded-lg "
          >
            {generateProductQuantity(quantity + 5)}
          </select>
        </div>
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={removeItemFromCart}
        >
          Remove
        </button>
      </div>
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};
export default CartItem;
