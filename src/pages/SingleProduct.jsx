import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { customFetch, formatPrice, generateProductQuantity } from "../Utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../Features/Cart/CartSlice";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProd", id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );

    return { product: response.data.data };
  };

const SingleProduct = () => {
  const { product } = useLoaderData();

  const { image, title, price, description, colors, company } =
    product.attributes;

  const [prodColor, setProdColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const dispatch = useDispatch();
  const cartProduct = {
    cartId: product.id + prodColor,
    productId: product.id,
    image,
    title,
    price,
    company,
    prodColor,
    quantity,
  };

  const navigate = useNavigate();
  const handAddToCart = () => {
    dispatch(addItem(cartProduct));
    navigate("/cart");
  };

  return (
    <section className="breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">products</Link>
        </li>
      </ul>

      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />

        <div className="mt-6">
          <h1 className="text-3xl capitalize font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{formatPrice(price)}</p>
          <p className="mt-8 leading-7">{description}</p>
          <div className="mt-6">
            <h4 className="text-xl capitalize font-medium tracking-wider">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    className={`badge w-6 h-6 mr-2
                  ${color === prodColor && "border-2 border-secondary"}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProdColor(color)}
                  ></button>
                );
              })}
            </div>
            {/* Quantity */}
            <div className="form-control w-full max-w-xs mt-4">
              <label className="label" htmlFor="qty">
                <h4 className="capitalize text-xl font-medium tracking-wider ">
                  amount
                </h4>
              </label>
              <select
                name="qty"
                id="qty"
                className="select select-secondary select-md"
                value={quantity}
                onChange={handleQuantity}
              >
                {generateProductQuantity(10)}
              </select>
            </div>
            <div className="mt-10">
              <button
                className="btn btn-secondary btn-md"
                onClick={handAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;
