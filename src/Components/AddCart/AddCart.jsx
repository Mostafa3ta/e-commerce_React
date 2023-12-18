import React, { useContext, useEffect, useState } from 'react'
import styles from './AddCart.module.css'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

export default function AddCart() {
  let { getLoggedCart, deleteCart, cartProductQuantity, NewCart } = useContext(CartContext)

  const [isLoading, setisLoading] = useState(false)
  const [CartDetails, setCartDetails] = useState(null)
  const [IsDeleted, setIsDeleted] = useState(false)
  const [DelationDate, setDelationDate] = useState(null)

  async function getCart() {
    setisLoading(true)
    let response = await getLoggedCart()
    setCartDetails(response.data)
    setisLoading(false)
    console.log(response.data)
  }

  async function changeQuantity(id, quantity) {
    let response = await cartProductQuantity(id, quantity)
    console.log(response.data);
    setCartDetails(response.data)
    setIsDeleted(false)
  }

  async function deleteCartProducts() {
    NewCart = [];
    let response = await deleteCart()
    console.log(response.data);
    setIsDeleted(response.data.isDeleted)
    setDelationDate(response.data.deletedOn)
  }

  useEffect(() => {
    getCart()
  }, [])


  return <>

    <Helmet>
      <title>User Cart</title>
    </Helmet>

    {isLoading ? <section id="loading">
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
    </section> : <>

      {CartDetails !== null ? <div className="p-4 my-5 bg-light ">
        <div className="d-flex justify-content-between">
          <div className='col-md-8 col-5' >
            <h3 className='py-0'>Stored User Cart :</h3>
            <h6 className='text-main' >Total Price is : {CartDetails.total} $</h6>
          </div>
          <div className='d-flex align-items-center col-md-4 col-7'>
            <div className='ms-auto'>
              <button onClick={deleteCartProducts} className='btn btn-outline-danger m-2'>Clear Cart</button>
            </div>
            {IsDeleted ? <div> <div className="text-main">Cart Is Cleared at :</div><span className='text-warning'>{DelationDate}</span></div> : null}
          </div>
        </div>
        {CartDetails.products?.map((product) => <div className='row my-3 '>
          <Link to={`/productdetails/${product.id}`} className="col-md-1 col-sm-2 col-3 my-2 cursor-pointer">
            <img src={product.thumbnail} className='w-100' alt="" />
          </Link>
          <div className="col-md-11 col-sm-10  my-1 d-flex justify-content-between">
            <div>
              <h6>{product.title}</h6>
              <h6 className='text-main'>{product.total} $</h6>
              <h6 onClick={() => changeQuantity(product.id, 0)} className='cursor-pointer text-danger'><i className='fa-regular fa-trash-can'></i> remove </h6>
            </div>
            <div className='col-md-2 col-sm-3 col-5 mb-2 me-1'>
              <button onClick={() => changeQuantity(product.id, product.quantity + 1)} className='btn border-main '>+</button>
              <span className=' px-2'>{product.quantity}</span>
              <button onClick={() => changeQuantity(product.id, product.quantity - 1)} className='btn border-main '>-</button>
            </div>
          </div>
          <hr />
        </div>)}
      </div>
        : null}

    </>}
    <div className='col-md-4 h5 d-flex text-danger'>Please Read :
      <Link to="../about" ><h4 className='px-2 h5 fw-bolder '>About Us</h4></Link>
    </div>
  </>
}

