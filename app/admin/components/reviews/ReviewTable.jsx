import React from 'react';
import { Star } from 'lucide-react';

const ReviewTable = ({ reviews }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={i < rating ? "fill-warning text-warning" : "text-border fill-muted"} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface/50 border-b border-border">
              <th className="px-6 py-4 text-sm font-bold font-space text-brand uppercase tracking-wider">Reviewer</th>
              <th className="px-6 py-4 text-sm font-bold font-space text-brand uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-sm font-bold font-space text-brand uppercase tracking-wider">Rating</th>
              <th className="px-6 py-4 text-sm font-bold font-space text-brand uppercase tracking-wider">Review</th>
              <th className="px-6 py-4 text-sm font-bold font-space text-brand uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-surface/30 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <img 
                      src={review.userImage || "https://ui-avatars.com/api/?name=" + review.userName} 
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover border border-border shadow-sm group-hover:scale-105 transition-transform" 
                    />
                    <span className="text-coil font-bold text-sm">{review.userName}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-text-secondary text-sm font-medium">{review.productName}</span>
                </td>
                <td className="px-6 py-5">
                  {renderStars(review.rating)}
                </td>
                <td className="px-6 py-5 max-w-xs">
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                    {review.comment}
                  </p>
                </td>
                <td className="px-6 py-5">
                  <span className="text-text-muted text-xs font-medium uppercase tracking-tighter">{review.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewTable;
