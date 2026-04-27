"use client"
import { useState } from 'react';
import { Upload, Plus, Trash2, Package, Cpu, Battery, Monitor, Camera, Tag as TagIcon, Image as ImageIcon, Smartphone, ShieldCheck, Layers, Network, Weight } from 'lucide-react';
import CreateHeader from '../../components/createProduct/CreateHeader';
import Inputs from '../../components/ui/Inputs';

const page = () => {
    const [variants, setVariants] = useState([
        { id: Date.now(), sku: '', color: '', storage: '', ram: '', price: '', stock: '' }
    ]);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const addVariant = () => {
        setVariants([...variants, { id: Date.now(), sku: '', color: '', storage: '', ram: '', price: '', stock: '' }]);
    };

    const removeVariant = (id) => {
        if (variants.length > 1) {
            setVariants(variants.filter(v => v.id !== id));
        }
    };

    const addTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
            e.preventDefault();
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-6 pb-20 animate-fade-in">
            {/* ---------------- Header ---------------- */}
            <CreateHeader />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* ================= LEFT COLUMN ================= */}
                <div className="lg:col-span-7 flex flex-col gap-6">

                    {/* Media & Gallery (The "Rare Beauty" Style) */}
                    <section className="p-6 bg-white rounded-3xl border border-border shadow-sm">
                        <h2 className="text-xl font-bold font-space text-brand mb-6 flex items-center gap-3">
                            <ImageIcon size={22} className="text-accent" /> Media Gallery
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2 md:row-span-2 relative h-95 rounded-2xl border-2 border-dashed border-border bg-surface/50 group hover:border-accent/40 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 overflow-hidden">
                                <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-accent group-hover:scale-110 transition-transform z-10">
                                    <Upload size={20} />
                                </div>
                                <p className="text-[12px] font-semibold font-space text-text-muted uppercase tracking-widest z-10">Main Thumbnail</p>
                                <span className="absolute top-4 left-4 px-3 py-1 bg-brand text-white text-[9px] font-semibold rounded-full uppercase z-10 tracking-tighter">Cover</span>
                            </div>
                            <div className="relative h-45.5 rounded-2xl border-2 border-dashed border-border bg-surface/30 group hover:border-accent/40 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden text-text-muted">
                                <Upload size={18} />
                                <p className="text-[9px] font-semibold font-space uppercase">Img 1</p>
                            </div>
                            <div className="relative h-45.5 rounded-2xl border-2 border-dashed border-border bg-surface/30 group hover:border-accent/40 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden text-text-muted">
                                <Upload size={18} />
                                <p className="text-[9px] font-semibold font-space uppercase">Img 2</p>
                            </div>
                            <div className="relative h-45.5 rounded-2xl border-2 border-dashed border-border bg-surface/30 group hover:border-accent/40 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden text-text-muted">
                                <Upload size={18} />
                                <p className="text-[9px] font-semibold font-space uppercase">Img 3</p>
                            </div>
                            <div className="relative h-45.5 rounded-2xl border-2 border-dashed border-border bg-white flex flex-col items-center justify-center transition-all cursor-pointer shadow-sm">
                                <Plus size={22} className="text-accent" />
                            </div>
                        </div>
                    </section>

                    {/* General Information */}
                    <section className="p-6 bg-white rounded-3xl border border-border shadow-sm">
                        <h2 className="text-xl font-semibold font-space text-brand mb-6 flex items-center gap-3">
                            <Package size={22} className="text-accent" /> Product Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className='md:col-span-2'>
                                <Inputs variant='adminPrimary' label={"Product Title"} placeholder={"iPhone 15 Pro Max"} />
                            </div>

                            <Inputs variant='adminPrimary' label={"Brand"} placeholder={"Apple"} />

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Category</label>
                                <div className="relative">
                                    <select className="w-full appearance-none text-sm px-5 py-3.5 text-coil bg-surface border border-border rounded-xl font-medium focus:border-accent outline-none cursor-pointer">
                                        <option>Apple</option>
                                        <option>Samsung</option>
                                        <option>Hawai</option>
                                    </select>
                                    <Layers className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                                </div>
                            </div>

                            <Inputs variant='adminPrimary' label={"% Discount"} type='number' placeholder={"0"} />
                            <Inputs variant='adminPrimary' label={"Badge"} placeholder={"New, Sale, Top"} />

                            <div className="md:col-span-2 flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-widest duration-300 text-slate-500">Full Description</label>
                                <textarea rows="5" placeholder="Highlight technical features..." className="w-full px-6 py-4 bg-surface border border-border rounded-2xl font-medium text-brand focus:border-accent outline-none resize-none" />
                            </div>
                        </div>
                    </section>

                    {/* Specifications */}
                    <section className="p-6 bg-white rounded-3xl border border-border shadow-sm">
                        <h2 className="text-xl font-bold font-space text-brand mb-6 flex items-center gap-3">
                            <Smartphone size={22} className="text-accent" /> High-Level Specs
                        </h2>

                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                                <span className="text-xs font-bold uppercase tracking-widest duration-300 text-slate-500 bg-accent/10 px-3 py-1.5 rounded-full w-fit">1. Screen Configuration</span>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Inputs variant='adminPrimary' size='sm' placeholder={`Size (6.7)`} />
                                    <Inputs variant='adminPrimary' size='sm' placeholder={`OLED, LCD`} />
                                    <Inputs variant='adminPrimary' size='sm' placeholder={`Resolution`} />
                                    <Inputs variant='adminPrimary' size='sm' placeholder={`Rate (Hz)`} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Inputs variant='adminPrimary' className='py-3' size='sm' labelIcon={<Camera size={16} />} label={"Rear Camera"} placeholder={`48MP + 12MP + 12MP`} />
                                <Inputs variant='adminPrimary' className='py-3' size='sm' labelIcon={<Camera size={16} />} label={"Front Lens"} placeholder={`12MP True Depth`} />
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                                <Inputs variant='adminPrimary' className='py-2.5' size='sm' labelIcon={<Battery size={16} />} label={"Battery"} placeholder={`5000 mAh`} />
                                <Inputs variant='adminPrimary' className='py-2.5' size='sm' labelIcon={<Cpu size={16} />} label={"Processor"} placeholder={`elite gen 5`} />
                                <Inputs variant='adminPrimary' className='py-2.5' size='sm' labelIcon={<Monitor size={16} />} label={"OS"} placeholder={`iOS 17`} />
                                <Inputs variant='adminPrimary' className='py-2.5' size='sm' labelIcon={<Network size={16} />} label={"Network"} placeholder={`5G`} />
                                <Inputs variant='adminPrimary' className='py-2.5' size='sm' labelIcon={<Weight size={16} />} label={"Weight"} placeholder={`221g`} />
                            </div>
                        </div>
                    </section>

                    {/* Logistics & Tags (BOTTOM LEFT) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                        <section className="p-6 bg-white rounded-3xl border border-border shadow-sm">
                            <h2 className="text-xl font-bold font-space text-brand mb-5 flex items-center gap-2">
                                <ShieldCheck size={20} className="text-accent" /> Logistics
                            </h2>
                            <div className="flex flex-col gap-4">
                                <Inputs variant='adminPrimary' label={"Warranty"} defaultValue="No warranty" placeholder={"Apple"} />
                                <Inputs variant='adminPrimary' label={"Shipping"} defaultValue="Ships in 3-5 days" placeholder={"Apple"} />
                            </div>
                        </section>

                        <section className="p-6 bg-white rounded-3xl border border-border shadow-sm">
                            <h2 className="text-xl font-bold font-space text-brand mb-5 flex items-center gap-2">
                                <TagIcon size={20} className="text-accent" /> Metadata
                            </h2>
                            <div className="flex flex-wrap gap-1.5 mb-4 max-h-24 overflow-y-auto">
                                {tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-brand text-white rounded-lg text-[12px] font-bold font-space flex items-center gap-1.5">
                                        {tag}
                                        <button onClick={() => removeTag(i)} className="cursor-pointer opacity-70 hover:opacity-100">x</button>
                                    </span>
                                ))}
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={addTag}
                                    placeholder="Add search tags..."
                                    className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl focus:border-accent outline-none text-xs font-bold text-brand shadow-sm"
                                />
                                <Plus className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent" size={14} />
                            </div>
                        </section>
                    </div>

                </div>

                {/* ================= RIGHT COLUMN (Variants Manager - BIGGER) ================= */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                    <section className="p-6 bg-[#0B0F1A] rounded-4xl border border-white/5 shadow-2xl sticky top-24">
                        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                            <h2 className="text-2xl font-bold font-space text-white">
                                Variations
                            </h2>
                            <button
                                onClick={addVariant}
                                className="px-4 py-2 bg-accent rounded-xl text-white font-semibold font-space text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 shadow-lg shadow-accent/10"
                            >
                                <Plus size={16} /> New Variant
                            </button>
                        </div>

                        <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto pr-3 custom-scrollbar">
                            {variants.map((variant, index) => (
                                <div key={variant.id} className="relative p-5 rounded-2xl border border-white/10 bg-white/5 flex flex-col gap-6 group hover:bg-white/10 transition-all">
                                    <div className="flex items-center justify-between">
                                        <span className={`px-4 py-1 rounded-full text-[11px] font-semibold font-space uppercase tracking-[0.2em] ${index === 0 ? 'bg-success text-white' : 'bg-white/10 text-white/50'}`}>
                                            {index === 0 ? 'Main' : `Var #${index + 1}`}
                                        </span>
                                        {index > 0 && (
                                            <button onClick={() => removeVariant(variant.id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-error/20 text-error hover:bg-error hover:text-white transition-all cursor-pointer"><Trash2 size={14} /></button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                        <Inputs variant='adminPrimary' size='medium' className='border-white/10 text-white bg-white/5' labelClassName={"text-slate-300 text-xs"} label={"SKU"} placeholder={"IPH-15-256"} />
                                        <Inputs variant='adminPrimary' size='medium' className='border-white/10 text-white bg-white/5' labelClassName={"text-slate-300 text-xs"} label={"COLOR"} placeholder={"Space Gray"} />
                                        <Inputs variant='adminPrimary' size='medium' className='border-white/10 text-white bg-white/5' labelClassName={"text-slate-300 text-xs"} type='number' label={"RAM (GB)"} placeholder={"8"} />
                                        <Inputs variant='adminPrimary' size='medium' className='border-white/10 text-white bg-white/5' labelClassName={"text-slate-300 text-xs"} type='number' label={"Storage (GB)"} placeholder={"256"} />

                                        <div className='border-t border-white/5 pt-3'>
                                            <Inputs variant='adminPrimary' size='medium' className='border-white/10 text-white bg-accent/20' labelClassName={"text-accent/80 text-xs"} type='number' label={"Price"} placeholder={"99.00"} />
                                        </div>
                                        <div className='border-t border-white/5 pt-3'>
                                            <Inputs variant='adminPrimary' size='medium' className='border border-success/30 text-white bg-success/10' labelClassName={"text-success/80 text-xs"} type='number' label={"Stock"} placeholder={"50"} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default page;