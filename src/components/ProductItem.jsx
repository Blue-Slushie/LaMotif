import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price}) => {
    //const {currency} = useContext(ShopContext);
    const { formatPrice } = useContext(ShopContext);
    return (
        <Link className='text-gray-700 cursor-pointer group' to={`/product/${id}`}>
            <div className="overflow-hidden w-full aspect-square rounded-lg bg-gray-100">
                <img 
                  className='w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105' 
                  src={Array.isArray(image) ? image[0] : image} 
                  alt={name} 
                />
            </div>
            <p className='py-1'></p>
            <div className='bg-white p-4 rounded-lg pt-3 pb-3 text-sm text-black'>
                <p>{name}</p>
                {/* <p className=' text-sm font-medium'>{currency}{price}</p> */}
                <p className=' text-sm font-medium'>{formatPrice(price)}</p>
            </div>
            
        </Link>
    )
}

export default ProductItem
