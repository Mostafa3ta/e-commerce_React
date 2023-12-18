import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from "react-helmet";

export default function ProductDetails() {

  let { updateCartProducts, addCart , Counter} = useContext(CartContext)

  const [isLoading, setisLoading] = useState(false)
  const [productDetails, setproductDetails] = useState(null)
  const [Images, setImages] = useState([]);


  async function addCartProducts(id) {
    let response = await addCart(id)
    let response2 = await updateCartProducts(id)
    console.log(response.data);
    console.log(response2.data);
    if (response2.data.totalProducts === 6) {
      toast.success(response2.data.products[5].title.split(' ').slice(0, 2).join(' ') + ' is  Added To Cart Successfully', { duration: 4000 })
    }
  }

  let params = useParams()

  async function getProductDetails(id) {
    setisLoading(true)
    let { data } = await axios.get(`https://dummyjson.com/products/${id}`)
    setproductDetails(data)
    setImages(data.images)
    setisLoading(false)
  }

  useEffect(() => {

    getProductDetails(params.id)
  }, [])


  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return <>

    <Helmet>
      <title>Product Details</title>
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
    </section> :


      <div className="row  py-3 my-3">
        <div className="col-md-4 ">
          <Slider className='my-5' {...settings}> {Images.map((image) =>
            <img src={image} className='w-100 py-2' alt="" />
          )}
          </Slider> </div>
        <div className="col-md-8 py-5">
          <h3 className=' text-bold py-2'>{productDetails?.title}</h3>
          <p className='py-2'>{productDetails?.description}</p>
          <div className='d-flex justify-content-between py-2'>
            <span className='text-muted'>{productDetails?.price} $</span>
            <span>
              <i className='fas fa-star rating'></i>
              {productDetails?.rating}
            </span>
          </div>
          <button onClick={() => addCartProducts(productDetails.id)} className="btn bg-success text-white w-100">+ Add to Cart</button>
        </div>
      </div>
    }





  </>
}
