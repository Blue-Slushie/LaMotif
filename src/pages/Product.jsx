import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedItems from '../components/RelatedItems';
import EmailInquiryButtonWeb3Forms from '../components/EmailInquiryButtonWeb3Forms';
import AddToCartButton from '../components/AddToCartButton';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, formatPrice, addToCart } = useContext(ShopContext);  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [qty, setQty] = useState(1);


  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
  <>
    <div className="bg-white rounded-lg shadow p-5 sm:p-6 lg:p-8 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row sm:items-stretch gap-6 sm:gap-8">

        {/* Gallery */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sm:bg-gray-100 sm:rounded-lg sm:p-4">
          <div className="w-full sm:w-[18.7%]">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-start gap-3 p-3 bg-white rounded-lg shadow-inner">
              {productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  alt={`${productData.name} ${index + 1}`}
                  className="w-[24%] sm:w-full aspect-square object-cover flex-shrink-0 cursor-pointer rounded-md hover:opacity-90 transition"
                />
              ))}
            </div>
          </div>

          <div className="w-full sm:w-[80%] p-1 sm:p-2">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Divider */}
        <div className="block sm:hidden h-px w-full bg-gray-200 my-2" aria-hidden="true" />
        <div className="hidden sm:block w-px bg-gray-200 self-stretch" aria-hidden="true" />

        {/* Details */}
        <div className="flex-1">
          <div className="p-3 sm:p-4 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-medium leading-tight">{productData.name}</h1>
            <p className="text-sm text-gray-500">SKU: {productData._id}</p>

            {productData.subCategory && productData.subCategory !== 'NULL' && (
              <p className="text-sm text-gray-700">
                From our <span className="font-medium">{productData.subCategory}</span> Collection.
              </p>
            )}

            <p className="text-gray-700 md:w-4/5">{productData.description}</p>

            {/* Price label */}
            <div className="pt-2">
              <p className="uppercase tracking-wide text-xs text-gray-500">Price</p>
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-black text-white px-3 py-1 text-sm">
                  {formatPrice(productData.price)}
                </span>
              </div>

              <ul className="mt-4 space-y-1 text-sm text-gray-700">
                <li>Secure payments</li>
                <li>Shipping calculated at checkout</li>
              </ul>

              <EmailInquiryButtonWeb3Forms product={productData} />

              {/* Qty + Add to bag */}
              <div className="mt-4 flex items-center gap-3">
                <label className="text-sm text-gray-600">Qty</label>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="w-20 rounded-md border px-2 py-1"
                />
                <button
                  onClick={() => addToCart(productData._id, qty)}
                  className="rounded-full bg-stone-900 text-white px-5 py-2 text-sm hover:opacity-90 transition"
                >
                  Add to bag
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Related below the product card */}
    <RelatedItems category={productData.category} />
  </>
) : (
  <div className="opacity-0"></div>
);

};

export default Product;
