import React from 'react'

const Specifications = ({ product }) => {
    return (
        <section className="mt-20 grid lg:grid-cols-3 gap-12">

            {/* Key Specs (Compact) */}
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold font-space mb-6">Key Specifications</h2>
                <div className="bg-surface rounded-2xl border border-border overflow-hidden">
                    {product.keySpecs.map((spec, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-white/50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                {spec.icon}
                            </div>
                            <div>
                                <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold">{spec.label}</p>
                                <p className="font-medium text-text-primary">{spec.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Description (Rich Text) */}
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold font-space mb-6">Product Description</h2>
                <div className="prose prose-lg text-text-secondary max-w-none">
                    {product.longDescription.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="mb-6 leading-relaxed">
                            {paragraph.trim()}
                        </p>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default Specifications