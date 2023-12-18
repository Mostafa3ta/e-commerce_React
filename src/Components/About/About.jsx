import React from 'react'
import styles from './About.module.css'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";


export default function About() {

  return <>

    <Helmet>
      <title>About</title>
    </Helmet>

    <div className='my-4 col-md-6 about'>
      <div>
        <h3 className='text-success my-3 fw-bold'>About Cart :</h3 >
        <div className='h5'>The wepsite have few things are not totally functional because the API is so
          limited and used only for testing ,Specially the cart has a lot of issues because i cannot really
          add into the server or modify it, so i imitated it by the local storage so at least
          it can work, But you can see the result for some of the requests in the (console).
        </div>
      </div>
      <hr />
      <div>
        <h3 className='text-success my-3 fw-bold'>About Login :</h3 >
        <div className='h5'>you cannot signup new user into the server it is just simulate the request and the response is
          in the (console), And that's why there's a given username and password belongs to a user stored in 
          the database and when you login it respondes with a Token that you cannot access the wepsite without it .
        </div>
      </div>
      <hr />
      {/* <div className='my-3'>
        <h3 className='h5 text-success fw-bold'>Used API :</h3 >
        <Link to="https://dummyjson.com/" target='_blank' ><h4 className='px-2 h6 fw-bolder'>dummyjson.com</h4></Link>
      </div> */}
    </div>

  </>
}
