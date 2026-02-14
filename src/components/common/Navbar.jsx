import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo.png'
import { Link, NavLink, useLocation } from 'react-router'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { PiUser } from 'react-icons/pi'
import SearchField from './SearchField'
import ProductMenu from './ProductMenu'
import { ShoppingCart } from 'lucide-react'

const Navbar = () => {
    const [isNavbarWhite, setIsNavbarWhite] = useState(false);
    const [search, setSearch] = useState(false);
    const [productMenuOpen, setProductMenuOpen] = useState(false);
    const location = useLocation();

    const isHomePage = location.pathname === "/" || location.pathname === "/home";

    useEffect(() => {
        let lastScrollY = window.pageYOffset;
        const navbar = document.getElementById("navbar");

        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;

            // Show navbar when scrolling up
            if (currentScrollY < lastScrollY) {
                navbar.style.top = "0";
            }
            // Hide navbar when scrolling down
            else if (currentScrollY > 100) {
                navbar.style.top = "-100px";
            }
            if (search || !isHomePage || productMenuOpen) {
                setIsNavbarWhite(true);
            } else {
                if (currentScrollY > 0) {
                    setIsNavbarWhite(true);
                } else {
                    setIsNavbarWhite(false);
                }
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHomePage, search, productMenuOpen]);


    return (
        <>
            <nav id='navbar' className={`py-3 sticky top-0 duration-300 z-50 group hover:bg-surface ${isNavbarWhite && 'shadow bg-white'}`}>
                <div className="container">
                    <div id='Navbar-Row' className='flex items-center justify-between text-white'>
                        {/* ------------ Image  */}
                        <Link to={'/'} className='w-32'><img src={logo} className={`group-hover:invert ${isNavbarWhite && 'invert'}`} alt="Rexify Logo" /></Link>

                        {/* ------------ NavLinks  */}
                        <div className={`flex items-center gap-6 group-hover:text-text-primary ${isNavbarWhite && 'text-text-primary'}`}>
                            <NavLink className={`navLinkHover duration-300`} to={'/'}>Home</NavLink>
                            <NavLink className={`navLinkHover duration-300`} to={'/'}>Featured</NavLink>

                            {/* Products Mega Menu */}
                            <div
                                className="h-full flex items-center justify-center relative py-4"
                                onMouseEnter={() => setProductMenuOpen(true)}
                            >
                                <NavLink className={`navLinkHover duration-300`} to={'/category'}>Products</NavLink>
                            </div>

                            <NavLink className={`navLinkHover duration-300`} to={'/category'}>Categories</NavLink>
                            <NavLink className={`navLinkHover duration-300`} to={'/about'}>About</NavLink>
                            <NavLink className={`navLinkHover duration-300`} to={'/contact'}>Contact</NavLink>
                        </div>

                        {/* ------------ NavButtons  */}
                        <div className={`border-l group-hover:border-text-primary/40 ${isNavbarWhite && 'border-text-primary/40'} border-gray-300 pl-3 flex items-center gap-2 `}>
                            {/* ------- Search  */}
                            <div onClick={() => { setSearch(!search) }} className='flex items-center rounded-2xl relative cursor-pointer'>
                                <label htmlFor='search' className={`w-8 h-8 pointer-events-none bg-transparent cursor-pointer group-hover:bg-text-muted/20 flex duration-300 items-center justify-center rounded-full absolute left-0`}>
                                    <svg className={`w-6 group-hover:text-text-primary ${isNavbarWhite && 'text-text-primary'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M9.864 3.081A1.56 1.56 0 0 0 9 4.471c0 .275.079.553.215.799a6 6 0 1 0 7.66 6.948a.5.5 0 0 1 .105.183c.235.743.49 1.61 1.418 1.647a8 8 0 0 1-1.126 1.919l4.426 4.317a1 1 0 0 1-1.396 1.432l-4.46-4.348A8 8 0 1 1 9.864 3.081M18.484 8a.3.3 0 0 1 .285.201l.25.766a1.58 1.58 0 0 0 .999.998l.765.248l.015.004a.304.304 0 0 1 .146.46a.3.3 0 0 1-.146.11l-.765.248a1.58 1.58 0 0 0-.999.998l-.249.766a.303.303 0 0 1-.57 0l-.25-.766a1.58 1.58 0 0 0-.998-1.002l-.765-.248a.304.304 0 0 1-.146-.46a.3.3 0 0 1 .146-.11l.765-.248a1.58 1.58 0 0 0 .984-.998L18.2 8.2a.3.3 0 0 1 .284-.2m-4.011-8a.545.545 0 0 1 .512.363l.449 1.376a2.84 2.84 0 0 0 1.797 1.797l1.378.447l.028.007a.55.55 0 0 1 .363.514a.54.54 0 0 1-.363.513l-1.378.447A2.84 2.84 0 0 0 15.46 7.26l-.447 1.376L15 8.67a.545.545 0 0 1-1.014-.034L13.54 7.26a2.84 2.84 0 0 0-1.798-1.804l-1.378-.447A.55.55 0 0 1 10 4.496a.54.54 0 0 1 .363-.513l1.378-.447A2.84 2.84 0 0 0 13.5 1.773l.012-.034l.447-1.376A.55.55 0 0 1 14.473 0"></path>
                                    </svg>
                                </label>
                                <input className={`w-30 read pl-10 h-8 outline-none rounded-full hover:bg-text-muted/20 group-hover:placeholder:text-text-primary ${isNavbarWhite && 'placeholder:text-text-primary'} appearance-none duration-300 [&::-webkit-search-cancel-button]:appearance-none cursor-pointer`} readOnly type="search" id='search' name='search' aria-label='search' placeholder='Search' />
                            </div>
                            {/* --------- icons  */}
                            <Link to={"/cart"} className={`w-8 h-8 flex items-center justify-center hover:bg-text-muted/30 group-hover:text-text-primary duration-300 ${isNavbarWhite && 'text-text-primary'} rounded-full relative`}>
                                <div className='w-4 h-4 bg-accent rounded-full text-xs text-white flex items-center justify-center absolute -top-1 -right-1'>
                                    <span>3</span>
                                </div>
                                <ShoppingCart strokeWidth={1} />
                            </Link>

                            {/* --------- Favorites  */}
                            <Link to={"/favourite"} className={`w-8 h-8 flex items-center justify-center hover:bg-text-muted/20 duration-300 group-hover:text-text-primary ${isNavbarWhite && 'text-text-primary'} text-xl rounded-full cursor-pointer relative`}>
                                <FiHeart strokeWidth={1.5} />
                            </Link>

                            {/* --------- User  */}
                            <Link to={'/auth'} className={`w-8 h-8 flex items-center justify-center hover:bg-text-muted/20 duration-300 group-hover:text-text-primary ${isNavbarWhite && 'text-text-primary'} text-xl rounded-full cursor-pointer relative`}>
                                <PiUser />
                            </Link>
                        </div>

                    </div>
                </div>
            </nav>

            {/* -------------- Search Field ------------ */}
            {search && <SearchField close={setSearch} />}

            {/* -------------- Products Field ------------ */}
            <div onMouseLeave={() => setProductMenuOpen(false)} className={`absolute left-0 z-40 w-full transition-all duration-300 ${productMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className='absolute top-0 left-0 bg-black/70 w-full h-screen backdrop-blur' onMouseEnter={() => setProductMenuOpen(false)}></div>
                <ProductMenu />
            </div>

        </>
    )
}

export default Navbar