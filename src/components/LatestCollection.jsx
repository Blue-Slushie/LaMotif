import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts((products || []).slice(0, 10));
  }, [products]);

  return (
    <section aria-labelledby="latest-collection" className="relative my-12">
      <div
        className="relative overflow-hidden rounded-2xl ring-1 ring-stone-200  bg-center shadow-sm"
        style={{ backgroundImage: `url(${assets.bestseller1})` }}
      >
        {/* Cozy light overlay (soft linen feel) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-amber-50/40 to-white/85" />
        {/* Gentle warm vignette */}
        <div className="pointer-events-none absolute -top-28 -right-24 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
          {/* Header */}
          <div className="text-center text-stone-800">
            <span className="inline-block rounded-full border border-stone-300 bg-white/70 px-3 py-1 text-[11px] tracking-wider uppercase">
              New Arrivals
            </span>
            <h2 id="latest-collection" className="mt-4">
              <Title text1="Latest" text2="Collections" />
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-prose mx-auto">
              Hand-picked pieces with warm finishes and everyday comfort.
            </p>

            {/* Stitched divider */}
            <div className="mx-auto mt-6 w-28 border-t-2 border-dashed border-stone-300" />
          </div>

          {/* Category chips */}
          <div className="mt-6 flex gap-2 overflow-x-auto justify-center">
            {['Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Bridal Sets'].map((cat) => (
              <NavLink
                key={cat}
                to={`/collection?category=${encodeURIComponent(cat)}`}
                className="whitespace-nowrap rounded-full border border-stone-300 bg-white/80 px-3 py-1 text-xs sm:text-sm text-stone-700 hover:bg-amber-50 hover:border-amber-200 transition"
              >
                {cat}
              </NavLink>
            ))}
          </div>

          {/* Products Grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {latestProducts.map((item) => (
              <div
                key={item._id}
                className="group relative rounded-xl bg-white/95 ring-1 ring-stone-200 shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
                <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-rose-200 text-stone-800 text-[10px] px-2 py-0.5 uppercase tracking-wide">
                  New
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <NavLink
              to="/collection"
              className="inline-flex items-center gap-2 rounded-full bg-amber-200 px-5 py-2 text-stone-900 text-sm ring-1 ring-amber-300/60 hover:bg-amber-300 transition"
            >
              See more
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.293 4.293a1 1 0 0 1 1.414 0l6 6a.997.997 0 0 1 .083 1.32l-.083.094-6 6a1 1 0 0 1-1.497-1.32l.083-.094L17.585 12H4a1 1 0 0 1-.117-1.993L4 10h13.585l-4.292-4.293a1 1 0 0 1 0-1.414z" />
              </svg>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
