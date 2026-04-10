import React from 'react'
import Banner from '../components/home/Banner'
import Services from '../components/home/Services'
import SmallCategory from '../components/home/SmallCategory'
import LatestProducts from '../components/home/LatestProducts'
import BestSeller from '../components/home/BestSeller'
import MarqueeText from '../components/home/MarqueeText'
import Essentials from '../components/home/Essentials'
import NewsLetter from '../components/home/NewsLetter'

const Home = () => {
  return (
    <>
      <Banner />
      <Services />
      <SmallCategory />
      <LatestProducts />
      <BestSeller />
      <MarqueeText />
      <Essentials />
      <NewsLetter />
    </>
  )
}

export default Home