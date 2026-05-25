import React, { useState } from 'react';
import { Upload, Plus, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import Inputs from '../ui/Inputs';

// EditVariantManager: extends VariantManager to support existing image URLs from DB
// Each variant has:
//   thumbnailFile: File | null  -> new upload (null = keep existing)
//   imageFiles: [File|null, File|null] -> new uploads
//   thumbnail: string           -> existing URL from DB
//   images: string[]            -> existing URLs from DB

const EditVariantManager = ({ variants, setVariants, errors, setErrors }) => {
    const [expandedVariantId, setExpandedVariantId] = useState(variants[0]?.id || null);

    const colorPresets = [
        { name: 'Space Black', code: '#111111' },
        { name: 'Natural Titanium', code: '#A59D95' },
        { name: 'Desert Sand', code: '#D1C2A5' },
        { name: 'Deep Purple', code: '#3E2A47' },
        { name: 'Alpine Green', code: '#3C4D3D' },
        { name: 'Sierra Blue', code: '#8FA3B5' }
    ];

    const addVariant = () => {
        const newId = Date.now();
        setVariants(prev => [
            ...prev,
            {
                id: newId,
                sku: '', colorName: '', colorCode: '#6366f1',
                storage: '', ram: '', price: '', discountPercentage: 0,
                stock: '', isDefault: false,
                thumbnailFile: null, imageFiles: [null, null],
                thumbnail: '', images: []
            }
        ]);
        setExpandedVariantId(newId);
    };

    const removeVariant = (id, e) => {
        e.stopPropagation();
        if (variants.length > 1) {
            const filtered = variants.filter(v => v.id !== id);
            const wasDefault = variants.find(v => v.id === id)?.isDefault;
            if (wasDefault && filtered.length > 0) filtered[0].isDefault = true;
            setVariants(filtered);
            if (expandedVariantId === id) setExpandedVariantId(filtered[0].id);
        }
    };

    const handleValueChange = (id, field, value) => {
        const index = variants.findIndex(v => v.id === id);
        const errKey = `variant_${index}_${field}`;
        if (errors[errKey]) {
            setErrors(prev => { const next = { ...prev }; delete next[errKey]; return next; });
        }
        setVariants(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v));
    };

    const applyColorPreset = (id, name, code) => {
        const index = variants.findIndex(v => v.id === id);
        setErrors(prev => {
            const next = { ...prev };
            delete next[`variant_${index}_colorName`];
            delete next[`variant_${index}_colorCode`];
            return next;
        });
        setVariants(prev => prev.map(v => v.id === id ? { ...v, colorName: name, colorCode: code } : v));
    };

    const handleSetDefault = (id, e) => {
        e.stopPropagation();
        setVariants(prev => prev.map(v => ({ ...v, isDefault: v.id === id })));
    };

    // ---- Thumbnail handlers ----
    const handleThumbnailChange = (id, file) => {
        if (!file) return;
        const index = variants.findIndex(v => v.id === id);
        if (errors[`variant_${index}_thumbnail`]) {
            setErrors(prev => { const next = { ...prev }; delete next[`variant_${index}_thumbnail`]; return next; });
        }
        setVariants(prev => prev.map(v => v.id === id ? { ...v, thumbnailFile: file } : v));
    };

    const removeThumbnail = (id, e) => {
        e.stopPropagation();
        // Clear both new file and existing URL
        setVariants(prev => prev.map(v => v.id === id ? { ...v, thumbnailFile: null, thumbnail: '' } : v));
    };

    // ---- Gallery handlers ----
    const handleImageChange = (id, imgIndex, file) => {
        if (!file) return;
        setVariants(prev => prev.map(v => {
            if (v.id !== id) return v;
            const newFiles = [...v.imageFiles];
            newFiles[imgIndex] = file;
            return { ...v, imageFiles: newFiles };
        }));
    };

    const removeImage = (id, imgIndex, e) => {
        e.stopPropagation();
        setVariants(prev => prev.map(v => {
            if (v.id !== id) return v;
            const newFiles = [...v.imageFiles];
            newFiles[imgIndex] = null;
            // Also clear the existing URL at that slot
            const newImages = [...(v.images || [])];
            newImages[imgIndex] = '';
            return { ...v, imageFiles: newFiles, images: newImages };
        }));
    };

    // Helper: get display src for a slot (new file takes priority over existing URL)
    const getThumbnailSrc = (variant) => {
        if (variant.thumbnailFile) return URL.createObjectURL(variant.thumbnailFile);
        if (variant.thumbnail) return variant.thumbnail;
        return null;
    };

    const getImageSrc = (variant, imgIndex) => {
        if (variant.imageFiles?.[imgIndex]) return URL.createObjectURL(variant.imageFiles[imgIndex]);
        if (variant.images?.[imgIndex]) return variant.images[imgIndex];
        return null;
    };

    return (
        <section className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold font-space text-white flex items-center gap-3">
                        <Sparkles size={20} className="text-indigo-400 animate-pulse" /> Product Variations
                    </h2>
                    <p className="text-xs text-slate-400">Existing images shown – upload new ones to replace them</p>
                </div>
                <button
                    type="button"
                    onClick={addVariant}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold font-space text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
                >
                    <Plus size={16} /> Add Variant
                </button>
            </div>

            {/* Accordion */}
            <div className="flex flex-col gap-4">
                {variants.map((variant, index) => {
                    const isExpanded = expandedVariantId === variant.id;
                    const thumbnailSrc = getThumbnailSrc(variant);

                    return (
                        <div
                            key={variant.id}
                            className={`rounded-2xl border transition-all duration-300 ${isExpanded
                                ? 'border-indigo-500/50 bg-slate-800/60 shadow-md shadow-indigo-500/5'
                                : 'border-slate-800 bg-slate-800/20 hover:bg-slate-800/40'
                                }`}
                        >
                            {/* Accordion Header */}
                            <div
                                onClick={() => setExpandedVariantId(isExpanded ? null : variant.id)}
                                className="flex items-center justify-between p-4 cursor-pointer select-none"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-5 h-5 rounded-full border border-slate-700 shadow-inner" style={{ backgroundColor: variant.colorCode || '#ccc' }} />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-semibold font-space text-white flex items-center gap-2">
                                            {variant.sku || `Var #${index + 1}`}
                                            <span className="text-xs font-normal text-slate-400 font-sans">
                                                {variant.colorName}{variant.ram && variant.storage ? ` (${variant.ram}GB/${variant.storage}GB)` : ''}{variant.price ? ` - $${variant.price}` : ''}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {variant.isDefault ? (
                                        <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-bold tracking-wider font-space uppercase">Default</span>
                                    ) : (
                                        <button type="button" onClick={(e) => handleSetDefault(variant.id, e)}
                                            className="px-2.5 py-1 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white text-[10px] font-bold tracking-wider font-space uppercase border border-slate-700 hover:border-slate-600 transition-all">
                                            Set Default
                                        </button>
                                    )}
                                    {variants.length > 1 && (
                                        <button type="button" onClick={(e) => removeVariant(variant.id, e)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer">
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                    <div className="text-slate-400">{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
                                </div>
                            </div>

                            {/* Accordion Content */}
                            {isExpanded && (
                                <div className="border-t border-slate-800 p-5 flex flex-col gap-6 animate-fade-in">
                                    {/* Row 1: SKU, Price, Stock */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Inputs variant="productVar" className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl" labelClassName="text-slate-400 font-semibold" label="SKU ID" placeholder="IPH15-BLK-256" value={variant.sku} onChange={(e) => handleValueChange(variant.id, 'sku', e.target.value)} error={errors[`variant_${index}_sku`]} />
                                        <Inputs variant="productVar" className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl" labelClassName="text-slate-400 font-semibold" label="Price ($)" type="number" placeholder="999" value={variant.price} onChange={(e) => handleValueChange(variant.id, 'price', e.target.value ? Number(e.target.value) : '')} error={errors[`variant_${index}_price`]} />
                                        <Inputs variant="productVar" className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl" labelClassName="text-slate-400 font-semibold" label="Stock Quantity" type="number" placeholder="50" value={variant.stock} onChange={(e) => handleValueChange(variant.id, 'stock', e.target.value !== '' ? Number(e.target.value) : '')} error={errors[`variant_${index}_stock`]} />
                                    </div>

                                    {/* Row 2: RAM, Storage, Discount */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Inputs variant="productVar" className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl" labelClassName="text-slate-400 font-semibold" label="RAM (GB)" type="number" placeholder="8" value={variant.ram} onChange={(e) => handleValueChange(variant.id, 'ram', e.target.value ? Number(e.target.value) : '')} error={errors[`variant_${index}_ram`]} />
                                        <Inputs variant="productVar" className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl" labelClassName="text-slate-400 font-semibold" label="Storage (GB)" type="number" placeholder="256" value={variant.storage} onChange={(e) => handleValueChange(variant.id, 'storage', e.target.value ? Number(e.target.value) : '')} error={errors[`variant_${index}_storage`]} />
                                        <Inputs variant="productVar" className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl" labelClassName="text-slate-400 font-semibold" label="Discount (%)" type="number" placeholder="0" value={variant.discountPercentage} onChange={(e) => handleValueChange(variant.id, 'discountPercentage', e.target.value ? Number(e.target.value) : 0)} error={errors[`variant_${index}_discountPercentage`]} />
                                    </div>

                                    {/* Row 3: Color */}
                                    <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Color Specifications</span>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                            <Inputs variant="productVar" className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl" labelClassName="text-slate-400 font-semibold" label="Color Name" placeholder="Titanium Gray" value={variant.colorName} onChange={(e) => handleValueChange(variant.id, 'colorName', e.target.value)} error={errors[`variant_${index}_colorName`]} />
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-semibold text-slate-400">Color Code (Hex)</label>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-all">
                                                        <input type="color" value={variant.colorCode || '#6366f1'} onChange={(e) => handleValueChange(variant.id, 'colorCode', e.target.value)} className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0" />
                                                        <div className="w-8 h-8 rounded-lg shadow-inner" style={{ backgroundColor: variant.colorCode || '#6366f1' }} />
                                                    </div>
                                                    <input type="text" placeholder="#6366f1" value={variant.colorCode} onChange={(e) => handleValueChange(variant.id, 'colorCode', e.target.value)} className="grow bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl text-sm font-medium focus:border-indigo-500/50 outline-none uppercase font-mono" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 mt-2 border-t border-slate-800/50 pt-3">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Premium Smartphone Swatches</span>
                                            <div className="flex flex-wrap gap-2.5">
                                                {colorPresets.map((preset, pIdx) => {
                                                    const isSelected = variant.colorName?.toLowerCase() === preset.name.toLowerCase();
                                                    return (
                                                        <button key={pIdx} type="button" onClick={() => applyColorPreset(variant.id, preset.name, preset.code)}
                                                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all cursor-pointer ${isSelected ? 'bg-indigo-600/10 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'}`}>
                                                            <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: preset.code }} />
                                                            {preset.name}
                                                            {isSelected && <Check size={12} className="text-indigo-400" />}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 4: Media */}
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Media Assets</span>
                                            <div className="flex items-center gap-2">
                                                {errors[`variant_${index}_thumbnail`] && (
                                                    <span className="text-[10px] text-rose-500 font-bold animate-pulse">{errors[`variant_${index}_thumbnail`]}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                            {/* Thumbnail slot */}
                                            {[
                                                { label: 'Variant Cover (1x)', getSrc: () => getThumbnailSrc(variant), isError: !!errors[`variant_${index}_thumbnail`], onRemove: (e) => removeThumbnail(variant.id, e), onUpload: (f) => handleThumbnailChange(variant.id, f), slotLabel: 'Thumbnail' },
                                                { label: 'Gallery Slot 1', getSrc: () => getImageSrc(variant, 0), isError: false, onRemove: (e) => removeImage(variant.id, 0, e), onUpload: (f) => handleImageChange(variant.id, 0, f), slotLabel: 'Image Slot 1' },
                                                { label: 'Gallery Slot 2', getSrc: () => getImageSrc(variant, 1), isError: false, onRemove: (e) => removeImage(variant.id, 1, e), onUpload: (f) => handleImageChange(variant.id, 1, f), slotLabel: 'Image Slot 2' },
                                            ].map((slot, sIdx) => {
                                                const src = slot.getSrc();
                                                return (
                                                    <div key={sIdx} className="flex flex-col gap-2">
                                                        <label className="text-xs font-semibold text-slate-400">{slot.label}</label>
                                                        <div className={`relative h-44 rounded-2xl border-2 border-dashed ${slot.isError ? 'border-rose-500 bg-rose-500/5' : 'border-slate-800 bg-slate-900 hover:border-indigo-500/50'} group transition-all flex flex-col items-center justify-center gap-2.5 overflow-hidden text-center`}>
                                                            {src ? (
                                                                <>
                                                                    <img src={src} alt={slot.label} className="w-full h-full object-cover" />
                                                                    {/* Existing URL badge */}
                                                                    {!((sIdx === 0 ? variant.thumbnailFile : variant.imageFiles?.[sIdx - 1])) && (
                                                                        <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-[9px] text-emerald-400 font-bold rounded-lg uppercase tracking-wider">Existing</span>
                                                                    )}
                                                                    <button type="button" onClick={slot.onRemove}
                                                                        className="absolute top-2.5 right-2.5 p-2 bg-rose-600/90 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer">
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-slate-700 transition-all shadow-md">
                                                                        {sIdx === 0 ? <Upload size={16} /> : <ImageIcon size={16} />}
                                                                    </div>
                                                                    <div className="flex flex-col gap-0.5 px-3">
                                                                        <span className="text-[10px] font-bold text-white font-space uppercase">{slot.slotLabel}</span>
                                                                        <span className="text-[9px] text-slate-500">JPG/PNG up to 2MB</span>
                                                                    </div>
                                                                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => slot.onUpload(e.target.files[0])} />
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default EditVariantManager;
