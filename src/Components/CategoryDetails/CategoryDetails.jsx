import React, { useEffect, useState, useContext } from 'react'
import styles from './CategoryDetails.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from "react-helmet";

export default function CategoryDetails() {
  let { updateCartProducts, addCart , Counter} = useContext(CartContext)


  let params = useParams()

  const [isLoading, setisLoading] = useState(false)
  const [CategoryDetails, setCategoryDetails] = useState([]);
  const [ParamsCategory, setParamsCategory] = useState(null);

  async function addCartProducts(id) {
    let response = await addCart(id)
    let response2 = await updateCartProducts(id)
    console.log(response.data);
    console.log(response2.data);
    if (response2.data.totalProducts === 6) {
      toast.success(response2.data.products[5].title.split(' ').slice(0, 2).join(' ') + ' is  Added To Cart Successfully', { duration:4000})
    }
  }

  async function getCategoryDetails(category) {
    setisLoading(true)
    let { data } = await axios.get(`https://dummyjson.com/products/category/${category}`)
    setCategoryDetails(data.products)
    setisLoading(false)
    console.log(CategoryDetails);
  }



  useEffect(() => {

    getCategoryDetails(params.category);
    setParamsCategory(params.category)

  }, [])

  return <>

    <Helmet>
      <title>Categories</title>
    </Helmet>

    {isLoading ? <section id="loading">
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </section> :
      <div className="row my-3 mt-4">
        <h2 className='fw-bolder text-success mt-4'>{`${ParamsCategory}`} :</h2>
        {CategoryDetails.map((product) => <div key={product.id} className="cursor-pointer col-md-4 col-6 col-lg-3 col-xl-2">
          <div className="my-2 py-3 product rounded-4 px-2 ">
            <Link to={`/productdetails/${product.id}`}>
              <img src={product.thumbnail} className='w-100' height={110} alt="" />
              <span className='text-success font-sm'>{product.category}</span>
              <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
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
    }
  </>
}
