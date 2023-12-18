import React from 'react'
import styles from './Home.module.css'
import CategorySlider from '../CategorySlider/CategorySlider'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import { Helmet } from "react-helmet";


export default function Home() {
  return <>

    <Helmet>
      <title>Home</title>
    </Helmet>
    <CategorySlider />
    <hr />
    {/* <h2 className='fw-bolder text-success mt-4'>Products :</h2> */}
    <FeatureProducts />
  </>
}
