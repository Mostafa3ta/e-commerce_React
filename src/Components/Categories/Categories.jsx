import React, { useState, useEffect } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

export default function Categories() {

  const [Categories, setCategories] = useState([])
  const [isLoading, setisLoading] = useState(false)

  async function getCategories() {
    setisLoading(true)
    let { data } = await axios.get(`https://dummyjson.com/products/categories`)
    setCategories(data)
    setisLoading(false)
  }

  useEffect(() => {
    getCategories()

  }, [])

  return <>

    <Helmet>
      <title>Categories</title>
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

      <div className="row m-4 mt-4 justify-content-center text-center">
        {Categories.map((Category) =>
          <div className="col-md-4  col-lg-3 product m-2 rounded-3 py-1 cursor-pointer">
            <Link to={`/categorydetails/${Category}`}>
              <h2 className='h5 tw-bold main'>{Category}</h2>
            </Link>
          </div>
        )}
      </div>
    }

  </>
}
