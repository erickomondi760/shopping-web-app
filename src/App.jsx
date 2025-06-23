import {
  HomeLayout,
  About,
  Cart,
  Checkout,
  Error,
  Landing,
  Login,
  Orders,
  Register,
  Products,
  SingleProduct,
} from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as landingLoader } from "./pages/Landing";
import { loader as productLoader } from "./pages/SingleProduct";
import { ErrorElement } from "./Components";
import { loader as productsLoader } from "./pages/Products";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./Components/CheckoutPage";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";
import { store } from "./Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          loader: landingLoader(queryClient),
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "products",
          element: <Products />,
          errorElement: <ErrorElement />,
          loader: productsLoader(queryClient),
        },
        {
          path: "products/:id",
          element: <SingleProduct />,
          errorElement: <ErrorElement />,
          loader: productLoader(queryClient),
        },
        {
          path: "orders",
          element: <Orders />,
          loader: ordersLoader(store, queryClient),
        },
        {
          path: "cart",
          element: <Cart />,
        },

        {
          path: "checkout",
          element: <Checkout />,
          loader: checkoutLoader(store),
          action: checkoutAction(store, queryClient),
        },
      ],
    },

    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
      action: loginAction(store),
    },

    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />,
      action: registerAction,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />;
    </QueryClientProvider>
  );
}

export default App;
