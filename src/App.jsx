import React from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router'
import LayoutOne from './layout/LayoutOne'
import Home from './pages/Home'
import LayoutTwo from './layout/LayoutTwo'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Category from './pages/Category'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Wishlist from './pages/Wishlist'
import Shop from './pages/Shop'
import Profile from './pages/Profile'
import Confirm from './pages/Confirm'

const App = () => {
  const MyRouter = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<LayoutOne />}>
        <Route index element={<Home />} />
        <Route path='category' element={<Category />} />
        <Route path='product' element={<Product />} />
        <Route path='shop' element={<Shop />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='cart' element={<Cart />} />
        <Route path='wishlist' element={<Wishlist />} />
        <Route path='profile' element={<Profile />} />
      </Route>

      {/* --------------- Auth Router ---------------- */}
      <Route path='/auth' element={<LayoutTwo />}>
        <Route index element={<Navigate to="signUp" replace />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path='confirm' element={<Confirm />} />
      </Route>
    </Route>
  ))

  return (
    <>
      <RouterProvider router={MyRouter} />
    </>
  )
}

export default App