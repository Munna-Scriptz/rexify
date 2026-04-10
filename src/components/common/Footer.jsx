import React from 'react';
import logo from '../../assets/Logo.png'
import { Link } from 'react-router';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="pt-20 pb-10 border-t border-gray-100 relative overflow-hidden bg-linear-to-b from-white to-gray-50/50">
            {/* --- Decorative Background Elements --- */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

            <div className="container relative z-10">
                {/* Mobile Top Header */}
                <div className="md:hidden flex flex-col items-center gap-8 mb-16">
                    <Link to={'/'} className="hover:scale-105 transition-transform duration-300">
                        <img src={logo} className='invert w-32' alt="Rexify logo" />
                    </Link>

                    <div className="flex gap-8 text-text-primary text-2xl">
                        {[
                            { icon: FaInstagram, to: 'https://www.instagram.com/rexon.notfr' },
                            { icon: FaFacebookF, to: 'https://www.facebook.com/rexon.notfr' },
                            { icon: FaTwitter, to: 'https://www.linkedin.com/in/munna-scriptz' },
                            { icon: FaYoutube, to: 'https://www.linkedin.com/in/munna-scriptz' },
                            { icon: FaLinkedinIn, to: 'https://www.linkedin.com/in/munna-scriptz' }
                        ].map((item, i) => (
                            <Link
                                key={i}
                                to={item.to}
                                className="hover:text-accent transition-all duration-300 transform hover:-translate-y-1.5"
                            >
                                <item.icon />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-6 md:gap-8">
                    {/* Dynamic Column Helper */}
                    {[
                        {
                            title: "Support",
                            links: ["Help Center", "Shipping", "Returns", "Report Fraud", "Contact Us"]
                        },
                        {
                            title: "About",
                            links: ["About Us", "Sustainability", "Our Materials", "Careers"]
                        },
                        {
                            title: "Sales",
                            links: ["Press & Affiliates", "Where We're Sold", "Wholesale", "Discounted Gear"]
                        },
                        {
                            title: "Explore",
                            links: ["Become an Ambassador", "The Rexify Blog", "Wallpapers", "Limited Editions"]
                        }
                    ].map((col, i) => (
                        <div key={i} className="group/col">
                            <div className="relative inline-block mb-6">
                                <h4 className="text-sm md:text-base font-bold uppercase tracking-wider text-text-primary">
                                    {col.title}
                                </h4>
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-500 group-hover/col:w-full" />
                            </div>
                            <ul className="space-y-3">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <Link
                                            to={'/'}
                                            className="text-gray-500 text-sm hover:text-text-primary hover:pl-1 transition-all duration-300 flex items-center gap-2 group/link"
                                        >
                                            <span className="w-0 h-px bg-accent transition-all duration-300 group-hover/link:w-2" />
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter Signup */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <div className="relative inline-block mb-6">
                            <h4 className="text-sm md:text-base font-bold uppercase tracking-wider text-text-primary">
                                Stay Connected
                            </h4>
                            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-accent" />
                        </div>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            Join our community for exclusive drops and tech insights.
                        </p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300"
                            />
                            <button
                                type="submit"
                                className="mt-3 w-full py-3 bg-text-primary text-white rounded-xl text-sm font-semibold hover:bg-accent transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-accent/30 active:scale-95"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Desktop Shared Footer */}
                <div className="hidden md:flex mt-15 pt-8 border-t border-gray-100 justify-between items-center">
                    <Link to={'/'} className="hover:opacity-80 transition-opacity">
                        <img src={logo} className='invert w-36' alt="Rexify logo" />
                    </Link>

                    <div className="text-sm text-gray-400 font-medium">
                        Website developed by <Link to={'https://munna-scriptz.vercel.app/'} target='_blank' className='text-text-primary hover:text-accent transition-colors underline decoration-accent/30 underline-offset-4'>Munna-Scriptz</Link>
                    </div>

                    <div className="flex gap-1 text-text-primary text-xl">
                        {[{ icon: FaInstagram, to: 'https://www.instagram.com/rexon.notfr' },
                        { icon: FaFacebookF, to: 'https://www.facebook.com/rexon.notfr' },
                        { icon: FaTwitter, to: 'https://www.linkedin.com/in/munna-scriptz' },
                        { icon: FaYoutube, to: 'https://www.linkedin.com/in/munna-scriptz' },
                        { icon: FaLinkedinIn, to: 'https://www.linkedin.com/in/munna-scriptz' }].map((item, i) => (
                            <Link
                                key={i}
                                to={item.to}
                                className="p-2 rounded-full hover:bg-accent hover:text-white transition-all duration-500 transform hover:-translate-y-1"
                            >
                                <item.icon />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Credits */}
                <div className="md:hidden mt-16 text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-bold">Creator</div>
                    <Link to={'https://munna-scriptz.vercel.app/'} target='_blank' className='text-sm font-bold text-text-primary underline decoration-accent decoration-2 underline-offset-4'>
                        Munna-Scriptz
                    </Link>
                </div>

                <div className="mt-16 flex flex-col items-center gap-6">
                    <div className="flex justify-center gap-x-6 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-gray-400 flex-wrap">
                        <Link to={'/'} className="hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link to={'/'} className="hover:text-accent transition-colors">Terms of Service</Link>
                        <Link to={'/'} className="hover:text-accent transition-colors">Accessibility</Link>
                        <Link to={'/'} className="hover:text-accent transition-colors">Cookies</Link>
                    </div>

                    <div className="text-[10px] md:text-xs text-gray-400 text-center font-medium">
                        © {new Date().getFullYear()} Rexify Goods, Inc. All rights reserved.
                        <span className="md:inline hidden mx-2 text-gray-200">|</span>
                        <select className="bg-transparent border-none cursor-pointer focus:outline-none hover:text-text-primary">
                            <option value="usd">USD ($)</option>
                            <option value="eur">EUR (€)</option>
                        </select>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;