import React from 'react'
import { assets } from '../assets/assets'
const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-600'>
      <div>
        <img src={assets.authentic} className='w-23 m-auto mb-5'></img>
        <p className='font-semibold'>Authentic Indian Jewelry</p>
        <p className='text-gray-500'>Timeless designs that celebrate heritage, craftsmanship, and elegance</p>
      </div>
    </div>
  )
}

export default Policy