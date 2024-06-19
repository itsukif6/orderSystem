import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Login from "./Login/Login";
import Menu from "./Menu/Menu";
import Register from "./Register/Register";
import Order from "./Order/Order";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import OrderTrack from "./OrderTrack/OrderTrack";
import Staff from "./Staff/Staff";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import "./App.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/Menu",
      element: <Menu />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
    {
      path: "/Order",
      element: <Order />,
    },
    {
      path: "/ShoppingCart",
      element: <ShoppingCart />,
    },
    {
      path: "/Track",
      element: <OrderTrack />,
    },
    {
      path: "/Staff",
      element: <Staff />,
    },
    {
      path: "/ForgetPassword",
      element: <ForgetPassword />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
