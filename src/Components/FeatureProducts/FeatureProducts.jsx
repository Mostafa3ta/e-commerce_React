import React, { useContext, useEffect, useState } from 'react'
import styles from './FeatureProducts.module.css'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function FeatureProducts() {

  let { updateCartProducts, addCart ,Counter } = useContext(CartContext);

  const [isLoading, setisLoading] = useState(false)
  const [products, setProducts] = useState([]);

  async function getProducts() {
    setisLoading(true)
    let { data } = await axios.get(`https://dummyjson.com/products`)
    setProducts(data.products)
    setisLoading(false)
  }

  async function addCartProducts(id) {
    let response = await addCart(id)
    let response2 = await updateCartProducts(id)
    console.log(response.data);
    console.log(response2.data);
    if (response2.data.totalProducts === 6) {
      toast.success(response2.data.products[5].title.split(' ').slice(0, 2).join(' ') + ' is  Added To Cart Successfully', {duration:4000})
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  return <>



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
    </section> :

      <div className="row my-3 bg-light rounded-3">
        {products.map((product) => <div key={product.id} className="cursor-pointer col-md-4 col-6 col-lg-3 col-xl-2">
          <div className="my-3 py-3 product px-2 rounded-3 ">
            <Link to={`/productdetails/${product.id}`}>
              <img src={product.thumbnail} className='w-100' height={110} alt="" />
              <span className='text-success font-sm'>{product.category}</span>
              <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
              <div className='d-flex justify-content-between'>
                <span className='text-muted'>{product.price} $</span>
                <span><i className='fas fa-star rating'></i>{product.rating} </span>
              </div>
            </Link>
            <button onClick={() => addCartProducts(product.id)} className="btn btn-outline-success mt-2 w-100">+ Add to Cart</button>
          </div>
        </div>)}
      </div>
    }
  </>
}
