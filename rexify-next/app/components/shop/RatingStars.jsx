import { Star } from 'lucide-react';
import React from 'react'

const RatingStars = ({ count, filled }) => (
    <span className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} className={i < count ? 'text-yellow-400 fill-yellow-400' : 'text-border fill-border'} />
        ))}
    </span>
);

export default RatingStars