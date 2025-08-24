import React, {useState, useContext, useEffect} from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { assets } from '../assets/assets';

const Bestseller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const best = (products || []).filter(p => p.bestseller);
    setBestSeller(best.slice(0, 10));
  }, [products]);

  return (
    <section aria-labelledby="bestsellers" className="relative my-12">
      <div
        className="relative overflow-hidden rounded-2xl bg-center ring-1 ring-amber-900/10"
        style={{ backgroundImage: `url(${assets.bestseller})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="pointer-events-none absolute -top-28 -left-20 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
          <div className="text-center text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-black/30 px-3 py-1 text-[11px] tracking-widest uppercase">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
                <path d="M3 7l4 3 5-6 5 6 4-3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7zM6 17h12v-2H6v2z" />
              </svg>
              Best Sellers
            </span>

            <h2 id="bestsellers" className="mt-4">
              <Title text3="Best" text4="Seller" />
            </h2>

            <p className="mt-2 text-sm sm:text-base text-amber-50/90">
              Timeless pieces, chosen by our customers—again and again.
            </p>

            <div className="mx-auto mt-6 flex items-center gap-3 w-fit">
              <span className="h-px w-16 bg-amber-200/70" />
              <span className="h-2 w-2 rotate-45 rounded-sm bg-amber-300/90" />
              <span className="h-px w-16 bg-amber-200/70" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {bestSeller.map(item => (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-xl bg-white/95 backdrop-blur-sm ring-1 ring-amber-900/10 shadow-sm hover:shadow-lg hover:ring-amber-400/50 transition"
              >
                <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
                <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-amber-500 text-white text-[10px] px-2 py-0.5 uppercase tracking-wide">
                  Top
                </span>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-amber-50/80 to-transparent" />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/collection?sort=bestseller"
              className="inline-flex items-center gap-2 rounded-full bg-black/80 px-5 py-2 text-white text-sm ring-1 ring-amber-300/40 hover:bg-black hover:ring-amber-300 transition"
            >
              View all best sellers
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M13.293 4.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 1 1-1.414-1.414L17.586 12l-4.293-4.293a1 1 0 0 1 0-1.414z" />
                <path d="M4 11h13v2H4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bestseller;
