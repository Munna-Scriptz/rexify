import { CreditCard } from 'lucide-react'
import React from 'react'

const VisaMeth = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-bold text-text-primary mb-2">Card Holder Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-text-primary mb-2">Card Number</label>
                    <div className="relative">
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all pl-12" />
                        <CreditCard size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-text-primary mb-2">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text-primary mb-2">CVV</label>
                        <input type="text" placeholder="123" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VisaMeth