import React from 'react'

const BankMeth = () => {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-text-primary mb-2">Select Bank</label>
                <select className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-white">
                    <option>Chase Bank</option>
                    <option>Bank of America</option>
                    <option>Wells Fargo</option>
                    <option>HSBC</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-bold text-text-primary mb-2">Account Number</label>
                <input type="text" placeholder="Enter your bank account number" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
            </div>
            <div className="p-4 bg-muted/30 rounded-xl border border-dashed border-border">
                <p className="text-xs text-text-secondary leading-relaxed">
                    Note: Direct bank transfers may take up to 24 hours to process. Your order will be confirmed once funds are received.
                </p>
            </div>
        </div>
    )
}

export default BankMeth