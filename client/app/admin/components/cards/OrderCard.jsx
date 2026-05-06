import React from 'react';
import { FiMapPin, FiTruck, FiTrash2, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';

const OrderCard = ({ item, view = 'grid', onDelete }) => {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'processing': return 'bg-blue-50 text-blue-600 border-blue-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const isList = view === 'list';

    return (
        <div className={`bg-white border border-border/60 rounded-[28px] p-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-accent/20 transition-all duration-500 group flex flex-col h-full ${isList ? 'md:flex-row md:items-start gap-6' : ''}`}>

            {/* ------------------- Left/Top Section ------------------- */}
            <div className={`${isList ? 'md:w-[20%] hidden' : 'mb-3 pb-5 border-b border-border/40'}`}>
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <div className="text-accent font-black text-xs font-space tracking-widest uppercase">{item.accountId}</div>
                        <div className="text-text-muted text-[11px] font-medium">{item.dateTime}</div>
                    </div>
                    {!isList && (
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                            {item.status}
                        </div>
                    )}
                </div>
            </div>

            {/* ------------------- Left Content ------------------- */}
            <div className={`grow space-y-6 ${isList ? 'md:w-[45%] md:border-x md:border-border/40' : ''}`}>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest block">Customer Info</span>
                        <div className="text-coil font-semibold text-base leading-tight group-hover:text-accent transition-colors">{item.name}</div>
                        <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                            <FiMapPin className="text-accent" />
                            {item.division}
                        </div>
                    </div>
                    {isList && (
                        <div className="space-y-1.5 text-right">
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border inline-block ${getStatusColor(item.status)}`}>
                                {item.status}
                            </div>
                        </div>
                    )}
                    {!isList && (
                        <div className="space-y-1.5 text-right">
                            <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest block">Payment & Type</span>
                            <div className="text-text-primary font-bold text-sm bg-surface/50 inline-block px-3 py-1 rounded-lg border border-border/30">
                                {item.transactionType}
                            </div>
                        </div>
                    )}
                </div>

                {!isList && (
                    <div className="grid grid-cols-2 gap-6 bg-surface/30 p-5 rounded-2xl border border-border/40">
                        <div className="space-y-1.5">
                            <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest block">Total Amount</span>
                            <span className="text-text-primary font-black text-xl font-space">{item.amount}</span>
                        </div>
                        <div className="space-y-1.5 text-right">
                            <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest block">Charge</span>
                            <span className="text-success font-black text-xl font-space">{item.charge}</span>
                        </div>
                    </div>
                )}

                {isList && (
                    <div className="flex gap-3">
                        <div className="bg-accent/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                            <FiTruck className="text-accent text-sm" />
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-text-secondary text-xs leading-relaxed line-clamp-1 italic">
                                "{item.address}"
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* ------------------- Middle Section ------------------- */}
            <div className={`${isList ? 'md:w-[20%]' : 'mb-3 pb-5 hidden border-b border-border/40'}`}>
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <div className="text-accent font-black text-xs font-space tracking-widest uppercase">{item.accountId}</div>
                        <div className="text-text-muted text-[11px] font-medium">{item.dateTime}</div>
                    </div>
                    {!isList && (
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                            {item.status}
                        </div>
                    )}
                </div>
            </div>

            {/* ------------------- Grid View: Address ------------------- */}
            {!isList && (
                <div className="mt-5 pt-4 border-t border-border/40">
                    <div className="flex gap-3">
                        <div className="bg-accent/10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                            <FiTruck className="text-accent text-lg" />
                        </div>
                        <div className="space-y-1">
                            <span className="text-text-primary text-[11px] font-bold uppercase tracking-wider block">Delivery Address</span>
                            <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 italic">
                                "{item.address}"
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------------- Right/Summary & Admin Actions ------------------- */}
            <div className={`${isList ? 'md:w-[35%] flex flex-col justify-between' : 'mt-6 pt-5 border-t border-border/40'}`}>
                {/* Summary for list view */}
                {isList && (
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-0.5">
                            <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest block">Total Amount</span>
                            <div className="text-text-primary font-black text-lg font-space">{item.amount}</div>
                            <div className="text-success font-bold text-[10px]">+{item.charge} Charge</div>
                        </div>
                        <div className="text-right">
                            <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest block">Payment</span>
                            <div className="text-text-primary font-bold text-xs bg-surface px-2 py-1 rounded border border-border/40">{item.transactionType}</div>
                        </div>
                    </div>
                )}

                {/* Admin Actions Bar */}
                <div className="flex items-center justify-between gap-3 bg-surface/50 p-2 rounded-2xl border border-border/30">
                    <div className="flex items-center gap-2">
                        <span className="text-text-muted text-[10px] font-black uppercase tracking-widest mr-1 hidden sm:block">Update Status</span>
                        <div className="flex items-center gap-1">
                            <button title="Mark as Processing" className="w-10 h-10 rounded-lg bg-white border border-border/50 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
                                <FiRefreshCw className="text-sm" />
                            </button>
                            <button title="Mark as Completed" className="w-10 h-10 rounded-lg bg-white border border-border/50 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer">
                                <FiCheck className="text-sm" />
                            </button>
                            <button title="Cancel Order" className="w-10 h-10 rounded-lg bg-white border border-border/50 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer">
                                <FiX className="text-sm" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center border-l border-border/40 pl-3">
                        <button
                            onClick={() => onDelete?.(item.id)}
                            className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm shadow-rose-100"
                        >
                            <FiTrash2 className="text-base" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;