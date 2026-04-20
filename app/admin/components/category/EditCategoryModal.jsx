import React, { useState } from 'react';
import { X, Upload, Check, Power, LayoutGrid, Type, Hash, FileText } from 'lucide-react';

const EditCategoryModal = ({ isEditOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        icon: '',
        isActive: true,
        thumbnail: null
    });

    if (!isEditOpen) return null;

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-brand/80 animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden animate-fade-up">
                {/* Header */}
                <div className="px-8 py-4 bg-surface border-b border-border flex items-center justify-between">
                    <div className="flex 4lex-col3p-1">
                        <h2 className="text-lg font-medium font-space text-brand flex items-center gap-3">
                            <LayoutGrid size={24} className="text-accent" /> New Category
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-2xl bg-white border border-border flex items-center justify-center text-text-muted hover:text-rose-500 hover:border-rose-500 transition-all cursor-pointer group shadow-sm"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Thumbnail Upload */}
                        <div className="md:col-span-2 flex flex-col gap-3">
                            <label className="text-[11px] font-semibold font-space text-coil uppercase tracking-widest pl-2">Category Thumbnail</label>
                            <div className="h-48 rounded-4xl border-2 border-dashed border-border bg-surface/50 group hover:border-accent/40 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                                {formData.thumbnail ? (
                                    <img src={formData.thumbnail} className="w-full h-full object-cover" alt="preview" />
                                ) : (
                                    <>
                                        <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                            <Upload size={24} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-bold font-space text-brand mb-1">Upload High-Res Cover</p>
                                            <p className="text-[10px] text-text-muted font-medium">Recommended: 1200 x 800px</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-semibold font-space text-coil uppercase tracking-widest pl-2 flex items-center gap-2">
                                <Type size={12} /> Category Name
                            </label>
                            <input
                                type="text"
                                placeholder="Premium Smartphones"
                                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium text-brand focus:border-accent outline-none"
                            />
                        </div>

                        {/* Slug */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-semibold font-space text-coil uppercase tracking-widest pl-2 flex items-center gap-2">
                                <Hash size={12} /> Collection Slug
                            </label>
                            <input
                                type="text"
                                placeholder="premium-smartphones"
                                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium text-text-muted focus:border-accent outline-none shadow-inner"
                            />
                        </div>

                        {/* Icon Selection */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-semibold font-space text-coil uppercase tracking-widest pl-2 flex items-center gap-2">
                                <LayoutGrid size={12} /> Navigation Icon
                            </label>
                            <input
                                type="text"
                                placeholder="Icon Identifier (Smartphone)"
                                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium text-brand focus:border-accent outline-none"
                            />
                        </div>

                        {/* Status Toggle */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-semibold font-space text-coil uppercase tracking-widest pl-2 flex items-center gap-2">
                                <Power size={12} /> Status
                            </label>
                            <div className="flex items-center gap-3 h-12.5 px-5 bg-surface border border-border rounded-2xl">
                                <span className={`text-[11px] font-semibold font-space uppercase-coil-widest ${formData.isActive ? 'text-success' : 'text-text-muted'}`}>
                                    {formData.isActive ? 'Active' : 'Inactive'}
                                </span>
                                <button
                                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                    className={`ml-auto w-12 h-6 flex items-center px-1 rounded-full border-2 transition-all cursor-pointer ${formData.isActive ? 'bg-success border-success' : 'bg-surface border-border'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full shadow-sm transition-all ${formData.isActive ? 'translate-x-6 bg-white' : 'translate-x-0 bg-text-muted'}`} />
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="text-[11px] font-semibold font-space text-coil uppercase tracking-widest pl-2 flex items-center gap-2">
                                <FileText size={12} /> Rich Description
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Describe what makes this collection unique..."
                                className="w-full px-6 py-4 bg-surface border border-border rounded-3xl font-medium text-brand focus:border-accent outline-none resize-none leading-relaxed"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-6 bg-surface border-t border-border flex items-center justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 rounded-2xl border-2 border-border text-brand font-bold font-space text-sm hover:bg-white transition-all cursor-pointer"
                    >
                        Discard
                    </button>
                    <button className="w-full justify-center py-3 rounded-2xl bg-accent text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2">
                        <Check size={18} />
                        Create Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryModal;