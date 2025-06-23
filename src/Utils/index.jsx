import axios from "axios";

const url = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: url,
});

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
};

export const generateProductQuantity = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const qty = index + 1;
    return (
      <option key={qty} value={qty}>
        {qty}
      </option>
    );
  });
};
