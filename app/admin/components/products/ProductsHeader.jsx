import Link from 'next/link'
import React from 'react'
import { FiPlus } from 'react-icons/fi'

const ProductsHeader = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-text-primary font-space tracking-tight">Products</h1>
                    <p className="text-text-secondary">Browse and manage your product catalog.</p>
                </div>
                <Link href={"/products/create"} className="bg-success cursor-pointer text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-success/90 transition-all shadow-lg shadow-success/20 active:scale-95">
                    <FiPlus className="text-xl" />
                    Add Product
                </Link>
            </div>
        </>
    )
}

export default ProductsHeader