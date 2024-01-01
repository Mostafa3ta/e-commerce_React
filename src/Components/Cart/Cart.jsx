import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getLoggedCart ,deleteCart } = useContext(CartContext)

  const [IsDeleted, setIsDeleted] = useState(false)

  const prices = [0];
  const myCart = [];
  if (localStorage.getItem('newCart') !== null) {
    myCart.push(JSON.parse(localStorage.getItem('newCart')))
  }
  myCart[0]?.map((product) => prices.push(product.total))
  const totalCart = prices.reduce((total, price) => total + price)


  async function deleteCartProducts() {
    let response = await deleteCart()
    console.log(response.data);
    localStorage.removeItem('newCart')
    localStorage.removeItem('CartCount')
    setIsDeleted(true)
  }


  useEffect(() => {

  }, [])



  return <>

    <Helmet>
      <title>Cart</title>
    </Helmet>



    {myCart !== null ? <div className="p-4 my-5 bg-light ">
      <div className="d-flex justify-content-between">
        <div>
          <h3 className='py-0'>Your Cart :</h3>
          <h6 className='text-main' >Total Price is : {totalCart} $</h6>
        </div>
        <div className='d-flex align-items-center '>
          <div className='ms-auto'>
            <button onClick={deleteCartProducts} className='btn btn-outline-danger m-2'>Clear Cart</button>
          </div>
          {IsDeleted ? <div className="text-main">Cart Is Clear</div> : null}
        </div>
      </div>
      <hr />
      {myCart[0]?.map((product) => <div className='row my-3 '>
        <Link to={`/productdetails/${product.id}`} className="col-md-1 col-sm-2 col-3 my-2 cursor-pointer">
          <img src={product.thumbnail} className='w-100' alt="" />
        </Link>
        <div className="col-md-11 col-sm-10 my-1 d-flex justify-content-between">
          <div>
            <h6>{product.title}</h6>
            <h6 className='text-main'>{product.total} $</h6>
            <h6 className='cursor-pointer text-danger'><i className='fa-regular fa-trash-can'></i> remove </h6>
          </div>
          <div className='col-md-2 col-sm-3  col-5 mb-2 me-1'>
            <button className='btn border-main '>+</button>
            <span className=' px-2'>{product.quantity}</span>
            <button className='btn border-main '>-</button>
          </div>
        </div>
        <hr />
      </div>)}
    </div>
      : null}

    <div className='col-md-4 h5 d-flex text-danger'>Please Read :
      <Link to="../about" ><h4 className='px-2 h5 fw-bolder '>About</h4></Link>
    </div>

  </>
}
