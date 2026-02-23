import { Smartphone } from 'lucide-react'
import React from 'react'

const BkashNagadMeth = ({ paymentMethod }) => {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-text-primary mb-2">{paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Number</label>
                <div className="relative">
                    <input type="text" placeholder="01XXXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all pl-12" />
                    <Smartphone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-bold text-text-primary mb-2">Transaction ID</label>
                <input type="text" placeholder="TRX12345678" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
            </div>
            <div className="p-5 bg-accent/5 rounded-2xl border border-accent/10">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0 text-white">
                        <Smartphone size={20} />
                    </div>
                    <div>
                        <h5 className="font-bold text-text-primary mb-1">How to pay via {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'}?</h5>
                        <p className="text-xs text-text-secondary leading-relaxed">
                            1. Dial *247# or open the app<br />
                            2. Choose "Send Money" or "Payment"<br />
                            3. Enter our merchant number: 01300000000<br />
                            4. Enter the total amount and your PIN<br />
                            5. Copy the Transaction ID and paste it above
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BkashNagadMeth