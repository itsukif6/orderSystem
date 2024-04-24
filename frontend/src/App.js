import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Welcome from './Welcome/Welcome';
import Login from './Login/Login';
import Menu from './Menu/Menu';
import Register from './Register/Register';
import Order from './Order/Order';
import './App.css';

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
  ])

  return (
    <RouterProvider router={router} />
  )
};

export default App;


