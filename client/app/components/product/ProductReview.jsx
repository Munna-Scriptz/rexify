import { Star, User } from 'lucide-react';
import AddReviewAction from './AddReviewAction';

const ProductReview = ({ reviews, productId, currentUser }) => {
    return (
        <section className="mt-20">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-black text-text-primary tracking-tight">Customer Reviews</h2>
                    <p className="text-text-secondary font-medium mt-1">What our community says about this product</p>
                </div>
                <div className="flex items-center gap-2 bg-accent/5 px-4 py-2 rounded-2xl border border-accent/10 text-accent">
                    <Star size={18} fill="currentColor" />
                    <span className="font-bold text-xl">4.8</span>
                    <span className="text-sm opacity-70">({reviews?.length} reviews)</span>
                </div>
            </div>

            {/* Add review Action (Client Side - Create Mode) */}
            <AddReviewAction productId={productId} initialMode="create" />

            {/* Review List */}
            <div className="space-y-8">
                {reviews?.map((rev, i) => {
                    const isOwnReview = currentUser && rev.user?._id === currentUser._id;
                    return (
                        <div key={i} className="flex gap-4 group">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted overflow-hidden flex items-center justify-center shrink-0 border border-border">
                                {rev.user?.avatar ? (
                                    <img src={rev.user.avatar} alt={rev.user.fullname} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={24} className="text-text-muted" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-sm text-text-primary">{rev.user?.fullname}</h4>
                                        <span className="text-[10px] text-text-muted font-medium">
                                            {(() => {
                                                const diff = Math.floor((Date.now() - new Date(rev.createdAt)) / 86400000)
                                                return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`
                                            })()}
                                        </span>
                                        {isOwnReview && (
                                            <span className="px-2 py-0.5 bg-accent/10 text-accent text-[9px] font-bold rounded-full uppercase tracking-tighter">You</span>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            className={i < rev.rating ? "text-yellow-400 fill-yellow-400" : "text-border fill-border"}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                                    {rev.comment}
                                </p>
                                
                                {/* Actions Area */}
                                {isOwnReview ? (
                                    <AddReviewAction productId={productId} review={rev} initialMode="edit" />
                                ) : (
                                    <div className="flex items-center gap-4 mt-3">
                                        <button className="text-xs font-bold cursor-pointer text-text-muted hover:text-accent transition-colors flex items-center gap-1">
                                            Helpful?
                                        </button>
                                        <button className="text-xs font-bold cursor-pointer text-text-muted hover:text-error transition-colors">
                                            Report
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                
                {(!reviews || reviews.length === 0) && (
                    <div className="text-center py-12 bg-surface rounded-[40px] border-2 border-dashed border-border">
                        <p className="text-text-secondary font-medium">No reviews yet. Be the first to share your thoughts!</p>
                    </div>
                )}
            </div>

            {/* Simplified Load More */}
            {reviews?.length > 5 && (
                <div className="mt-12 flex justify-center border-t border-border pt-8">
                    <button className="text-sm font-black text-accent hover:text-blue-700 transition-colors uppercase tracking-widest px-6 py-2 border-2 border-accent/20 rounded-full hover:bg-accent/5">
                        Show More Reviews
                    </button>
                </div>
            )}
        </section>
    );
};

export default ProductReview;