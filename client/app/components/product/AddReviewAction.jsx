"use client";
import React, { useState, useEffect } from 'react';
import { Star, X, Send, User, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { apiClient } from '@/app/lib/apiClient';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AddReviewAction = ({ productId, review = null, initialMode = 'create' }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(initialMode); // 'create', 'edit', 'delete'
    const [newRating, setNewRating] = useState(review?.rating || 0);
    const [newComment, setNewComment] = useState(review?.comment || '');
    const [hoverRating, setHoverRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Sync state when review prop changes (for edit/delete)
    useEffect(() => {
        if (review) {
            setNewRating(review.rating);
            setNewComment(review.comment);
        }
    }, [review]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (mode === 'create') {
                await apiClient.post(`/review/create`, {
                    productId,
                    rating: newRating,
                    comment: newComment
                });
                toast.success("Review posted successfully!");
            } else if (mode === 'edit') {
                await apiClient.patch(`/review/edit`, {
                    reviewId: review._id,
                    rating: newRating,
                    comment: newComment
                });
                toast.success("Review updated successfully!");
            } else if (mode === 'delete') {
                await apiClient.delete(`/review/delete`, {
                    body: { reviewId: review._id }
                });
                toast.success("Review deleted successfully!");
            }

            setIsModalOpen(false);
            if (mode === 'create') {
                setNewRating(0);
                setNewComment('');
            }
            router.refresh();
        } catch (error) {
            toast.error(error.message || "Action failed");
        } finally {
            setLoading(false);
        }
    };

    const openModal = (actionMode) => {
        setMode(actionMode);
        setIsModalOpen(true);
    };

    return (
        <>
            {mode === 'create' && <ToastContainer />}
            
            {/* Triggers */}
            {initialMode === 'create' ? (
                <div className="mb-12">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border">
                            <User size={24} className="text-text-muted" />
                        </div>
                        <div className="flex-1 group">
                            <button
                                onClick={() => openModal('create')}
                                className="w-full text-left pb-2 border-b-2 border-border text-text-muted font-medium hover:border-accent transition-colors pt-2 sm:pt-3"
                            >
                                Add a review...
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-4 mt-3">
                    <button 
                        onClick={() => openModal('edit')}
                        className="text-xs font-bold cursor-pointer text-text-muted hover:text-accent transition-colors flex items-center gap-1"
                    >
                        <Edit2 size={12} /> Edit
                    </button>
                    <button 
                        onClick={() => openModal('delete')}
                        className="text-xs font-bold cursor-pointer text-text-muted hover:text-error transition-colors flex items-center gap-1"
                    >
                        <Trash2 size={12} /> Delete
                    </button>
                </div>
            )}

            {/* Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-99 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                        onClick={() => !loading && setIsModalOpen(false)}
                    />

                    <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-bounce-in">
                        <div className="p-8 pb-0 flex justify-between items-center">
                            <h3 className="text-2xl font-black text-text-primary">
                                {mode === 'create' && "Post a Review"}
                                {mode === 'edit' && "Edit Review"}
                                {mode === 'delete' && "Delete Review"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-muted rounded-full transition-colors"
                                disabled={loading}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8">
                            {mode === 'delete' ? (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AlertCircle size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold text-text-primary mb-2">Are you sure?</h4>
                                    <p className="text-text-secondary font-medium">This action cannot be undone. Your review will be permanently removed.</p>
                                </div>
                            ) : (
                                <>
                                    {/* User Profile */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center border-2 border-border overflow-hidden">
                                            <User size={28} className="text-text-muted" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-primary text-lg">Your Profile</h4>
                                            <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Posting publicly</p>
                                        </div>
                                    </div>

                                    {/* Star Selection */}
                                    <div className="flex items-center gap-2 mb-8 justify-center sm:justify-start">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onMouseEnter={() => !loading && setHoverRating(star)}
                                                onMouseLeave={() => !loading && setHoverRating(0)}
                                                onClick={() => !loading && setNewRating(star)}
                                                className="p-1 transition-transform hover:scale-125 disabled:opacity-50"
                                                disabled={loading}
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
                                            disabled={loading}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Footer Buttons */}
                            <div className="flex gap-4 mt-10">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 text-text-secondary font-bold hover:bg-muted rounded-2xl transition-all"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={mode !== 'delete' && (!newRating || !newComment.trim() || loading)}
                                    className={`flex-1 py-4 font-bold rounded-2xl shadow-xl transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2 ${
                                        mode === 'delete' 
                                        ? "bg-error text-white shadow-error/20 hover:scale-[1.02]" 
                                        : "bg-accent text-white shadow-accent/20 hover:scale-[1.02]"
                                    }`}
                                >
                                    {loading ? "Processing..." : (
                                        <>
                                            {mode === 'create' && <><Send size={18} /> Post Review</>}
                                            {mode === 'edit' && "Update Review"}
                                            {mode === 'delete' && "Delete Review"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddReviewAction;
