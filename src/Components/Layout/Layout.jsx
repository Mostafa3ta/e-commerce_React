import React, { useContext, useState } from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Offline, Online, Detector } from "react-detect-offline";
import { Helmet } from "react-helmet";

export default function Layout({ userData, setuserData }) {

  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('dataToken')
    localStorage.removeItem('newCart')
    localStorage.removeItem('CartCount')
    navigate('/login')
  }

  return <>

    <Helmet >
      <title>Home</title>
    </Helmet>

    <div className='layout '>
      <Navbar logOut={logOut} userData={userData} />

      <div className="container">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
    <Offline > <div className='offline-detect p-1'>You are Offline<i class="fa-solid fa-wifi px-1"></i> </div> </Offline>
  </>
}
