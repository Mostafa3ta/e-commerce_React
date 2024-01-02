import React, { useContext, useEffect, useState } from 'react'
import styles from './SearchDisplay.module.css'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from "react-helmet";

export default function SearchDisplay() {

  let { updateCartProducts, addCart , Counter} = useContext(CartContext);

  const [isLoading, setisLoading] = useState(false)
  const [SearchValue, setSearchValue] = useState('');
  const [NewProducts, setNewProducts] = useState([]);
  const [NewCategories, setNewCategories] = useState([]);

  function getProducts(value) {
    return axios.get(`https://dummyjson.com/products`)
      .then((response) => response)
      .then((response) => {
        const results = response.data.products.filter((product) => {
          return value && product.title.toLowerCase().includes(value.toLowerCase())
        })
        console.log(results);
        setNewProducts(results)
        setisLoading(false)
      })

  }
  function getCategories(value) {
    return axios.get(`https://dummyjson.com/products/categories`)
      .then((response) => response)
      .then((response) => {
        const results = response.data.filter((category) => {
          return value && category.toLowerCase().includes(value.toLowerCase())
        })
        console.log(results);
        setNewCategories(results)
      })
  }

  async function addCartProducts(id) {
    let response = await addCart(id)
    let response2 = await updateCartProducts(id)
    console.log(response.data);
    console.log(response2.data);
    if (response2.data.totalProducts === 6) {
      toast.success(response2.data.products[5].title.split(' ').slice(0, 2).join(' ') + ' is  Added To Cart Successfully',{duration:4000})
    }
  }



  const handleChang = (value) => {
    setSearchValue(value);
    getProducts(value);
    getCategories(value)
    localStorage.setItem('searchValue', value)
  }
  useEffect(() => {
    if (localStorage.getItem('searchValue') !== null) {
      setSearchValue(localStorage.getItem('searchValue'));
      getProducts(localStorage.getItem('searchValue'));
      getCategories(localStorage.getItem('searchValue'))
    }
  }, [])

  return <>

    <Helmet>
      <title>Search</title>
    </Helmet>

    <div className="row my-3 align-items-center mt-4">
      <div className="d-flex justify-content-center">
        <input className="form-control m-4 px-4 w-50 border-success rounded-5 " onChange={(e) => handleChang(e.target.value)} value={SearchValue} type="search" placeholder="Search Products & Categories" aria-label="Search" />
      </div>
      {NewCategories.length > 0 ? <h2 className='fw-bolder text-success py-4'>Categories :</h2> : null}
      {NewCategories.map((Category) =>
        <div className="col-md-3 rounded-3 m-2 col-5 product py-2 cursor-pointer">
          <Link to={`/categorydetails/${Category}`}>
            <h2 className='h5 tw-bold main'>{Category}</h2>
          </Link>
        </div>
      )}

      {NewProducts.length > 0 ? <h2 className='fw-bolder text-success py-4'>Products :</h2> : null}
      {NewProducts?.map((product) => <div key={product.id} className="cursor-pointer col-md-4 col-6 col-lg-3 col-xl-2">
        <div className="py-3 my-3 rounded-3 product px-2 ">
          <Link to={`/productdetails/${product.id}`}>
            <img src={product.thumbnail} className='w-100' height={110} alt="" />
            <span className='text-success font-sm'>{product.category}</span>
            <h3 className='h6 fw-bolder'>{product.title}</h3>
            <div className='d-flex justify-content-between'>
              <span className='text-muted'>{product.price} $</span>
              <span>
                <i className='fas fa-star rating'></i>
                {product.rating}
              </span>
            </div>
          </Link>
          <button onClick={() => addCartProducts(product.id)} className="btn btn-outline-success w-100">+ Add to Cart</button>
        </div>
      </div>)}
    </div>
  </>
}
