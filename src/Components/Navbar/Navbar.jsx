import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

export default function Navbar({ logOut, userData }) {

  return <>

    <nav className="navbar navbar-expand-md navbar-light bg-light ">
      <div className="container-xxl">
        <Link className="navbar-brand fw-bolder" to="/"><i class="fa-solid fa-shop text-main"></i> Online Bazaar</Link>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {localStorage.getItem('dataToken') !== null ? <ul className="navbar-nav text-center ms-4 ">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="searchproduct"><i class="fa-solid fa-magnifying-glass px-1"></i>Search</Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="about">About Us</Link>
            </li>
            <li className="nav-item ">
              {localStorage.getItem('dataToken') != null ?
                <Link className="nav-link" to="cart">
                  <div className=' text-center '>
                    <i className="fa-solid position-relative fa-cart-shopping">
                      {(localStorage.getItem('CartCount')) !== null ? <span className='cart-count bg-warning pt-1 rounded-3 text-white'>{(JSON.parse(localStorage.getItem('CartCount')))}</span> : null}
                    </i>
                  </div>
                </Link> : null}
            </li>
          </ul> : null}
          <ul className="navbar-nav ms-auto mt-2 me-0 mt-lg-0">
            {localStorage.getItem('dataToken') === null ? <>
              <li className="nav-item text-center px-1">
                <Link className="nav-link text-main " to="register">Sign Up</Link>
              </li>
              <li className="nav-item text-center px-1">
                <Link className="nav-link text-main " to="login">Login</Link>
              </li> </>
              : <div className='dropstart'>
                <li className="nav-item text-center dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={JSON.parse(localStorage.getItem('userInfo'))?.image} className='user-img bg-dark rounded-circle' alt="userImage" />
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuLink">
                    <li className='dropdown-header'>
                      <span className="d-block py-1"><img src={JSON.parse(localStorage.getItem('userInfo'))?.image} className='bg-dark rounded-circle user-img ' alt="userImage" /></span>
                      <span className="d-block py-1">User : {JSON.parse(localStorage.getItem('userInfo'))?.username}</span>
                      <span className="d-block py-1">Email : {JSON.parse(localStorage.getItem('userInfo'))?.email}</span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item btn btn-light" to="addcart">User Cart</Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li className="dropdown-item">
                      <button onClick={logOut} className="btn btn-danger w-100 cursor-pointer" >LogOut</button>
                    </li>
                  </ul>
                </li>
              </div>
            }
          </ul>
        </div>
      </div>
    </nav >



  </>
}
