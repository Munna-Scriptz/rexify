import Link from 'next/link';
import React from 'react'
import { FiCalendar, FiTrash2, FiEye, FiEdit } from 'react-icons/fi';
import { GoFilter } from 'react-icons/go';

const ProductCard = ({ view, filteredProducts, handleDelete }) => {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-success border-emerald-100';
            case 'Draft': return 'bg-slate-50 text-text-secondary border-border';
            case 'Archived': return 'bg-rose-50 text-error border-rose-100';
            default: return 'bg-slate-50 text-text-secondary border-border';
        }
    };
    return (
        <>
            {view === 'list' ? (
                <div className="border border-border/80 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-border/40 bg-surface/30 text-gray-500 uppercase font-semibold tracking-widest text-xs">
                                    <th className="p-6 w-12">
                                        <div className="w-6 h-6 border border-[#CFD3D4] rounded-md"></div>
                                    </th>
                                    <th className="py-6">
                                        <div className='flex gap-3'>
                                            Product <GoFilter className="text-lg" />
                                        </div>
                                    </th>
                                    <th className="py-6 px-4">
                                        <div className='flex gap-3'>
                                            Category <GoFilter className="text-lg" />
                                        </div>
                                    </th>
                                    <th className="py-6 px-4">
                                        <div className='flex gap-3'>
                                            Status <GoFilter className="text-lg" />
                                        </div>
                                    </th>
                                    <th className="py-6 px-4">
                                        <div className='flex gap-3'>
                                            Stock <GoFilter className="text-lg" />
                                        </div>
                                    </th>
                                    <th className="py-6 px-4">
                                        <div className='flex gap-3'>
                                            Price <GoFilter className="text-lg" />
                                        </div>
                                    </th>
                                    <th className="py-6 px-4">
                                        <div className='flex gap-3'>
                                            Created <GoFilter className="text-lg" />
                                        </div>
                                    </th>
                                    <th className="py-6 pl-4">
                                        <div className='flex gap-3'>
                                            Actions <GoFilter className="text-lg" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-surface/30 transition-colors group">
                                        <td className="p-6">
                                            <div className="w-6 h-6 border border-[#CFD3D4] rounded-md"></div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-xl duration-300">
                                                    <img src={`${product.image || "https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Flarge%2FiPhone-16-Pro-Maxaaaa-5516.png&w=1920&q=100"}`} alt="Product image" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-coil font-semibold text-sm leading-tight group-hover:text-accent transition-colors">{product.name}</h3>
                                                    <p className="text-text-secondary text-[11px] font-medium leading-relaxed max-w-70 line-clamp-1">{product.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-coil font-semibold text-xs bg-surface px-3 py-1.5 rounded-lg border border-border/40 inline-block">{product.category}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black font-space tracking-tight uppercase border inline-block ${getStatusStyle(product.status)}`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <span className="text-coil font-semibold text-sm font-space">{product.stock}</span>
                                        </td>
                                        <td className="py-4 px-4 font-space font-semibold text-sm text-coil">
                                            {product.price}
                                        </td>
                                        <td className="py-4 px-4 text-text-secondary text-xs whitespace-nowrap">
                                            {product.created}
                                        </td>
                                        <td className="py-4 pr-6">
                                            <div className='flex gap-2'>
                                                <Link href={"/products/view"} className="rounded-xl bg-surface/50 border border-border/60 text-text-muted hover:bg-white hover:text-blue-500 hover:border-blue-400 transition-all active:scale-95 cursor-pointer p-2">
                                                    <FiEye className="text-lg" />
                                                </Link>
                                                <Link href={"/products/edit"} className="rounded-xl bg-surface/50 border border-border/60 text-text-muted hover:bg-white hover:text-green-500 hover:border-green-400 transition-all active:scale-95 cursor-pointer p-2">
                                                    <FiEdit className="text-lg" />
                                                </Link>
                                                <button onClick={() => handleDelete()} className="rounded-xl bg-surface/50 border border-border/60 text-text-muted hover:bg-white hover:text-red-500 hover:border-red-400 transition-all active:scale-95 cursor-pointer p-2">
                                                    <FiTrash2 className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white border border-border/60 rounded-[28px] p-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-accent/20 transition-all duration-500 group flex flex-col h-full">
                            {/* Card Header*/}
                            <div className="flex justify-between items-start mb-6 w-full">
                                <div className="w-16 h-16 rounded-xl duration-300">
                                    <img src={`${product.image || "https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Flarge%2FiPhone-16-Pro-Maxaaaa-5516.png&w=1920&q=100"}`} alt="Product image" />
                                </div>
                                <div className='flex gap-2'>
                                    <button className="rounded-xl bg-surface/50 border border-border/60 text-text-muted hover:bg-white hover:text-blue-500 hover:border-blue-400 transition-all active:scale-95 cursor-pointer p-2">
                                        <FiEye className="text-lg" />
                                    </button>
                                    <button className="rounded-xl bg-surface/50 border border-border/60 text-text-muted hover:bg-white hover:text-green-500 hover:border-green-400 transition-all active:scale-95 cursor-pointer p-2">
                                        <FiEdit className="text-lg" />
                                    </button>
                                    <button className="rounded-xl bg-surface/50 border border-border/60 text-text-muted hover:bg-white hover:text-red-500 hover:border-red-400 transition-all active:scale-95 cursor-pointer p-2">
                                        <FiTrash2 className="text-lg" />
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="grow space-y-3 mb-8">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black font-space tracking-tight uppercase border ${getStatusStyle(product.status)}`}>
                                            {product.status}
                                        </span>
                                        <span className="text-text-muted font-semibold text-[10px] bg-surface/50 px-2.5 py-1 rounded-lg uppercase tracking-widest">{product.category}</span>
                                    </div>
                                    <h3 className="text-text-primary font-semibold text-lg leading-tight group-hover:text-accent transition-colors pt-1">
                                        {product.name}
                                    </h3>
                                </div>
                                <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 italic italic-secondary">
                                    "{product.description}"
                                </p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/40">
                                <div className="space-y-1.5">
                                    <span className="text-text-muted text-[10px] font-semibold uppercase tracking-widest block">Available Stock</span>
                                    <span className="text-text-primary font-semibold text-base">{product.stock} units</span>
                                </div>
                                <div className="space-y-1.5 text-right">
                                    <span className="text-text-muted text-[10px] font-semibold uppercase tracking-widest block">Unit Price</span>
                                    <span className="text-text-primary font-semibold text-xl font-space">{product.price}</span>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-3 py-4 bg-surface/30 rounded-2xl border border-border/40 px-4">
                                <FiCalendar className="text-text-muted" />
                                <div className="space-y-0.5">
                                    <span className="text-text-muted text-[9px] font-black uppercase tracking-widest block leading-none">Registered Date</span>
                                    <span className="text-text-primary font-bold text-xs">{product.created}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ProductCard