import { useState } from "react";
import { Filter, PaginationContainer, ProductsContainer } from "../Components";
import { customFetch } from "../Utils";

const url = "/products";

const productsQuery = (params) => {
  const { search, category, company, sort, price, shipping, page } = params;

  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch(url, { params }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([...new URL(request.url).searchParams]);

    const response = await queryClient.ensureQueryData(productsQuery(params));
    const products = response.data.data;

    const meta = response.data.meta;
    return { products, meta, params };
  };

const Products = () => {
  return (
    <>
      <Filter />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
