import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Toaster } from 'react-hot-toast';
import CartContextProvider from './Context/CartContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import SearchDisplay from './Components/SearchDisplay/SearchDisplay';
import AddCart from './Components/AddCart/AddCart';
import About from './Components/About/About';
import Products from './Components/Products/Products';
import { Offline, Online, Detector } from "react-detect-offline";

function App() {


  useEffect(() => {
    if (localStorage.getItem('dataToken') !== null) {
      saveUserData();
    }
  }, [])

  function saveUserData() {
    let encodedToken = localStorage.getItem('dataToken')
    let decodedToken = jwtDecode(encodedToken)
    console.log(decodedToken);
  }

  let routers = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'categorydetails/:category', element: <ProtectedRoute><CategoryDetails /> </ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'searchproduct', element: <ProtectedRoute><SearchDisplay /></ProtectedRoute> },
        { path: 'addcart', element: <ProtectedRoute><AddCart /></ProtectedRoute> },
        { path: 'about', element: <ProtectedRoute><About /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /> </ProtectedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  return <><CartContextProvider>
    <Toaster />
    <RouterProvider router={routers}></RouterProvider>
  </CartContextProvider>
  </>
}

export default App;
