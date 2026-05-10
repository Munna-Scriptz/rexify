"use client"
import React, { useState } from 'react';
import { Star, X, Send, User } from 'lucide-react';

const ProductReview = () => {
    const [reviews, setReviews] = useState([
        { id: 1, name: 'Alice Johnson', rating: 5, comment: 'Absolutely love this product! The quality is top-notch.', avatar: 'https://i.pravatar.cc/150?u=alice' },
        { id: 2, name: 'Bob Smith', rating: 4, comment: 'Great value for money. Highly recommended.', avatar: 'https://i.pravatar.cc/150?u=bob' },
        { id: 3, name: 'Charlie Davis', rating: 5, comment: 'Fast delivery and excellent customer service.', avatar: 'https://i.pravatar.cc/150?u=charlie' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    const handlePostReview = () => {
        if (newRating === 0 || !newComment.trim()) return;

        const newReview = {
            id: reviews.length + 1,
            name: 'Current User', // Mock user
            rating: newRating,
            comment: newComment,
            avatar: null // Default user icon
        };

        setReviews([newReview, ...reviews]);
        setIsModalOpen(false);
        setNewRating(0);
        setNewComment('');
    };

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
                    <span className="text-sm opacity-70">({reviews.length} reviews)</span>
                </div>
            </div>

            {/* YouTube Style Add Review Section */}
            <div className="mb-12">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border">
                        <User size={24} className="text-text-muted" />
                    </div>
                    <div className="flex-1 group">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full text-left pb-2 border-b-2 border-border text-text-muted font-medium hover:border-accent transition-colors pt-2 sm:pt-3"
                        >
                            Add a review...
                        </button>
                        <div className="mt-3 flex justify-end gap-3 opacity-0 group-focus-within:opacity-100 transition-opacity">
                            <button className="px-4 py-2 text-sm font-bold text-text-secondary hover:bg-muted rounded-full transition-all">Cancel</button>
                            <button className="px-4 py-2 text-sm font-bold bg-accent text-white rounded-full shadow-lg shadow-accent/10">Review</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review List */}
            <div className="space-y-8">
                {reviews.map((rev) => (
                    <div key={rev.id} className="flex gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted overflow-hidden flex items-center justify-center shrink-0 border border-border">
                            {rev.avatar ? (
                                <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                            ) : (
                                <User size={24} className="text-text-muted" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-sm text-text-primary">{rev.name}</h4>
                                <span className="text-[10px] text-text-muted font-medium">2 days ago</span>
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
                            <div className="flex items-center gap-4 mt-3">
                                <button className="text-xs font-bold text-text-muted hover:text-accent transition-colors flex items-center gap-1">
                                    Helpful?
                                </button>
                                <button className="text-xs font-bold text-text-muted hover:text-error transition-colors">
                                    Report
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simplified Load More */}
            <div className="mt-12 flex justify-center border-t border-border pt-8">
                <button className="text-sm font-black text-accent hover:text-blue-700 transition-colors uppercase tracking-widest px-6 py-2 border-2 border-accent/20 rounded-full hover:bg-accent/5">
                    Show More Reviews
                </button>
            </div>

            {/* Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-bounce-in">
                        <div className="p-8 pb-0 flex justify-between items-center">
                            <h3 className="text-2xl font-black text-text-primary">Post a Review</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-muted rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8">
                            {/* User Profile */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center border-2 border-border overflow-hidden">
                                    <User size={28} className="text-text-muted" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-primary text-lg">Current User</h4>
                                    <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Posting publicly</p>
                                </div>
                            </div>

                            {/* Star Selection */}
                            <div className="flex items-center gap-2 mb-8 justify-center sm:justify-start">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setNewRating(star)}
                                        className="p-1 transition-transform hover:scale-125"
                                    >
                                        <Star
                                            size={40}
                                            className={(hoverRating || newRating) >= star ? "text-yellow-400 fill-yellow-400" : "text-border"}
                                            strokeWidth={1.5}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Review Box */}
                            <div className="relative">
                                <textarea
                                    className="w-full bg-surface border-2 border-border rounded-3xl p-6 text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition-colors min-h-40 font-medium resize-none"
                                    placeholder="Share details of your own experience at this place..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex gap-4 mt-10">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 text-text-secondary font-bold hover:bg-muted rounded-2xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePostReview}
                                    disabled={!newRating || !newComment.trim()}
                                    className="flex-1 py-4 bg-accent text-white font-bold rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
                                >
                                    <Send size={18} />
                                    Post Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductReview;