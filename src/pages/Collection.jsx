import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(true);
  const [showJewelryOptions, setShowJewelryOptions] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [topOnly, setTopOnly] = useState(false);

  const toggleCategory = (e) => {
    const val = e.target.value;
    setCategory((prev) => (prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]));
  };

  const clearAll = () => {
    setCategory([]);
    setTopOnly(false);
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (topOnly) {
      productsCopy = productsCopy.filter((item) => item.bestseller === true);
    }

    if (search && search.trim()) {
      const q = search.toLowerCase();
      productsCopy = productsCopy.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter(); // relevant = reset to filtered order
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  // ✅ one effect for filters & search (remove the duplicate one you had)
  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, topOnly, search]);

  useEffect(() => {
    sortProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  const resultsCount = filterProducts.length;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-10">

      {/* Sidebar */}
      <aside
        className="min-w-60 sm:w-60 bg-[#ffebcd] rounded-xl border border-[#f2d3b4] shadow-sm
                   sm:sticky sm:top-24 sm:self-start"
      >
        <button
          className="w-full text-left text-lg font-semibold flex items-center justify-between px-4 py-3"
          onClick={() => setShowFilter((v) => !v)}
        >
          <span>Filters</span>
          <span className="text-sm">{showFilter ? '−' : '+'}</span>
        </button>

        <div className={`${showFilter ? 'block' : 'hidden'} sm:block`}>
          <div className="m-3 rounded-lg bg-[#faf0e6] border border-[#f2e3d5] shadow px-4 py-3">
            <button
              className="w-full mb-1 text-sm font-medium flex items-center justify-between"
              onClick={() => setShowJewelryOptions((v) => !v)}
            >
              <span>Jewelry</span>
              <span>{showJewelryOptions ? '−' : '+'}</span>
            </button>

            {showJewelryOptions && (
              <div className="flex flex-col gap-2 text-sm font-light pl-1 mt-2">
                {['Necklaces', 'Earrings', 'Bracelets'].map((c) => (
                  <label key={c} className="flex items-center gap-2 hover:opacity-90">
                    <input
                      type="checkbox"
                      className="w-3 h-3 accent-black"
                      value={c}
                      checked={category.includes(c)}
                      onChange={toggleCategory}
                    />
                    {c}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="m-3 rounded-lg bg-[#faf0e6] border border-[#f2e3d5] shadow px-4 py-3">
            <p className="text-sm font-medium mb-2">Collections</p>
            <div className="flex flex-col gap-2 text-sm font-light">
              <label className="flex items-center gap-2 opacity-60 cursor-not-allowed">
                <input type="checkbox" className="w-3 h-3" disabled /> Latest Collection
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-3 h-3 accent-black"
                  checked={topOnly}
                  onChange={() => setTopOnly((v) => !v)}
                />
                Top Items (Best Sellers)
              </label>
            </div>

            {(category.length > 0 || topOnly) && (
              <button
                onClick={clearAll}
                className="mt-3 text-xs font-medium underline underline-offset-4 hover:opacity-80"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Header row with count + sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-end gap-3">
              <Title text1={'ALL'} text2={'COLLECTIONS'} />
              <span className="text-sm text-gray-600 pb-1">{resultsCount} items</span>
            </div>

            {/* Active chips */}
            {(category.length > 0 || topOnly || (search && search.trim())) && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {category.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory((prev) => prev.filter((x) => x !== c))}
                    className="text-xs bg-[#faf0e6] border border-[#f2e3d5] rounded-full px-3 py-1 hover:ring-2 hover:ring-black/10"
                    title="Remove filter"
                  >
                    {c} ×
                  </button>
                ))}
                {topOnly && (
                  <button
                    onClick={() => setTopOnly(false)}
                    className="text-xs bg-black text-white rounded-full px-3 py-1 hover:opacity-90"
                  >
                    Top Items ×
                  </button>
                )}
                {search && search.trim() && (
                  <span className="text-xs bg-white border rounded-full px-3 py-1">
                    Search: “{search}”
                  </span>
                )}
              </div>
            )}
          </div>

          <label className="inline-flex items-center gap-2 text-sm">
            <span className="text-gray-600">Sort</span>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="bg-white border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              <option value="relevant">Relevant</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </label>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filterProducts.map((item, index) => (
            <div
              key={item._id ?? index}
              className="relative group rounded-xl border border-gray-100 bg-white/80 backdrop-blur-sm
                         transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Bestseller badge */}
              {item.bestseller && (
                <span className="absolute left-2 top-2 z-10 text-[10px] uppercase tracking-wide
                                  bg-black text-white px-2 py-1 rounded-full">
                  Top
                </span>
              )}

              <ProductItem
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {resultsCount === 0 && (
          <div className="mt-12 text-center text-gray-600">
            No items match your filters.
            <button onClick={clearAll} className="ml-2 underline underline-offset-4">
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Collection;
