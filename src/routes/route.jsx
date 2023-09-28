/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Login from "../Pages/Login/index";

import Welcome from "../Pages/Welcome";
import NotFound from "../Pages/NotFound";
import Dashboard from "../Pages/Dashboard/";
import ProtectedRoute from "../Components/ProtectedRoute.jsx";
import Edit from '../pages/Edit';

const routes = [
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
   {
    path: "/edit/:userId",
    element: (
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    ),
  },
 
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/*",
    element: <NotFound />,
  },
];

export default routes;
