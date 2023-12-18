import React, { useEffect, useState } from 'react'
import styles from './CategorySlider.module.css'
import Slider from 'react-slick'
import axios from 'axios'
import { Link } from 'react-router-dom'




export default function CategorySlider() {

  const [Categories, setCategories] = useState([])

  async function getCategories() {
    let { data } = await axios.get(`https://dummyjson.com/products/categories`)
    setCategories(data)
  }




  useEffect(() => {
    getCategories()

  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    swipeToSlide: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   pauseOnHover: true,
  //   swipeToSlide: true, 
  // };

  return <>

    <h2 className='fw-bolder text-success mt-5'>Categories :</h2>
    <div className="row m-auto mb-5 bg-light rounded-3">
      <Slider {...settings}>
        {Categories.map((Category) =>
          <Link to={`/categorydetails/${Category}`}>
            <div className="product  my-5 d-flex rounded-4 justify-content-center">
              <div className=" py-1  text-center">
                <h2 className='h4 cursor-pointer text-bold'>{Category}</h2>
              </div>
            </div>
          </Link>
        )}
      </Slider>
    </div>


  </>
}
