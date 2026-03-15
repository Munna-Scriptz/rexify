import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Home, LayoutGrid, ShoppingBag, Search as SearchIcon, User } from 'lucide-react'
import SearchField from './SearchField'

const MobileNav = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0)
    const [searchOpen, setSearchOpen] = useState(false)

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/shop', icon: ShoppingBag, label: 'Shop' },
        { isAction: true, action: () => setSearchOpen(true), icon: SearchIcon, label: 'Search' },
        { path: '/category', icon: LayoutGrid, label: 'Category' },
        { path: '/profile', icon: User, label: 'Profile' }
    ]

    useEffect(() => {
        const currentPath = location.pathname
        if (currentPath === '/') setActiveIndex(0)
        else if (currentPath.includes('/shop')) setActiveIndex(1)
        else if (currentPath.includes('/category')) setActiveIndex(3)
        else if (currentPath.includes('/profile')) setActiveIndex(4)
    }, [location.pathname])

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
                <style>{`
                    .mobile-nav-indicator {
                        position: absolute;
                        top: -24px;
                        width: 56px;
                        height: 56px;
                        background-color: var(--color-accent);
                        border-radius: 50%;
                        border: 6px solid #ffffff;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        left: calc(20% * var(--active-index) + 10% - 28px);
                        z-index: 10;
                    }
                    .mobile-nav-indicator::before {
                        content: '';
                        position: absolute;
                        top: 24px;
                        left: -22px;
                        width: 20px;
                        height: 20px;
                        background-color: transparent;
                        border-top-right-radius: 20px;
                        box-shadow: 1px -10px 0 0 #ffffff;
                    }
                    .mobile-nav-indicator::after {
                        content: '';
                        position: absolute;
                        top: 24px;
                        right: -22px;
                        width: 20px;
                        height: 20px;
                        background-color: transparent;
                        border-top-left-radius: 20px;
                        box-shadow: -1px -10px 0 0 #ffffff;
                    }
                `}</style>
                <div className="bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] h-[70px] relative flex items-center">
                    <div className="mobile-nav-indicator shadow-lg shadow-accent/40" style={{ '--active-index': activeIndex }}></div>
                    {navItems.map((item, index) => {
                        const isActive = activeIndex === index
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    if (item.isAction) {
                                        item.action()
                                    } else {
                                        navigate(item.path)
                                    }
                                }}
                                className="flex-1 flex flex-col items-center justify-center relative z-20 h-full bg-transparent border-none outline-none cursor-pointer group"
                            >
                                <div className={`transition-all duration-300 flex items-center justify-center ${isActive ? '-translate-y-[28px] text-white' : 'text-gray-400 group-hover:text-gray-900 translate-y-0'}`}>
                                    <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                <span className={`text-[10px] absolute font-medium bottom-[12px] transition-all duration-300 ${isActive ? 'opacity-100 text-accent translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    {item.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Search Modal */}
            {searchOpen && (
                <div className="lg:hidden relative z-[100] bg-white">
                    <SearchField close={setSearchOpen} />
                </div>
            )}
        </>
    )
}

export default MobileNav
