import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitButton } from "../Components";
import { customFetch } from "../Utils";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const values = await request.formData();
  const data = Object.fromEntries(values);

  try {
    const response = await customFetch.post("/auth/local/register", data);
    toast.success("Account successfully created");
    return redirect("/login");
  } catch (error) {
    const response =
      error?.response?.data?.error?.message || "Please review your credentials";
    toast.error(response);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          type="text"
          label="username"
          name="username"
          defaultValue="erick omondi"
        />
        <FormInput
          type="email"
          label="email"
          name="email"
          defaultValue="erick@gmail.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />

        <div className="mt-4">
          <SubmitButton text="register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
