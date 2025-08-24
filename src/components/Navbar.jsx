// Navbar.jsx
import React, { useState, useEffect, useRef, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef(null)
  const { search, setSearch } = useContext(ShopContext)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isSearching) inputRef.current?.focus()
  }, [isSearching])

  useEffect(() => {
    if (!isSearching) return
    const onDocClick = (e) => {
      if (!e.target.closest?.('#navbar-search')) setIsSearching(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [isSearching])

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [visible])

  return (
    <>
      <div className={`flex items-center justify-between fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 sm:px-10 ${scrolled ? 'bg-[#ffdab9] shadow-md py-3' : 'bg-transparent py-5'}`}>
        <Link to='/'><img src={assets.logo} className='shrink-0 w-28 h-12 sm:w-40 sm:h-16 ml-0 sm:ml-28' alt="Logo"/></Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700 mr-8'>
          <NavLink to='/' className='flex flex-col items-center gap-1'><p>HOME</p></NavLink>
          <NavLink to='/collection' className='flex flex-col items-center gap-1'><p>COLLECTION</p></NavLink>
          <NavLink to='/about' className='flex flex-col items-center gap-1'><p>ABOUT</p></NavLink>
          <NavLink to='/contact' className='flex flex-col items-center gap-1'><p>CONTACT</p></NavLink>
        </ul>

        <div className='flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mr-1 sm:mr-3 md:mr-4 lg:mr-8'>
          <div
            id="navbar-search"
            className={`flex items-center overflow-hidden border border-gray-300 rounded-full h-8 bg-white/90 transition-[width,opacity] duration-300 ease-out ${isSearching ? 'w-56 sm:w-72 px-2' : 'w-8 px-0'}`}
          >
            <button
              className="shrink-0 w-8 h-8 flex items-center justify-center"
              onClick={() => setIsSearching(true)}
              aria-label="Open search"
            >
              <img src={assets.search} className="w-4" alt="Search" />
            </button>
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') setIsSearching(false) }}
              className={`bg-transparent outline-none text-sm ml-1 transition-[width,opacity] duration-300 ${isSearching ? 'w-40 sm:w-56 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
              placeholder="Search products"
            />
            <button
              className={`ml-1 rounded-full p-1 hover:bg-gray-200 transition ${isSearching ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { setSearch(''); setIsSearching(false); }}
              aria-label="Close search"
              title="Close"
            >
              ×
            </button>
          </div>

          <div className='group relative'>
            <img src={assets.profile} className='w-7 cursor-pointer' alt="Profile"/>
            <div className='group-hover:block hidden absolute right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-2 px-2 bg-black text-white rounded'>
                <p className='cursor-pointer hover:bg-white hover:text-black'>My Profile</p>
                <p className='cursor-pointer hover:bg-white hover:text-black'>Orders</p>
                <p className='cursor-pointer hover:bg-white hover:text-black'>Logout</p>
              </div>
            </div>
          </div>

          <Link to='/cart' className='relative'>
            <img src={assets.cart} className='flex items-center w-8' alt="Cart"/>
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
          </Link>

          <img onClick={() => setVisible(true)} src={assets.menu} className='w-5 cursor-pointer sm:hidden' alt="Menu"/>
        </div>
      </div>

      {visible && (
        <div
          className="fixed inset-0 z-[55] bg-black/40 sm:hidden"
          onClick={() => setVisible(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-[60] w-[86%] max-w-sm sm:hidden bg-white shadow-2xl transform transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <Link to="/" onClick={() => setVisible(false)} className="shrink-0">
            <img src={assets.logo} className="h-9 w-auto" alt="Logo" />
          </Link>
          <button
            onClick={() => setVisible(false)}
            aria-label="Close menu"
            className="p-2 rounded hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <nav className="px-2 py-3">
          <h2 id="mobile-menu-title" className="sr-only">Main menu</h2>
          <ul className="space-y-1 text-gray-900">
            <li>
              <NavLink
                to="/"
                onClick={() => setVisible(false)}
                className="block rounded px-3 py-3 hover:bg-gray-50"
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collection"
                onClick={() => setVisible(false)}
                className="block rounded px-3 py-3 hover:bg-gray-50"
              >
                COLLECTION
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setVisible(false)}
                className="block rounded px-3 py-3 hover:bg-gray-50"
              >
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => setVisible(false)}
                className="block rounded px-3 py-3 hover:bg-gray-50"
              >
                CONTACT
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mt-auto px-4 py-4 border-t text-sm text-gray-500">
          © {new Date().getFullYear()} La Motif
        </div>
      </div>
    </>
  )
}

export default Navbar
