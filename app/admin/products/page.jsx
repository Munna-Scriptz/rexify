"use client"
import React from 'react'
import ProductTable from '../components/products/ProductTable'
import ProductsHeader from '../components/products/ProductsHeader'
import { Package, LayoutList, ShoppingBag } from 'lucide-react'
import StatCard from '../components/common/StatCards'

const Products = () => {
  return (
    <>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10'>
        <StatCard
          title="Total Product Items"
          value="3,521"
          unit='(items)'
          icon={<Package size={32} strokeWidth={1.2} />}
          variant="accent"
        />
        <StatCard
          title="In Stock Product"
          value="1,311"
          unit='(items)'
          icon={<LayoutList size={32} strokeWidth={1.2} />}
          variant="accent"
        />
        <StatCard
          title="Out Of Stock Product"
          value="43"
          unit='(items)'
          icon={<ShoppingBag size={32} strokeWidth={1.2} />}
          variant="rose"
        />
      </section>

      {/* ============== Header and Product stats ================ */}
      <ProductsHeader />

      {/* ============== Product Table ================ */}
      <ProductTable />
    </>
  )
}

export default Products