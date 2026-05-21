import React, { useState } from 'react';
import { Upload, Plus, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import Inputs from '../ui/Inputs';

const VariantManager = ({ variants, setVariants, errors, setErrors }) => {
    const [expandedVariantId, setExpandedVariantId] = useState(variants[0]?.id || null);

    // Premium preset finishes with names and hex codes for visual "WOW" factor
    const colorPresets = [
        { name: 'Space Black', code: '#111111' },
        { name: 'Natural Titanium', code: '#A59D95' },
        { name: 'Desert Sand', code: '#D1C2A5' },
        { name: 'Deep Purple', code: '#3E2A47' },
        { name: 'Alpine Green', code: '#3C4D3D' },
        { name: 'Sierra Blue', code: '#8FA3B5' }
    ];

    // ----------- add variants -----------
    const addVariant = () => {
        const newId = Date.now();
        const updatedVariants = [
            ...variants,
            {
                id: newId,
                sku: '',
                colorName: '',
                colorCode: '#6366f1', // default indigo
                storage: '',
                ram: '',
                price: '',
                discountPercentage: 0,
                stock: '',
                isDefault: variants.length === 0, // default if first
                thumbnailFile: null,
                imageFiles: [null, null]
            }
        ];
        setVariants(updatedVariants);
        setExpandedVariantId(newId);
    };

    // ----------- remove variants -----------
    const removeVariant = (id, e) => {
        e.stopPropagation();
        if (variants.length > 1) {
            const filtered = variants.filter(v => v.id !== id);
            // If we deleted the default one, make the first variant of the remaining list the default
            const wasDefault = variants.find(v => v.id === id)?.isDefault;
            if (wasDefault && filtered.length > 0) {
                filtered[0].isDefault = true;
            }
            setVariants(filtered);
            if (expandedVariantId === id) {
                setExpandedVariantId(filtered[0].id);
            }
        }
    };

    // ----------- change individual variant inputs -----------
    const handleValueChange = (id, field, value) => {
        // Clear errors for this variant field
        const index = variants.findIndex(v => v.id === id);
        const errKey = `variant_${index}_${field}`;
        if (errors[errKey]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[errKey];
                return next;
            });
        }

        setVariants(prevVariants =>
            prevVariants.map(v => (v.id === id ? { ...v, [field]: value } : v))
        );
    };

    // ----------- change color presets -----------
    const applyColorPreset = (id, name, code) => {
        // Clear errors
        const index = variants.findIndex(v => v.id === id);
        if (errors[`variant_${index}_colorName`] || errors[`variant_${index}_colorCode`]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[`variant_${index}_colorName`];
                delete next[`variant_${index}_colorCode`];
                return next;
            });
        }

        setVariants(prevVariants =>
            prevVariants.map(v =>
                v.id === id ? { ...v, colorName: name, colorCode: code } : v
            )
        );
    };

    // ----------- set default variant -----------
    const handleSetDefault = (id, e) => {
        e.stopPropagation();
        setVariants(prevVariants =>
            prevVariants.map(v => ({ ...v, isDefault: v.id === id }))
        );
    };

    // ----------- handle variant thumbnail file selection -----------
    const handleThumbnailChange = (id, file) => {
        if (!file) return;
        const index = variants.findIndex(v => v.id === id);
        if (errors[`variant_${index}_thumbnail`]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[`variant_${index}_thumbnail`];
                return next;
            });
        }
        setVariants(prev =>
            prev.map(v => (v.id === id ? { ...v, thumbnailFile: file } : v))
        );
    };

    // ----------- handle variant gallery file selection -----------
    const handleImageChange = (id, imgIndex, file) => {
        if (!file) return;
        const index = variants.findIndex(v => v.id === id);
        if (errors[`variant_${index}_gallery`]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[`variant_${index}_gallery`];
                return next;
            });
        }
        setVariants(prev =>
            prev.map(v => {
                if (v.id === id) {
                    const newImages = [...v.imageFiles];
                    newImages[imgIndex] = file;
                    return { ...v, imageFiles: newImages };
                }
                return v;
            })
        );
    };

    // ----------- remove variant thumbnail -----------
    const removeThumbnail = (id, e) => {
        e.stopPropagation();
        setVariants(prev =>
            prev.map(v => (v.id === id ? { ...v, thumbnailFile: null } : v))
        );
    };

    // ----------- remove variant gallery image -----------
    const removeImage = (id, imgIndex, e) => {
        e.stopPropagation();
        setVariants(prev =>
            prev.map(v => {
                if (v.id === id) {
                    const newImages = [...v.imageFiles];
                    newImages[imgIndex] = null;
                    return { ...v, imageFiles: newImages };
                }
                return v;
            })
        );
    };

    return (
        <section className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl transition-all duration-300">
            {/* Component Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold font-space text-white flex items-center gap-3">
                        <Sparkles size={20} className="text-indigo-400 animate-pulse" /> Product Variations
                    </h2>
                    <p className="text-xs text-slate-400">Configure different specifications, colors, and media slots per variant</p>
                </div>
                <button
                    type="button"
                    onClick={addVariant}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold font-space text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
                >
                    <Plus size={16} /> Add Variant
                </button>
            </div>

            {/* Variants Accordion */}
            <div className="flex flex-col gap-4">
                {variants.map((variant, index) => {
                    const isExpanded = expandedVariantId === variant.id;
                    const colorName = variant.colorName || 'No Color';
                    const specsInfo = (variant.ram && variant.storage) ? ` (${variant.ram}GB/${variant.storage}GB)` : '';
                    const priceInfo = variant.price ? ` - $${variant.price}` : '';
                    const stockInfo = variant.stock !== '' ? ` | Stock: ${variant.stock}` : '';

                    return (
                        <div
                            key={variant.id}
                            className={`rounded-2xl border transition-all duration-300 ${
                                isExpanded
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
                                    {/* Color Indicator */}
                                    <div
                                        className="w-5 h-5 rounded-full border border-slate-700 shadow-inner"
                                        style={{ backgroundColor: variant.colorCode || '#ccc' }}
                                    />
                                    {/* Summary */}
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-semibold font-space text-white flex items-center gap-2">
                                            {variant.sku ? variant.sku : `Var #${index + 1}`}
                                            <span className="text-xs font-normal text-slate-400 font-sans">
                                                {colorName}{specsInfo}{priceInfo}{stockInfo}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* Default Variant Badge / Selector */}
                                    {variant.isDefault ? (
                                        <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-bold tracking-wider font-space uppercase">
                                            Default
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={(e) => handleSetDefault(variant.id, e)}
                                            className="px-2.5 py-1 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white text-[10px] font-bold tracking-wider font-space uppercase border border-slate-700 hover:border-slate-600 transition-all"
                                        >
                                            Set Default
                                        </button>
                                    )}

                                    {/* Delete Button */}
                                    {variants.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={(e) => removeVariant(variant.id, e)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}

                                    {/* Accordion Arrow */}
                                    <div className="text-slate-400">
                                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                </div>
                            </div>

                            {/* Accordion Content */}
                            {isExpanded && (
                                <div className="border-t border-slate-800 p-5 flex flex-col gap-6 animate-fade-in">
                                    {/* Row 1: General Specs */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Inputs
                                            variant="productVar"
                                            className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl"
                                            labelClassName="text-slate-400 font-semibold"
                                            label="SKU ID"
                                            placeholder="IPH15-BLK-256"
                                            value={variant.sku}
                                            onChange={(e) => handleValueChange(variant.id, 'sku', e.target.value)}
                                            error={errors[`variant_${index}_sku`]}
                                        />
                                        <Inputs
                                            variant="productVar"
                                            className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl"
                                            labelClassName="text-slate-400 font-semibold"
                                            label="Price ($)"
                                            type="number"
                                            placeholder="999"
                                            value={variant.price}
                                            onChange={(e) => handleValueChange(variant.id, 'price', e.target.value ? Number(e.target.value) : '')}
                                            error={errors[`variant_${index}_price`]}
                                        />
                                        <Inputs
                                            variant="productVar"
                                            className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl"
                                            labelClassName="text-slate-400 font-semibold"
                                            label="Stock Quantity"
                                            type="number"
                                            placeholder="50"
                                            value={variant.stock}
                                            onChange={(e) => handleValueChange(variant.id, 'stock', e.target.value !== '' ? Number(e.target.value) : '')}
                                            error={errors[`variant_${index}_stock`]}
                                        />
                                    </div>

                                    {/* Row 2: Performance Specs */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Inputs
                                            variant="productVar"
                                            className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl"
                                            labelClassName="text-slate-400 font-semibold"
                                            label="RAM (GB)"
                                            type="number"
                                            placeholder="8"
                                            value={variant.ram}
                                            onChange={(e) => handleValueChange(variant.id, 'ram', e.target.value ? Number(e.target.value) : '')}
                                            error={errors[`variant_${index}_ram`]}
                                        />
                                        <Inputs
                                            variant="productVar"
                                            className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl"
                                            labelClassName="text-slate-400 font-semibold"
                                            label="Storage (GB)"
                                            type="number"
                                            placeholder="256"
                                            value={variant.storage}
                                            onChange={(e) => handleValueChange(variant.id, 'storage', e.target.value ? Number(e.target.value) : '')}
                                            error={errors[`variant_${index}_storage`]}
                                        />
                                        <Inputs
                                            variant="productVar"
                                            className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl"
                                            labelClassName="text-slate-400 font-semibold"
                                            label="Discount (%)"
                                            type="number"
                                            placeholder="0"
                                            value={variant.discountPercentage}
                                            onChange={(e) => handleValueChange(variant.id, 'discountPercentage', e.target.value ? Number(e.target.value) : 0)}
                                            error={errors[`variant_${index}_discountPercentage`]}
                                        />
                                    </div>

                                    {/* Row 3: Colors Config */}
                                    <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Color Specifications</span>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                            <Inputs
                                                variant="productVar"
                                                className="bg-slate-900 border-slate-800 text-white focus:border-indigo-500/50 py-3 rounded-xl"
                                                labelClassName="text-slate-400 font-semibold"
                                                label="Color Name"
                                                placeholder="Titanium Gray"
                                                value={variant.colorName}
                                                onChange={(e) => handleValueChange(variant.id, 'colorName', e.target.value)}
                                                error={errors[`variant_${index}_colorName`]}
                                            />

                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-semibold text-slate-400">Color Code (Hex)</label>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-all">
                                                        <input
                                                            type="color"
                                                            value={variant.colorCode || '#6366f1'}
                                                            onChange={(e) => handleValueChange(variant.id, 'colorCode', e.target.value)}
                                                            className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0"
                                                        />
                                                        <div
                                                            className="w-8 h-8 rounded-lg shadow-inner"
                                                            style={{ backgroundColor: variant.colorCode || '#6366f1' }}
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="#6366f1"
                                                        value={variant.colorCode}
                                                        onChange={(e) => handleValueChange(variant.id, 'colorCode', e.target.value)}
                                                        className="grow bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl text-sm font-medium focus:border-indigo-500/50 outline-none uppercase font-mono"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Presets finshes */}
                                        <div className="flex flex-col gap-2 mt-2 border-t border-slate-800/50 pt-3">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Premium Smartphone Swatches</span>
                                            <div className="flex flex-wrap gap-2.5">
                                                {colorPresets.map((preset, pIdx) => {
                                                    const isSelected = variant.colorName?.toLowerCase() === preset.name.toLowerCase();
                                                    return (
                                                        <button
                                                            key={pIdx}
                                                            type="button"
                                                            onClick={() => applyColorPreset(variant.id, preset.name, preset.code)}
                                                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all cursor-pointer ${
                                                                isSelected
                                                                    ? 'bg-indigo-600/10 border-indigo-500 text-white'
                                                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                                            }`}
                                                        >
                                                            <span
                                                                className="w-3.5 h-3.5 rounded-full border border-black/20"
                                                                style={{ backgroundColor: preset.code }}
                                                            />
                                                            {preset.name}
                                                            {isSelected && <Check size={12} className="text-indigo-400" />}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 4: Variant Media Slots (1 thumbnail and 2 images) */}
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Media Assets</span>
                                            <div className="flex items-center gap-2">
                                                {errors[`variant_${index}_thumbnail`] && (
                                                    <span className="text-[10px] text-rose-500 font-bold animate-pulse">{errors[`variant_${index}_thumbnail`]}</span>
                                                )}
                                                {errors[`variant_${index}_gallery`] && (
                                                    <span className="text-[10px] text-rose-500 font-bold animate-pulse">{errors[`variant_${index}_gallery`]}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                            {/* Slot 1: Thumbnail */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-semibold text-slate-400">Variant Cover (1x)</label>
                                                <div className={`relative h-44 rounded-2xl border-2 border-dashed ${
                                                    errors[`variant_${index}_thumbnail`]
                                                        ? 'border-rose-500 bg-rose-500/5'
                                                        : 'border-slate-800 bg-slate-900 hover:border-indigo-500/50'
                                                } group transition-all flex flex-col items-center justify-center gap-2.5 overflow-hidden text-center`}>
                                                    {variant.thumbnailFile ? (
                                                        <>
                                                            <img
                                                                src={URL.createObjectURL(variant.thumbnailFile)}
                                                                alt="Variant Thumbnail"
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={(e) => removeThumbnail(variant.id, e)}
                                                                className="absolute top-2.5 right-2.5 p-2 bg-rose-600/90 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-slate-700 transition-all shadow-md">
                                                                <Upload size={16} />
                                                            </div>
                                                            <div className="flex flex-col gap-0.5 px-3">
                                                                <span className="text-[10px] font-bold text-white font-space uppercase">Thumbnail</span>
                                                                <span className="text-[9px] text-slate-500">JPG/PNG up to 2MB</span>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                                onChange={(e) => handleThumbnailChange(variant.id, e.target.files[0])}
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Slot 2: Gallery Image 1 */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-semibold text-slate-400">Gallery Slot 1</label>
                                                <div className={`relative h-44 rounded-2xl border-2 border-dashed ${
                                                    errors[`variant_${index}_gallery`] && !variant.imageFiles[0]
                                                        ? 'border-rose-500/50 bg-rose-500/5'
                                                        : 'border-slate-800 bg-slate-900 hover:border-indigo-500/50'
                                                } group transition-all flex flex-col items-center justify-center gap-2.5 overflow-hidden text-center`}>
                                                    {variant.imageFiles[0] ? (
                                                        <>
                                                            <img
                                                                src={URL.createObjectURL(variant.imageFiles[0])}
                                                                alt="Gallery Image 1"
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={(e) => removeImage(variant.id, 0, e)}
                                                                className="absolute top-2.5 right-2.5 p-2 bg-rose-600/90 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-slate-700 transition-all shadow-md">
                                                                <ImageIcon size={16} />
                                                            </div>
                                                            <div className="flex flex-col gap-0.5 px-3">
                                                                <span className="text-[10px] font-bold text-white font-space uppercase">Image Slot 1</span>
                                                                <span className="text-[9px] text-slate-500">JPG/PNG up to 2MB</span>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                                onChange={(e) => handleImageChange(variant.id, 0, e.target.files[0])}
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Slot 3: Gallery Image 2 */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-semibold text-slate-400">Gallery Slot 2</label>
                                                <div className={`relative h-44 rounded-2xl border-2 border-dashed ${
                                                    errors[`variant_${index}_gallery`] && !variant.imageFiles[1]
                                                        ? 'border-rose-500/50 bg-rose-500/5'
                                                        : 'border-slate-800 bg-slate-900 hover:border-indigo-500/50'
                                                } group transition-all flex flex-col items-center justify-center gap-2.5 overflow-hidden text-center`}>
                                                    {variant.imageFiles[1] ? (
                                                        <>
                                                            <img
                                                                src={URL.createObjectURL(variant.imageFiles[1])}
                                                                alt="Gallery Image 2"
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={(e) => removeImage(variant.id, 1, e)}
                                                                className="absolute top-2.5 right-2.5 p-2 bg-rose-600/90 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-slate-700 transition-all shadow-md">
                                                                <ImageIcon size={16} />
                                                            </div>
                                                            <div className="flex flex-col gap-0.5 px-3">
                                                                <span className="text-[10px] font-bold text-white font-space uppercase">Image Slot 2</span>
                                                                <span className="text-[9px] text-slate-500">JPG/PNG up to 2MB</span>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                                onChange={(e) => handleImageChange(variant.id, 1, e.target.files[0])}
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
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

export default VariantManager;
