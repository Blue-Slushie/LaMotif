import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
    /*const formatPrice = (n) =>
    `${currency}${Number(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    })}`;*/
    const formatPrice = () => "Inquire for pricing";


    const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '{}');
    } catch {
      return {};
    }
    });

    useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id, qty = 1) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + Math.max(1, qty) }));
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const updateQty = (id, qty) => {
    const n = Number(qty);
    if (!n || n < 1) {
      // remove if 0/blank/invalid
      removeFromCart(id);
    } else {
      setCart(prev => ({ ...prev, [id]: n }));
    }
  };

  const clearCart = () => setCart({});

  const getCartCount = () =>
    Object.values(cart).reduce((sum, n) => sum + Number(n || 0), 0);

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({
      product: products.find(p => p._id === id),
      qty
    }))
    .filter(x => !!x.product);

  const value = {
    // existing
    products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, formatPrice,
    // new (cart)
    cart, cartItems, addToCart, removeFromCart, updateQty, clearCart, getCartCount
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
