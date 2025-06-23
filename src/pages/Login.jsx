import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitButton } from "../Components";
import { toast } from "react-toastify";
import { customFetch } from "../Utils";
import { loginUser } from "../Features/User/UserSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const result = await request.formData();
    const data = Object.fromEntries(result);

    try {
      const response = await customFetch.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      toast.success("Successfully logged in");
      return redirect("/");
    } catch (error) {
      const message =
        error?.response?.data?.error?.message ||
        "Please review your credentials";
      toast.error(message);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuest = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });

      dispatch(loginUser(response.data));
      toast.success("You successfully logged in");
      navigate("/");
    } catch (error) {
      return null;
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gray-y-4"
      >
        <h4 className="text-3xl font-bold text-center">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="defaultValue"
        />

        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitButton text="login" />
        </div>
        <button
          className="btn btn-block btn-secondary mt-3"
          onClick={loginAsGuest}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
