import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import { customFetch, formatPrice } from "../Utils";
import { toast } from "react-toastify";
import { clearCart } from "../Features/Cart/CartSlice";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const information = await request.formData();
    const { name, address } = Object.fromEntries(information);

    const user = store.getState().userState.user;
    const { cartItems, numItemsInCart, orderTotal } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      await customFetch.post(
        "/orders",
        { data: info },
        { headers: { Authorization: `Bearer ${user.token} ` } }
      );

      toast.success("Order successfully placed");
      store.dispatch(clearCart());
      queryClient.removeQueries(["orders"]);
      return redirect("/orders");
    } catch (error) {
      const response =
        error?.response?.data?.error?.message || "Failed to place an order";
      toast.error(response);

      if (error?.response?.status === 401 || error?.response?.status === 403)
        return redirect("/login");

      return null;
    }
  };

const Checkout = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-8">
      <h4 className="font-medium capitalize text-xl">shipping information</h4>
      <FormInput label="First name" name="name" type="text" />
      <FormInput label="Address" name="address" type="text" />
      <div className="mt-6">
        <SubmitButton text="Place your order" />
      </div>
    </Form>
  );
};
export default Checkout;
