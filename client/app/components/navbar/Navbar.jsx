"use client"
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHeart } from 'react-icons/fi'
import { PiUser } from 'react-icons/pi'
import SearchField from './SearchField'
import ProductMenu from './ProductMenu'
import { Search, ShoppingCart, X, Home, ShoppingBag, LayoutGrid, Info, PhoneCall, Zap, Heart, User } from 'lucide-react'
import { HiMiniBars3BottomLeft } from 'react-icons/hi2'
import UserButton from './UserButton'

const Navbar = () => {
    const navbarRef = useRef(null);
    const lastScrollYRef = useRef(0);
    const [isNavbarWhite, setIsNavbarWhite] = useState(false);
    const [search, setSearch] = useState(false);
    const [productMenuOpen, setProductMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = usePathname();
    const isHomePage = location === "/" || location === "/home";

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const navbar = navbarRef.current;
        if (!navbar) return;

        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;

            // Show navbar when scrolling up
            if (currentScrollY < lastScrollYRef.current) {
                navbar.style.top = "0";
            }
            // Hide navbar when scrolling down
            else if (currentScrollY > 100) {
                navbar.style.top = "-100px";
            }
            if (search || !isHomePage || productMenuOpen) {
                setIsNavbarWhite(true);
            } else {
                setIsNavbarWhite(currentScrollY > 0);
            }
            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHomePage, search, productMenuOpen]);

    // Lock body scroll when product menu is open
    useEffect(() => {
        if (typeof window === 'undefined') return;

        document.body.style.overflow = productMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [productMenuOpen]);


    return (
        <>
            <nav ref={navbarRef} className={`py-3 sticky top-0 duration-300 z-50 group hover:bg-surface ${isNavbarWhite && 'shadow bg-white'}`}>
                <div className="container">
                    <div id='Navbar-Row' className='flex items-center justify-between text-white relative'>
                        {/* ------------ Mobile Menu Toggle (Left on Mobile) */}
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`cursor-pointer`}
                                title="Menu"
                            >
                                <HiMiniBars3BottomLeft className={`w-7 h-7 group-hover:text-text-primary ${isNavbarWhite && 'text-text-primary'}`} />
                            </button>
                        </div>

                        {/* ------------ Image  */}
                        <Link href={'/'} className='w-24 md:w-32'><img src="/assets/Logo.png" className={`group-hover:invert ${isNavbarWhite && 'invert'}`} alt="Rexify Logo" /></Link>

                        {/* ------------ NavLinks (Desktop)  */}
                        <div className={`hidden md:flex items-center gap-4 lg:gap-6 group-hover:text-text-primary ${isNavbarWhite && 'text-text-primary'}`}>
                            <Link className={`navLinkHover duration-300`} href={'/'}>Home</Link>
                            <Link className={`navLinkHover duration-300`} href={'/shop'}>Shop</Link>

                            {/* Products Mega Menu */}
                            <div
                                className="h-full flex items-center justify-center relative py-4"
                                onMouseEnter={() => setProductMenuOpen(true)}
                            >
                                <Link className={`navLinkHover duration-300`} href={'/category'}>Products</Link>
                            </div>

                            <Link className={`navLinkHover duration-300`} href={'/category'}>Categories</Link>
                            <Link className={`navLinkHover duration-300`} href={'/about'}>About</Link>
                            <Link className={`navLinkHover duration-300`} href={'/contact'}>Contact</Link>
                        </div>

                        {/* ------------ NavButtons  */}
                        <div className={`md:border-l group-hover:border-text-primary/40 ${isNavbarWhite && 'border-text-primary/40'} border-gray-300 md:pl-3 flex items-center gap-1 md:gap-2 `}>
                            {/* ------- Search  */}
                            <div onClick={() => { setSearch(!search); setProductMenuOpen(false); }} className='hidden md:flex items-center rounded-2xl relative cursor-pointer'>
                                <label htmlFor='search' className={`w-8 h-8 pointer-events-none bg-transparent cursor-pointer group-hover:bg-text-muted/20 flex duration-300 items-center justify-center rounded-full absolute left-0`}>
                                    <svg className={`w-5 md:w-6 group-hover:text-text-primary ${isNavbarWhite && 'text-text-primary'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M9.864 3.081A1.56 1.56 0 0 0 9 4.471c0 .275.079.553.215.799a6 6 0 1 0 7.66 6.948a.5.5 0 0 1 .105.183c.235.743.49 1.61 1.418 1.647a8 8 0 0 1-1.126 1.919l4.426 4.317a1 1 0 0 1-1.396 1.432l-4.46-4.348A8 8 0 1 1 9.864 3.081M18.484 8a.3.3 0 0 1 .285.201l.25.766a1.58 1.58 0 0 0 .999.998l.765.248l.015.004a.304.304 0 0 1 .146.46a.3.3 0 0 1-.146.11l-.765.248a1.58 1.58 0 0 0-.999.998l-.249.766a.303.303 0 0 1-.57 0l-.25-.766a1.58 1.58 0 0 0-.998-1.002l-.765-.248a.304.304 0 0 1 .146-.46a.3.3 0 0 1 .146-.11l.765-.248a1.58 1.58 0 0 0 .984-.998L18.2 8.2a.3.3 0 0 1 .284-.2m-4.011-8a.545.545 0 0 1 .512.363l.449 1.376a2.84 2.84 0 0 0 1.797 1.797l1.378.447l.028.007a.55.55 0 0 1 .363.514a.54.54 0 0 1-.363.513l-1.378.447A2.84 2.84 0 0 0 15.46 7.26l-.447 1.376L15 8.67a.545.545 0 0 1-1.014-.034L13.54 7.26a2.84 2.84 0 0 0-1.798-1.804l-1.378-.447A.55.55 0 0 1 10 4.496a.54.54 0 0 1 .363-.513l1.378-.447A2.84 2.84 0 0 0 13.5 1.773l.012-.034l.447-1.376A.55.55 0 0 1 14.473 0"></path>
                                    </svg>
                                </label>
                                <input className={`hidden md:block w-30 read pl-10 h-8 outline-none rounded-full hover:bg-text-muted/20 group-hover:placeholder:text-text-primary ${isNavbarWhite && 'placeholder:text-text-primary'} appearance-none duration-300 [&::-webkit-search-cancel-button]:appearance-none cursor-pointer`} readOnly type="search" id='search' name='search' aria-label='search' placeholder='Search' />
                            </div>

                            {/* --------- icons  */}
                            <button onClick={() => { setSearch(!search); setProductMenuOpen(false); }} className={`md:hidden flex items-center justify-center w-8 h-8 hover:bg-text-muted/20 duration-300 group-hover:text-text-primary ${isNavbarWhite && 'text-text-primary'} text-xl rounded-full cursor-pointer relative`}>
                                <Search strokeWidth={1} />
                            </button>

                            <Link href={"/cart"} className={`w-8 h-8 flex items-center justify-center hover:bg-text-muted/30 group-hover:text-text-primary duration-300 ${isNavbarWhite && 'text-text-primary'} rounded-full relative`}>
                                <div className='w-4 h-4 bg-accent rounded-full text-xs text-white flex items-center justify-center absolute -top-1 -right-1'>
                                    <span>3</span>
                                </div>
                                <ShoppingCart strokeWidth={1} />
                            </Link>

                            {/* --------- Favorites  */}
                            <Link href={"/wishlist"} className={`w-8 h-8 hidden md:flex items-center justify-center hover:bg-text-muted/20 duration-300 group-hover:text-text-primary ${isNavbarWhite && 'text-text-primary'} text-xl rounded-full cursor-pointer relative`}>
                                <FiHeart strokeWidth={1.5} />
                            </Link>

                            {/* --------- User  */}
                            <UserButton isNavbarWhite={isNavbarWhite}/>
                        </div>

                    </div>
                </div>

                {/* Mobile Menu (Drawer) */}
                <div className={`md:hidden fixed inset-0 z-60 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>

                    {/* Drawer */}
                    <div className={`absolute top-0 left-0 bottom-0 w-70 bg-white shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="flex flex-col h-full">
                            <div className="px-6 py-4 border-b border-accent-soft flex items-center justify-between">
                                <img src="/assets/Logo.png" className="w-24 invert" alt="rexify" />
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition cursor-pointer"
                                    title="Close"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-3 font-space">Main Menu</h3>

                                <Link onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-300 text-gray-600 hover:bg-surface hover:text-accent`} href={'/'}>
                                    <Home size={20} strokeWidth={2} /> <span>Home</span>
                                </Link>

                                <Link onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-300 text-gray-600 hover:bg-surface hover:text-accent`} href={'/shop'}>
                                    <ShoppingBag size={20} strokeWidth={2} /> <span>Shop</span>
                                </Link>

                                <Link onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-300 text-gray-600 hover:bg-surface hover:text-accent`} href={'/category'}>
                                    <Zap size={20} strokeWidth={2} /> <span>Products</span>
                                </Link>

                                <Link onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-300 text-gray-600 hover:bg-surface hover:text-accent`} href={'/category'}>
                                    <LayoutGrid size={20} strokeWidth={2} /> <span>Categories</span>
                                </Link>

                                <div className="pt-4 mt-4 border-t border-gray-100 italic">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-3 font-space">Organization</h3>

                                    <Link onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-300 text-gray-600 hover:bg-surface hover:text-accent`} href={'/about'}>
                                        <Info size={20} strokeWidth={2} /> <span>About</span>
                                    </Link>

                                    <Link onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-300 text-gray-600 hover:bg-surface hover:text-accent`} href={'/contact'}>
                                        <PhoneCall size={20} strokeWidth={2} /> <span>Contact Support</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-4 border-t border-accent-soft bg-gray-50/50 backdrop-blur-md">
                                <div className="grid grid-cols-2 gap-3">
                                    <Link onClick={() => setIsMenuOpen(false)} href="/auth" className="flex items-center justify-center px-2 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-900 shadow-sm hover:border-accent/30 hover:text-accent transition-all duration-300">
                                        <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center">
                                            <User size={18} className="text-accent" />
                                        </div>
                                        Account
                                    </Link>
                                    <Link onClick={() => setIsMenuOpen(false)} href="/wishlist" className="flex items-center justify-center px-2 bg-white border border-gray-100 rounded-lg text-[13px] font-bold text-gray-900 shadow-sm hover:border-accent/30 hover:text-accent transition-all duration-300">
                                        <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center">
                                            <Heart size={18} className="text-accent" />
                                        </div>
                                        Wishlist
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* -------------- Search Field ------------ */}
            {search && <SearchField close={setSearch} />}

            {/* -------------- Products Mega Menu ------------ */}
            <ProductMenu setProductMenuOpen={setProductMenuOpen} productMenuOpen={productMenuOpen} />

        </>
    )
}

export default Navbar