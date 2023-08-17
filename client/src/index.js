import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from './Main Page/MainPage';
import Shopping from './ShopPage/Shop1/Shopping';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Login/RegisterPage';
import { Provider } from 'react-redux';
import { store } from './Config/Store';
import Detail from './Detail/Detail';
import Viewbag from './ViewBag/Viewbag';
import Contact from './Contact/Contact';
import Checkout from './Checkout/Checkout';
import Favpage from './FavPage/Favpage';
import Users from './AdminApi/Users';
import Dashboard from './AdminApi/Dashboard';
import AddPage from './AdminApi/AddPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <MainPage/>,
      },
      {
        path: "Shop",
        element: <Shopping/>,
      },
      {
        path: "login",
        element: <LoginPage/>,
      },
      {
        path: "register",
        element: <RegisterPage/>,
      },
      {
        path: "view/:proID",
        element: <Detail/>,
      },
      {
        path: "viewBag",
        element: <Viewbag/>,
      },
      {
        path: "contact",
        element: <Contact/>,
      },
      {
        path: "checkout",
        element: <Checkout/>,
      },
      {
        path: "SavedItems",
        element: <Favpage/>,
      }
    

    ]
  },
  {
    path: "/admin",
    element: <Dashboard/>,
    children:[
      {
        path: "/admin",
        element: <AddPage/>,
      },
      {
        path: "users",
        element: <Users/>,
      },
      {

      }
    ]
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />

  </Provider>
);


