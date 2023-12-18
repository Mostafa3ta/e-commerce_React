import React from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'


export default function Footer() {


  return <>
    <div className="fixed-bottom clearfix">

      <footer className="bg-dark text-center text-white">
        <div className="container p-2 pb-0">
          {/* <div className='col-6'>Follow Us :</div> */}
          <section className="pb-2 ">
            <Link className="btn btn-outline-light btn-floating m-1" to="#" role="button">
              <i className="fab fa-facebook-f"></i></Link>

            <Link className="btn btn-outline-light btn-floating m-1" to="#" role="button">
              <i className="fab fa-twitter"></i></Link>

            {/* <Link className="btn btn-outline-light btn-floating m-1" to="#" role="button">
              <i className="fab fa-google"></i></Link> */}

            <Link className="btn btn-outline-light btn-floating m-1" to="#" role="button">
              <i className="fab fa-instagram"></i></Link>

            <Link className="btn btn-outline-light btn-floating m-1" to="#" role="button">
              <i className="fab fa-linkedin-in"></i></Link>

            <Link className="btn btn-outline-light btn-floating  m-1" to="#" role="button">
              <i className="fab fa-github"></i></Link>
          </section>
        </div>

      </footer>

    </div>
  </>
}

