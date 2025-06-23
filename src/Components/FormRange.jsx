import { useState } from "react";
import { formatPrice } from "../Utils";

const FormRange = ({ label, name, size, price }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [myPrice, setPrice] = useState(price || maxPrice);
  return (
    <section className="form-control">
      <label htmlFor={name} className="label">
        <span className="capitalize label-text mr-20 cursor-pointer">
          {label}
        </span>
        <span>{formatPrice(myPrice)}</span>
      </label>
      <input
        type="range"
        onChange={(e) => setPrice(e.target.value)}
        name={name}
        value={price}
        min={0}
        max={maxPrice}
        step={step}
        className={`range range-primary ${size}`}
      />
    </section>
  );
};
export default FormRange;
