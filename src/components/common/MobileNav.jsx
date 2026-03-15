import React from 'react'
import { NavLink } from 'react-router'
import { Home, LayoutGrid, ShoppingBag, Heart, User } from 'lucide-react'

const MobileNav = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)] px-6 py-4">
            <div className="flex items-center justify-between">
                <NavLink to={'/'} className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-accent' : 'text-gray-400 hover:text-gray-900'} transition-colors duration-300`}>
                    <Home size={24} strokeWidth={2} />
                </NavLink>
                <NavLink to={'/shop'} className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-accent' : 'text-gray-400 hover:text-gray-900'} transition-colors duration-300`}>
                    <ShoppingBag size={24} strokeWidth={2} />
                </NavLink>
                <NavLink to={'/category'} className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-accent' : 'text-gray-400 hover:text-gray-900'} transition-colors duration-300`}>
                    <LayoutGrid size={24} strokeWidth={2} />
                </NavLink>
                <NavLink to={'/wishlist'} className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-accent' : 'text-gray-400 hover:text-gray-900'} transition-colors duration-300`}>
                    <Heart size={24} strokeWidth={2} />
                </NavLink>
                <NavLink to={'/profile'} className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-accent' : 'text-gray-400 hover:text-gray-900'} transition-colors duration-300`}>
                    <User size={24} strokeWidth={2} />
                </NavLink>
            </div>
        </div>
    )
}

export default MobileNav
