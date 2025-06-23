import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../Utils";

const ProductsList = () => {
  const { products } = useLoaderData();

  return (
    <div className="pt-12 grid gap-y-8 ">
      {products.map((prod) => {
        const { attributes: att } = prod;
        return (
          <Link
            key={prod.id}
            to={`/products/${prod.id}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100  shadow-xl hover:shadow-2xl group duration-300"
          >
            <img
              src={att.image}
              alt={att.title}
              className="rounded-xl h-24 w-24 sm:h-32 sm:w-24 group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="ml-0 sm:ml-16">
              <h2 className="font-medium text-lg capitalize tracking-wider">
                {att.title}
              </h2>
              <h3 className="text-neutral-content capitalize">
                {formatPrice(att.price)}
              </h3>
            </div>
            <p className="font-medium ml-0 sm:ml-auto text-lg">{att.company}</p>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsList;
