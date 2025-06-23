import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../Utils";

const ProductsGrid = () => {
  const { products } = useLoaderData();
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((prod) => {
        const { attributes: att } = prod;
        return (
          <Link
            key={prod.id}
            to={`/products/${prod.id}`}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={att.image}
                alt={att.title}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">
                {att.title}
              </h2>
              <span className="text-secondary">{formatPrice(att.price)}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
