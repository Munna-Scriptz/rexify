"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, ShieldCheck, ShoppingBag, LogOut, Rss, MapPin, Menu } from 'lucide-react';
import { apiClient } from '@/app/lib/apiClient';
import { toast } from 'react-toastify';

const ProfileNavbar = ({ user }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const tabs = [
        { id: 'profile', href: '/profile', label: 'Public Profile', icon: User },
        { id: 'orders', href: '/profile/orders', label: 'Order History', icon: ShoppingBag },
        { id: 'reviews', href: '/profile/reviews', label: 'My Reviews', icon: Rss },
        { id: 'addresses', href: '/profile/addresses', label: 'My Addresses', icon: MapPin },
        { id: 'security', href: '/profile/security', label: 'Security', icon: ShieldCheck },
    ];


    // ----------- Handle Logout ------------
    const handleLogout = async () => {
        try {
            await toast.promise(
                apiClient.post("/auth/signout"),
                {
                    pending: "Logging out...",
                    success: "Logged out",
                    error: "Something went wrong"
                }
            );

            router.push("/");
        } catch (error) {}
    };

    return (
        <aside className="w-full md:w-72 flex flex-col h-auto md:h-screen md:sticky md:top-0 overflow-hidden shrink-0 bg-[#0d1117] border-b md:border-b-0 md:border-r border-white/5">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-accent/10 blur-3xl pointer-events-none z-0" />

            {/* User Identity Header */}
            <div className="relative z-10 px-4 md:px-6 pt-4 md:pt-8 pb-4 md:pb-6 border-b border-white/5">
                
                {/* Mobile Header: Menu Toggle + User Info */}
                <div className="md:hidden flex items-center justify-between">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="flex items-center gap-2 text-white hover:text-accent transition-colors cursor-pointer"
                    >
                        <Menu size={24} />
                        <span className="text-sm font-bold tracking-wider">MENU</span>
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <h2 className="text-white text-sm font-semibold truncate tracking-tight">{user?.fullname || "User"}</h2>
                        </div>
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-accent/40 shadow-[0_0_0_2px_#155dfc14]">
                            <img src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"} alt="User avatar" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Desktop Header */}
                <div className="hidden md:flex flex-col items-center text-center">

                    {/* Avatar */}
                    <div className="relative group mb-4 shrink-0">
                        <div className="w-25 h-25 rounded-2xl overflow-hidden border-2 border-accent/40 shadow-[0_0_0_4px_#155dfc14,0_16px_40px_#00000080] group-hover:scale-105 transition-transform duration-500">
                            <img src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"} alt="User avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#22c55e] border-2 border-[#0d1117] shadow-[0_0_8px_#22c55e99]" />
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">

                    {/* Name */}
                    <div className="flex items-center justify-center gap-2">
                        <h2 className="text-white text-lg font-semibold truncate tracking-tight">
                            {user?.fullname || "User"}
                        </h2>
                        {user?.isVerified && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_#22c55ecc] shrink-0" />
                        )}
                    </div>

                    {/* Email */}
                    <p className="text-[#ffffff4d] text-xs truncate mt-0.5 mb-4">
                        {user?.email || ""}
                    </p>

                    {/* Verified badge */}
                    <div className="flex justify-center w-full mt-2">
                        {user?.isVerified ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e14] border border-[#22c55e33] w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_#22c55ecc]" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#22c55ecc]">Verified</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fbbf2414] border border-[#fbbf2433] w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] shadow-[0_0_6px_#fbbf24cc]" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#fbbf24cc]">Unverified</span>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className={`relative z-10 flex-col flex-1 px-4 py-3 md:py-5 space-y-1 overflow-y-auto no-scrollbar ${!isMenuOpen ? 'hidden md:flex' : 'flex'}`}>
                {tabs.map((tab) => {
                    const active = pathname === tab.href;
                    return (
                        <Link
                            key={tab.id}
                            href={tab.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer relative
                                ${active
                                    ? 'bg-[#155dfc1a] border border-[#155dfc33] text-[#7aabff] font-semibold shadow-[0_4px_20px_#155dfc14]'
                                    : 'border border-transparent text-[#ffffff40] font-medium hover:bg-white/4 hover:text-white/75'
                                }`}
                        >
                            {/* Active left bar */}
                            {active && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full bg-accent shadow-[0_0_10px_#155dfcb3]" />
                            )}

                            <tab.icon size={17} className={`shrink-0 ${active ? 'text-accent' : 'text-inherit'}`} />
                            <span className="whitespace-nowrap">{tab.label}</span>

                            {/* Active dot */}
                            {active && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_#155dfccc]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className={`relative z-10 p-4 border-t border-white/5 ${!isMenuOpen ? 'hidden md:block' : 'block'}`}>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#f8717199] border border-transparent hover:bg-[#ef444412] hover:text-[#f87171e6] hover:border-[#ef444426] transition-all duration-200 cursor-pointer">
                    <LogOut size={17} className="shrink-0" />
                    <span>Sign Out</span>
                </button>
            </div>

        </aside>
    )
}

export default ProfileNavbar;