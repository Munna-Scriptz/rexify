"use client"

import { FiBox, FiCalendar, FiChevronRight, FiGrid, FiList } from "react-icons/fi";
import OrderCard from "../components/cards/OrderCard";
import VerifyDelete from "../components/common/VerifyDelete";
import Pagination from "../components/common/Pagination";
import { useState } from "react";
import { useGetOrdersQuery } from "../services/api";

const page = () => {
    const { data: orders } = useGetOrdersQuery()
    console.log(orders)

    const [view, setView] = useState('grid');
    const [isDeleteOpen, SetIsDeleteOpen] = useState(false)

    const handleDelete = () => {
        SetIsDeleteOpen(!isDeleteOpen)
    };

    return (
        <>

            <section className="w-full mb-12">
                <div className='space-y-1 mb-10'>
                    <h2 className="text-3xl font-bold text-text-primary font-space tracking-tight">All Orders</h2>
                    <p className='text-text-secondary'>Manage and track your latest customer orders</p>
                </div>

                {/* Filter Section */}
                <div className="flex items-center gap-5 mb-10 bg-surface/30 p-5 rounded-2xl border border-border/40">
                    <div className="space-y-2 flex-1">
                        <label className="text-text-primary text-[11px] font-bold uppercase tracking-wider block ml-1">Period</label>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Select Date Range"
                                className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all group-hover:border-accent/30"
                            />
                            <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-lg group-hover:text-accent duration-300" />
                        </div>
                    </div>

                    <div className="space-y-2 flex-1">
                        <label className="text-text-primary text-[11px] font-bold uppercase tracking-wider block ml-1">Order ID</label>
                        <input
                            type="text"
                            placeholder="Search ID..."
                            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all hover:border-accent/30"
                        />
                    </div>

                    <div className="space-y-2 flex-1">
                        <label className="text-text-primary text-[11px] font-bold uppercase tracking-wider block ml-1">Status</label>
                        <div className='relative'>
                            <select className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-text-primary cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all hover:border-accent/30">
                                <option>All Status</option>
                                <option>Completed</option>
                                <option>Pending</option>
                                <option>Processing</option>
                            </select>
                            <FiChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-lg pointer-events-none rotate-90" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-text-primary text-[11px] font-bold uppercase tracking-wider block ml-1">View option</label>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setView('grid')}
                                className={`p-2 rounded-lg transition-all cursor-pointer ${view === 'grid' ? 'bg-accent shadow-sm text-white' : 'text-text-muted hover:text-text-primary'}`}
                            >
                                <FiGrid className="text-xl" />
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={`p-2 rounded-lg transition-all cursor-pointer ${view === 'list' ? 'bg-accent shadow-sm text-white' : 'text-text-muted hover:text-text-primary'}`}
                            >
                                <FiList className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orders Container */}
                {orders?.data?.length > 0 ? (
                    <div className={`grid gap-8 ${view === 'grid' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
                        {orders?.data?.map((item) => (
                            <OrderCard
                                key={item.id}
                                item={item}
                                view={view}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-surface/20 rounded-4xl border border-dashed border-border/50">
                        <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-border mb-6">
                            <FiBox className="text-6xl text-accent/30" />
                        </div>
                        <h3 className="text-text-primary text-xl font-bold font-space">No Orders Found</h3>
                        <p className="text-text-muted mt-2 max-w-xs text-center text-sm leading-relaxed">It looks like there are no orders to display at the moment. New customer orders will appear here automatically.</p>
                    </div>
                )}

                {/* ------------- Pagination ------------- */}
                {orders?.data?.length > 0 && (
                    <Pagination />
                )}

                {/* ------------- Delete popup ------------- */}
                <VerifyDelete isOpen={isDeleteOpen} onClose={() => SetIsDeleteOpen(false)} onConfirm={""} itemName="Order-2322" />

            </section>
        </>
    )
}

export default page;