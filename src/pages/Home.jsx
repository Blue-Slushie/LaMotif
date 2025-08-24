import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/Bestseller'
import Policy from '../components/Policy'
import Reviews from "../components/Reviews";

const Home = () => {
  return (
    <div>
      <Hero/>
      <p className='py-5'></p>
      <LatestCollection/>
      <p className='py-5'>
      </p>
      <Bestseller></Bestseller>
      <Reviews />

    </div>
  )
}

export default Home