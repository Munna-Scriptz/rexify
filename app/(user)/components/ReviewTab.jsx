"use client"
import { useState } from 'react'
import { Star, MessageSquare, ThumbsUp, ChevronRight, PackageSearch } from 'lucide-react';

const StarRating = ({ rating, size = 14 }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
            <Star
                key={star}
                size={size}
                className={star <= rating ? 'text-warning fill-warning' : 'text-[#e2e8f0] fill-[#e2e8f0]'}
            />
        ))}
    </div>
);

const ratingLabel = (r) => ({ 5: 'Excellent', 4: 'Good', 3: 'Average', 2: 'Poor', 1: 'Terrible' }[r] ?? '');

const ReviewTab = ({ reviews }) => {
    const [helpful, setHelpful] = useState(() =>
        Object.fromEntries(reviews.map((r) => [r.id, { count: r.helpful, voted: false }]))
    );

    const toggleHelpful = (id) => {
        setHelpful((prev) => ({
            ...prev,
            [id]: {
                count: prev[id].voted ? prev[id].count - 1 : prev[id].count + 1,
                voted: !prev[id].voted,
            },
        }));
    };

    const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500">

            {/* ── Summary Banner ── */}
            <div className="relative bg-white rounded-2xl border border-[#e8edf5] shadow-[0_2px_16px_#155dfc08] overflow-hidden">
                <div className="h-1 w-full bg-linear-to-r from-accent via-[#4d8bff] to-accent/30" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#eff6ff] blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] border border-accent/15 flex items-center justify-center shadow-[0_4px_14px_#155dfc14]">
                            <MessageSquare size={24} className="text-accent" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-[#0f172a] mb-0.5">My Reviews</h2>
                            <p className="text-xs text-[#94a3b8] uppercase tracking-widest font-semibold">{reviews.length} reviews written</p>
                        </div>
                    </div>

                    {/* Avg rating */}
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-black text-[#0f172a] leading-none mb-1">{avgRating}</div>
                            <StarRating rating={Math.round(avgRating)} size={13} />
                            <p className="text-[10px] text-[#94a3b8] mt-1 uppercase tracking-widest font-semibold">Avg Rating</p>
                        </div>
                        <div className="w-px h-12 bg-[#f1f5f9]" />
                        {/* Rating breakdown mini bars */}
                        <div className="space-y-1 hidden sm:block">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = reviews.filter((r) => r.rating === star).length;
                                const pct = Math.round((count / reviews.length) * 100);
                                return (
                                    <div key={star} className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-[#94a3b8] w-2">{star}</span>
                                        <Star size={9} className="text-warning fill-warning" />
                                        <div className="w-20 h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-linear-to-r from-accent to-[#4d8bff] rounded-full transition-all duration-700"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-[#cbd5e1] w-4">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Review Cards ── */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white rounded-2xl border border-[#e8edf5] shadow-[0_2px_16px_#155dfc06] overflow-hidden hover:shadow-[0_4px_24px_#155dfc10] hover:border-accent/15 transition-all duration-300 group"
                    >
                        {/* ── Product Header ── */}
                        <div className="px-6 py-4 border-b border-[#f1f5f9] bg-[#f8faff] flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                {/* Thumbnail */}
                                <div className="w-14 h-14 shrink-0 rounded-xl bg-white border border-[#e8edf5] overflow-hidden p-1.5 group-hover:border-accent/25 group-hover:shadow-[0_4px_12px_#155dfc14] transition-all duration-300">
                                    <img
                                        src={review.productImg}
                                        alt={review.product}
                                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-[#eff6ff] border border-accent/15 px-2 py-0.5 rounded-full">
                                        {review.category}
                                    </span>
                                    <h3 className="text-sm font-bold text-[#0f172a] mt-1 truncate">{review.product}</h3>
                                </div>
                            </div>

                            {/* View details button */}
                            <button className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold text-accent border border-accent/20 bg-[#eff6ff] px-3.5 py-1.5 rounded-full hover:bg-accent hover:text-white hover:border-accent hover:shadow-[0_4px_10px_#155dfc33] transition-all duration-200 cursor-pointer uppercase tracking-wide">
                                View Details <ChevronRight size={11} />
                            </button>
                        </div>

                        {/* ── Review Body ── */}
                        <div className="px-6 py-5">
                            {/* Stars + meta row */}
                            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                <div className="flex items-center gap-3">
                                    <StarRating rating={review.rating} size={15} />
                                    <span className="text-xs font-bold text-[#0f172a]">{ratingLabel(review.rating)}</span>
                                    {review.verified && (
                                        <span className="text-[10px] font-bold text-success bg-[#f0fdf4] border border-[#bbf7d0] px-2 py-0.5 rounded-full uppercase tracking-wide">
                                            ✓ Verified
                                        </span>
                                    )}
                                </div>
                                <span className="text-[11px] text-[#94a3b8] font-mono">{review.date}</span>
                            </div>

                            {/* Comment */}
                            <p className="text-sm text-[#475569] leading-relaxed mb-4">{review.comment}</p>

                            {/* Helpful row */}
                            <div className="flex items-center justify-between pt-4 border-t border-[#f1f5f9]">
                                <span className="text-[11px] text-[#94a3b8] uppercase tracking-widest font-semibold">Was this helpful?</span>
                                <button
                                    onClick={() => toggleHelpful(review.id)}
                                    className={`inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer uppercase tracking-wide
                    ${helpful[review.id].voted
                                            ? 'bg-accent text-white border-accent shadow-[0_4px_10px_#155dfc33]'
                                            : 'bg-white text-[#64748b] border-[#e2e8f0] hover:border-accent/30 hover:bg-[#eff6ff] hover:text-accent'
                                        }`}
                                >
                                    <ThumbsUp size={11} />
                                    Helpful · {helpful[review.id].count}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Empty state (shown when no reviews) ── */}
            {reviews.length === 0 && (
                <div className="bg-white rounded-2xl border border-[#e8edf5] shadow-[0_2px_16px_#155dfc08] px-8 py-16 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] border border-accent/15 flex items-center justify-center mb-4">
                        <PackageSearch size={24} className="text-accent" />
                    </div>
                    <h3 className="text-base font-bold text-[#0f172a] mb-1">No reviews yet</h3>
                    <p className="text-sm text-[#94a3b8]">Your product reviews will appear here after purchase.</p>
                </div>
            )}
        </div>
    );
};

export default ReviewTab;