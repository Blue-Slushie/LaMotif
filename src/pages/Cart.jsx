// pages/Cart.jsx
import React, { useContext, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartInquiryButtonWeb3Forms from '../components/CartInquiryButtonWeb3Forms';

const Cart = () => {
  const {
    cartItems,
    updateQty,
    removeFromCart,
    clearCart,
    getCartCount,
    formatPrice
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const count = getCartCount();

  const inquiryText = useMemo(() => {
    if (!cartItems.length) return '';
    const lines = cartItems.map(({ product, qty }, i) => {
      const parts = [
        `${i + 1}. ${product.name}`,
        product.category ? `Category: ${product.category}` : '',
        product.subCategory && product.subCategory !== 'NULL' ? `Sub: ${product.subCategory}` : '',
        `SKU: ${product._id}`,
        `Qty: ${qty}`,
      ].filter(Boolean);
      return parts.join(' | ');
    });
    return [
      'Price Inquiry — Cart Items',
      '--------------------------------',
      ...lines,
      '--------------------------------',
      'Please reply with a quote and availability. Thank you!'
    ].join('\n');
  }, [cartItems]);

  const copyInquiry = async () => {
    try {
      await navigator.clipboard.writeText(inquiryText);
      alert('Inquiry summary copied to clipboard. Paste it into your inquiry form/email.');
    } catch {
      // fallback
      const tmp = document.createElement('textarea');
      tmp.value = inquiryText;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      document.body.removeChild(tmp);
      alert('Inquiry summary copied. Paste it into your inquiry form/email.');
    }
  };

  return (
    <div className="my-10">
      <div className="flex items-end gap-3 mb-5">
        <Title text1="YOUR" text2="BAG" />
        <span className="text-sm text-gray-600">{count} item{count === 1 ? '' : 's'}</span>
      </div>

      {/* Empty state */}
      {cartItems.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border">
          <p className="text-gray-600">Your bag is empty.</p>
          <Link
            to="/collection"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2 text-sm hover:opacity-90"
          >
            Continue shopping
          </Link>
        </div>
      )}

      {/* Items */}
      {cartItems.length > 0 && (
        <>
          <div className="bg-white rounded-xl border divide-y">
            {cartItems.map(({ product, qty }) => (
              <div key={product._id} className="flex items-center gap-4 p-4">
                <Link to={`/product/${product._id}`} className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={Array.isArray(product.image) ? product.image[0] : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product._id}`} className="font-medium line-clamp-1">
                    {product.name}
                  </Link>
                  <div className="text-xs text-gray-600 mt-1">
                    <span>SKU: {product._id}</span>
                    {product.category && <> · <span>{product.category}</span></>}
                    {product.subCategory && product.subCategory !== 'NULL' && <> · <span>{product.subCategory}</span></>}
                  </div>

                  {/* Display-only price label */}
                  <div className="mt-1">
                    <span className="inline-flex items-center rounded-full bg-stone-900 text-white px-3 py-1 text-xs">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600">Qty</label>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => updateQty(product._id, Number(e.target.value))}
                    className="w-20 rounded-md border px-2 py-1"
                  />
                </div>

                <button
                  onClick={() => removeFromCart(product._id)}
                  className="text-sm text-red-600 hover:text-red-700 px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/collection')}
                className="rounded-full border px-5 py-2 text-sm hover:bg-gray-50"
              >
                Continue shopping
              </button>
              <button
                onClick={clearCart}
                className="rounded-full border px-5 py-2 text-sm hover:bg-gray-50"
              >
                Clear bag
              </button>
            </div>

            <div className="flex gap-3">
              {/* This copies a summary you can paste into your existing inquiry flow */}
              <button
                onClick={copyInquiry}
                className="rounded-full bg-black text-white px-5 py-2 text-sm hover:opacity-90"
              >
                Copy inquiry summary
              </button>
              <CartInquiryButtonWeb3Forms items={cartItems} />

              {/* If you later want to wire to your Web3Forms, you can replace the above with your inquiry button */}
              {/* <EmailInquiryFromCart items={cartItems} /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
