"use client"
import React from 'react'
import ProductTable from '../components/products/ProductTable'
import ProductsHeader from '../components/products/ProductsHeader'
import { Package, LayoutList, ShoppingBag } from 'lucide-react'
import StatCard from '../components/common/StatCards'
import { useGetProductsQuery } from '../services/api'

const Products = () => {
  const { data: products, isLoading } = useGetProductsQuery()

  const inStock = products?.data?.products?.reduce((sum, product) => sum + product.variants.reduce((variantSum, variant) => variantSum + variant.stock, 0), 0)
  const outOfStock = products?.data?.products?.filter(product => product.variants.some(variant => (variant.stock || 0) <= 0)).length || 0

  return (
    <>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10'>
        <StatCard
          title="Total Product Items"
          value={products?.data?.products?.length || 0}
          unit='(items)'
          icon={<Package size={32} strokeWidth={1.2} />}
          variant="accent"
        />
        <StatCard
          title="In Stock Product"
          value={inStock}
          unit='(items)'
          icon={<LayoutList size={32} strokeWidth={1.2} />}
          variant="accent"
        />
        <StatCard
          title="Out Of Stock Product"
          value={outOfStock}
          unit="(items)"
          icon={<ShoppingBag size={32} strokeWidth={1.2} />}
          variant="rose"
        />
      </section>

      {/* ============== Header and Product stats ================ */}
      <ProductsHeader />

      {/* ============== Product Table ================ */}
      <ProductTable products={products?.data?.products} />
    </>
  )
}

export default Products