import React from 'react';
import { Battery, Camera, Cpu, Wifi, Monitor, Smartphone } from 'lucide-react';

const Specifications = ({ specifications }) => {
    if (!specifications) return null;

    const specGroups = [
        {
            title: 'Display & Visuals',
            icon: <Monitor size={20} />,
            items: [
                { label: 'Size', value: specifications?.display?.size },
                { label: 'Type', value: specifications?.display?.type },
                { label: 'Resolution', value: specifications?.display?.resolution },
                { label: 'Refresh Rate', value: specifications?.display?.refreshRate },
            ]
        },
        {
            title: 'Performance & OS',
            icon: <Cpu size={20} />,
            items: [
                { label: 'Processor', value: specifications?.processor },
                { label: 'Operating System', value: specifications?.os },
            ]
        },
        {
            title: 'Camera System',
            icon: <Camera size={20} />,
            items: [
                { label: 'Rear Camera', value: specifications?.camera?.rear },
                { label: 'Front Camera', value: specifications?.camera?.front },
            ]
        },
        {
            title: 'Power & Battery',
            icon: <Battery size={20} />,
            items: [
                { label: 'Specifications', value: specifications?.battery },
            ]
        },
        {
            title: 'Connectivity',
            icon: <Wifi size={20} />,
            items: [
                { label: 'Network & Wireless', value: specifications?.network },
            ]
        },
        {
            title: 'Design & Build',
            icon: <Smartphone size={20} />,
            items: [
                { label: 'Weight', value: specifications?.weight },
            ]
        },
    ];

    return (
        <section className="mt-16 mb-20 animate-fade-in">
            <div className="flex flex-col items-center mb-12">
                <h2 className="text-4xl font-black text-text-primary tracking-tight mb-4">Specifications</h2>
                <div className="h-2 w-24 bg-accent rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specGroups.map((group, index) => (
                    <div
                        key={index}
                        className="group relative bg-white rounded-3xl p-6 border border-border shadow-md shadow-black/3 hover:border-accent hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-accent text-white shadow-lg shadow-accent/20 flex items-center justify-center shrink-0">
                                {React.cloneElement(group.icon, { size: 22, strokeWidth: 2 })}
                            </div>
                            <h3 className="text-xl font-bold text-text-primary leading-tight">{group.title}</h3>
                        </div>

                        <div className="space-y-3">
                            {group.items.map((item, i) => (
                                item.value && (
                                    <div key={i} className="flex flex-col gap-0.5 pb-2 last:border-0 last:pb-0">
                                        <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                                            {item.label}
                                        </span>
                                        <p className="text-[15px] text-text-primary leading-snug font-semibold">
                                            {item.value}
                                        </p>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Product Description section */}
            {specifications.longDescription && (
                <div className="mt-20 max-w-4xl mx-auto p-8 bg-surface rounded-[40px] border border-border">
                    <div className="flex flex-col mb-8">
                        <h2 className="text-3xl font-black text-text-primary tracking-tight mb-2">Product Details</h2>
                        <div className="h-1.5 w-16 bg-accent rounded-full" />
                    </div>
                    <div className="prose prose-lg prose-slate max-w-none">
                        {specifications.longDescription.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="text-lg text-text-primary leading-relaxed mb-6 last:mb-0 font-medium">
                                {paragraph.trim()}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Specifications;
