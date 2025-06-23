import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

function Filter() {
  const { meta, params } = useLoaderData();
  const { search, company, categories, order, price, shipping } = params;
  return (
    <Form className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 rounded-lg bg-base-200 items-center">
      <FormInput
        label="Product search"
        name="search"
        type="search"
        size="input-sm"
        defaultValue={search}
      />
      <FormSelect
        label="select company"
        name="company"
        list={meta.companies}
        size="select-sm"
        defaultValue={company}
      />
      <FormSelect
        label="categories"
        name="categories"
        list={meta.categories}
        size="select-sm"
        defaultValue={categories}
      />
      <FormSelect
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        defaultValue={order}
      />
      <FormRange
        label="select price"
        name="price"
        size="range-sm"
        price={price}
      />
      <FormCheckbox
        label="Free shipping"
        name="shipping"
        defaultValue={shipping}
        size="checkbox-sm"
      />
      <button type="submit" className="btn btn-primary btn-sm">
        Search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        Reset
      </Link>
      {/* <FormInput label="Product name" name="Product name" type="label" /> */}
    </Form>
  );
}
export default Filter;
