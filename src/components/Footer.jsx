import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className=' w-full px-6'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
            <div className='border border-gray-50 rounded-lg bg-gray-50 shadow-lg'>
                <img src={assets.logo} className='mb-3 w-32 ml-2 mt-2' alt="" />
                <p className='w-full md:w-2/3 text-gray-600 ml-4 mb-2'>
                    At La motif silver jewelry couture, we embody artisanal luxury in silver jewelry, upholding a legacy of exceptional craftsmanship and timeless designs that convey a narrative.
                </p>
            </div>
            
            <div className='border border-gray-50 bg-gray-50 rounded-lg shadow-lg'>
                <p className='text-xl font-medium mt-5 mb-5 text-gray-700 ml-2 '>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600 ml-2 mb-4'>
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/about'><li>About Us</li></Link>
                    <li>Delivery</li>
                </ul>
            </div>

            <div className='border border-gray-50 rounded-lg bg-gray-50 shadow-lg'>
                <p className='text-xl font-medium mt-5 mb-5 text-gray-700 ml-2'>Contact Us</p>
                <ul className='flex flex-col gap-1 text-gray-600 ml-2 mb-2'>
                    <li>(732) 306-2209</li>
                    <li>pipsous@gmail.com</li>
                </ul>
            </div>


        </div>

        
    </div>
  )
}

export default Footer