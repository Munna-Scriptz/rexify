import { Heart } from 'lucide-react'
import Link from 'next/link'

export const WishlistEmptyState = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 font-primary">
            <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center text-text-secondary mb-6 animate-pulse">
                <Heart size={40} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold font-space mb-3">Your wishlist is empty</h2>
            <p className="text-text-secondary max-w-md mb-8">
                Looks like haven't added anything to your wishlist yet.
            </p>
            <Link href="/category" className="px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-accent/20">
                Start Shopping <ArrowRight size={18} />
            </Link>
        </div>
    )
}
