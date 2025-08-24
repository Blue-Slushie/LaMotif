import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const AddToCartButton = ({ id, className = '' }) => {
  const { addToCart } = useContext(ShopContext);
  return (
    <button
      onClick={(e) => { e.preventDefault(); addToCart(id, 1); }}
      className={`inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-sm hover:opacity-90 transition ${className}`}
      aria-label="Add to cart"
    >
      Add to bag
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M10 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm10 0a2 2 0 1 1-3.999.001A2 2 0 0 1 20 17zM6 5h2l3.6 7.59L10.25 15H18v2H9a1 1 0 0 1-.9-.56L5.1 6H3V4h2a1 1 0 0 1 1 1z" />
      </svg>
    </button>
  );
};

export default AddToCartButton;