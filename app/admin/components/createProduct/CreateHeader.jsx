import React from 'react'

const CreateHeader = () => {
    return (
        <div className="flex items-center justify-between border-b border-border pb-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-text-primary font-space tracking-tight">Create New Product</h1>
                <p className="text-text-secondary">Flagship Inventory System</p>
            </div>
            <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 rounded-xl border-2 border-border text-brand font-bold font-space hover:bg-surface transition-all cursor-pointer">
                    Discard
                </button>
                <button className="px-8 py-2.5 rounded-xl bg-brand text-white font-bold font-space shadow-lg shadow-brand/10 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                    Publish Product
                </button>
            </div>
        </div>
    )
}

export default CreateHeader