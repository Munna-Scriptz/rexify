import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import MobileNav from '../components/common/MobileNav'

const LayoutOne = () => {
  return (
    <div className="pb-16 lg:pb-0">
      <Navbar />
      <Outlet />
      <Footer />
      <MobileNav />
    </div>
  )
}

export default LayoutOne