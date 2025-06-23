import { ProductsGrid, ProductsList } from "../Components";
import { useLoaderData } from "react-router-dom";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useState } from "react";

const ProductsContainer = () => {
  const [layout, setLayout] = useState("grid");
  const { meta } = useLoaderData();

  const setActiveStyles = (pattern) => {
    return `btn btn-cycle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-based-content"
    }`;
  };
  return (
    <>
      <div className="flex justify-between items-center mt-8 border-b-8 border-base-300 pb-5">
        <h4 className="font-medium text-xl">
          {meta.pagination.total}
          {` Product${meta.pagination.total > 1 && "s"}`}
        </h4>
        <div className="flex gap-x-2">
          <button
            className={setActiveStyles("grid")}
            onClick={() => setLayout("grid")}
          >
            <BsFillGridFill />
          </button>
          <button
            className={setActiveStyles("list")}
            onClick={() => setLayout("list")}
          >
            <BsList />
          </button>
        </div>
      </div>
      {meta.pagination.total === 0 ? (
        <h4>There are no products currently</h4>
      ) : layout === "grid" ? (
        <ProductsGrid />
      ) : (
        <ProductsList />
      )}
    </>
  );
};
export default ProductsContainer;
