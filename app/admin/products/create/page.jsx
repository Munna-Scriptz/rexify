"use client"
import { useState } from 'react';
import { Upload, Plus, Trash2, Package, Cpu, Battery, Monitor, Camera, Tag as TagIcon, Image as ImageIcon, Smartphone, ShieldCheck, Layers, Network, Weight } from 'lucide-react';
import CreateHeader from '../../components/createProduct/CreateHeader';
import Inputs from '../../components/ui/Inputs';
import { useCreateProductMutation, useGetCategoryQuery } from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';

const page = () => {
    // ------------ Get categories from server -------------
    const { data: categories, error, isLoading } = useGetCategoryQuery()
    
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        category: '',
        price: 0,
        discountPercentage: 0,
        brand: '',
        badge: '',
        warranty: 'No warranty',
        shipping: 'Ships in 3-5 business days',
        isActive: true
    });

    const [specs, setSpecs] = useState({
        display: { size: '', type: '', resolution: '', refreshRate: '' },
        camera: { rear: '', front: '' },
        battery: '',
        processor: '',
        network: '',
        weight: '',
        os: ''
    });

    const [variants, setVariants] = useState([{
        id: Date.now(),
        sku: '',
        color: '',
        storage: '',
        ram: '',
        price: '',
        stock: ''
    }]);

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const [errors, setErrors] = useState({});

    // ----------- handle all input chances 
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value);

        setFormData(prev => ({ ...prev, [name]: val }));

        if (errors[name]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }

        if (name === 'title') {
            const slug = value.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
            setFormData(prev => ({ ...prev, title: value, slug }));
        }
    };

    // ----------- handle all specifications chances 
    const handleSpecChange = (section, field, value) => {
        const key = field ? `spec_${section}_${field}` : `spec_${section}`;
        if (errors[key]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[key];
                return next;
            });
        }

        if (field) {
            setSpecs(prev => ({
                ...prev,
                [section]: { ...prev[section], [field]: value }
            }));
        } else {
            setSpecs(prev => ({ ...prev, [section]: value }));
        }
    };

    // ----------- handle all variants chances 
    const handleVariantChange = (id, field, value, type) => {
        const index = variants.findIndex(v => v.id === id);
        const errKey = `variant_${index}_${field}`;
        if (errors[errKey]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[errKey];
                return next;
            });
        }

        const val = type === 'number' ? Number(value) : value;
        setVariants(variants.map(v => v.id === id ? { ...v, [field]: val } : v));
    };

    // ----------- handle add variants 
    const addVariant = () => {
        setVariants([...variants, { id: Date.now(), sku: '', color: '', storage: '', ram: '', price: '', stock: '' }]);
    };

    // ----------- handle remove variants 
    const removeVariant = (id) => {
        if (variants.length > 1) {
            setVariants(variants.filter(v => v.id !== id));
        }
    };

    // ----------- handle images upload 
    const handleImages = (e) => {
        let imgs = [...images]
        imgs.push(e.target.files[0])
        setImages(imgs)
    };

    // ----------- handle remove images 
    const removeImages = (i) => {
        setImages(images.filter((img, idx) => idx !== i));
    };

    // ----------- handle add tags 
    const addTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
            e.preventDefault();
        }
    };

    // ----------- handle remove tags 
    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    // ----------- handle all input validations 
    const validateForm = () => {
        const newErrors = {};

        // General Info
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.brand) newErrors.brand = "Brand is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.price) newErrors.price = "Price is required";

        // Media
        if (!thumbnail) newErrors.thumbnail = "Main thumbnail is required";
        if (Images.length === 0) newErrors.gallery = "Add at least one image";

        // Specifications
        const requiredSpecs = [
            { s: 'display', f: 'size' }, { s: 'display', f: 'type' }, { s: 'display', f: 'resolution' }, { s: 'display', f: 'refreshRate' },
            { s: 'camera', f: 'rear' }, { s: 'camera', f: 'front' },
            { s: 'battery' }, { s: 'processor' }, { s: 'network' }, { s: 'weight' }, { s: 'os' }
        ];

        requiredSpecs.forEach(spec => {
            const val = spec.f ? specs[spec.s][spec.f] : specs[spec.s];
            const key = spec.f ? `spec_${spec.s}_${spec.f}` : `spec_${spec.s}`;
            if (!val) newErrors[key] = "Required";
        });

        // Variants
        variants.forEach((v, index) => {
            if (!v.sku) newErrors[`variant_${index}_sku`] = "SKU required";
            if (!v.color) newErrors[`variant_${index}_color`] = "Color required";
            if (!v.storage) newErrors[`variant_${index}_storage`] = "Storage";
            if (!v.ram) newErrors[`variant_${index}_ram`] = "Ram required";
            if (!v.price || v.price < 1) newErrors[`variant_${index}_price`] = "Min price 1";
            if (v.stock === '' || v.stock < 0) newErrors[`variant_${index}_stock`] = "Min stock 0";
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstErrorField = Object.keys(newErrors)[0];
            toast.error(`Please enter ${firstErrorField}`, { theme: "dark" });
            return false;
        }

        return true;
    };

    // --------------- Handle submit ----------------
    const [createProduct] = useCreateProductMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const res = await createProduct({
                thumbnail: thumbnail.file,

                title: formData.title,
                slug: formData.slug,
                description: formData.description,
                category: formData.category,
                price: formData.price,
                variants: variants,
                specifications: specs,
                brand: formData.brand,
                badge: formData.badge,
                shipping: formData.shipping,
                warranty: formData.warranty,
                tags,
                isActive: formData.isActive,
            })

            console.log(res)
            if (!res.error.data.success) return toast.error(res.error.data.message, { theme: "dark" });
            if (res.error.data.success) return toast.error(res.error.data.message, { theme: "dark" });
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col gap-6 pb-20 animate-fade-in">
                {/* ---------------- Header ---------------- */}
                <CreateHeader onPublish={handleSubmit} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* ================= LEFT COLUMN ================= */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                        {/* ----------- Media & Gallery ------------*/}
                        <section className="p-6 bg-white rounded-3xl border border-border shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold font-space text-brand flex items-center gap-3">
                                    <ImageIcon size={22} className="text-accent" /> Media Gallery
                                </h2>
                                {errors.gallery && <span className="text-xs font-bold text-error animate-pulse">{errors.gallery}</span>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className={`md:col-span-2 md:row-span-2 relative h-95 rounded-2xl border-2 border-dashed ${errors.thumbnail ? 'border-error bg-error/5' : 'border-border bg-surface/50'} group hover:border-accent/40 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 overflow-hidden`}>
                                    {thumbnail ? (
                                        <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <div className={`w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center ${errors.thumbnail ? 'text-error' : 'text-accent'} group-hover:scale-110 transition-transform z-10`}>
                                                <Upload size={20} />
                                            </div>
                                            <p className={`text-[12px] font-semibold font-space ${errors.thumbnail ? 'text-error/70' : 'text-text-muted'} uppercase tracking-widest z-10`}>
                                                {errors.thumbnail || "Main Thumbnail"}
                                            </p>
                                        </>
                                    )}
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setThumbnail(e.target.files[0])} accept="image/*" />
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-brand text-white text-[9px] font-semibold rounded-full uppercase z-10 tracking-tighter">Cover</span>
                                </div>

                                {/* Gallery Images */}
                                {[0, 1, 2, 3].map((i) => (
                                    <div key={i} className={`relative h-45.5 rounded-2xl border-2 border-dashed ${errors.gallery && images.length === 0 ? 'border-error/30' : 'border-border'} bg-surface/30 group hover:border-accent/40 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden text-text-muted`}>
                                        {images[i] ?
                                            <>
                                                <img src={URL.createObjectURL(images[i])} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                                                <button
                                                    onClick={() => removeImages(i)}
                                                    className="absolute top-2 right-2 p-1 bg-error text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </>
                                            :
                                            <>
                                                <Upload size={18} className={errors.gallery && images.length === 0 ? 'text-error/50' : ''} />
                                                <p className={`text-[9px] font-semibold font-space uppercase ${errors.gallery && images.length === 0 ? 'text-error/50' : ''}`}>Img {i + 1}</p>
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImages} accept="image/*" />
                                            </>
                                        }
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* General Information */}
                        <section className="p-6 bg-white rounded-3xl border border-border shadow-sm">
                            <h2 className="text-xl font-semibold font-space text-brand mb-6 flex items-center gap-3">
                                <Package size={22} className="text-accent" /> Product Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className='md:col-span-2'>
                                    <Inputs variant='adminPrimary' label={"Product Title"} name="title" value={formData.title} onChange={handleInputChange} error={errors.title} placeholder={"iPhone 15 Pro Max"} />
                                </div>
                                <div className='md:col-span-2'>
                                    <Inputs variant='adminPrimary' label={"Slug"} name="slug" value={formData.slug} onChange={handleInputChange} error={errors.slug} placeholder={"Automatic slug"} />
                                </div>

                                <Inputs variant='adminPrimary' label={"Brand"} name="brand" value={formData.brand} onChange={handleInputChange} error={errors.brand} placeholder={"Apple"} />

                                <div className="flex flex-col gap-2">
                                    <label className={`text-xs font-bold uppercase tracking-widest duration-300 ${errors.category ? 'text-error animate-pulse' : 'text-slate-500'}`}>
                                        {errors.category ? <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-red-500 rounded-full"></span>{errors.category}</span> : "Category"}
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className={`w-full appearance-none text-sm px-5 py-3.5 text-coil bg-surface border ${errors.category ? 'border-error' : 'border-border'} rounded-xl font-medium focus:border-accent outline-none cursor-pointer`}
                                        >
                                            <option value="">Select Category</option>
                                            {
                                                categories?.data?.map((item, i) => (
                                                    <option key={i} value={item._id}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                        <Layers className={`absolute right-5 top-1/2 -translate-y-1/2 ${errors.category ? 'text-error' : 'text-text-muted'}`} size={14} />
                                    </div>
                                </div>

                                <Inputs variant='adminPrimary' label={"Price"} name="price" type='number' value={formData.price} error={errors.price} onChange={handleInputChange} placeholder={"0"} min={1} />
                                <Inputs variant='adminPrimary' label={"% Discount"} name="discountPercentage" type='number' value={formData.discountPercentage} onChange={handleInputChange} placeholder={"0"} min={1} />
                                <Inputs variant='adminPrimary' label={"Badge"} name="badge" value={formData.badge} onChange={handleInputChange} placeholder={"New, Sale, Top"} />

                                <div className="md:col-span-2 flex flex-col gap-2">
                                    <label className={`text-xs font-bold uppercase tracking-widest duration-300 ${errors.description ? 'text-error animate-pulse' : 'text-slate-500'}`}>
                                        {errors.description ? <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-red-500 rounded-full"></span>{errors.description}</span> : "Full Description"}
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="5"
                                        placeholder="Highlight technical features..."
                                        className={`w-full px-6 py-4 bg-surface border ${errors.description ? 'border-error' : 'border-border'} rounded-2xl font-medium text-brand focus:border-accent outline-none resize-none`}
                                    />
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
                                        <Inputs variant='adminPrimary' size='sm' placeholder={`Size (6.7)`} value={specs.display.size} onChange={(e) => handleSpecChange('display', 'size', e.target.value)} error={errors.spec_display_size} />
                                        <Inputs variant='adminPrimary' size='sm' placeholder={`OLED, LCD`} value={specs.display.type} onChange={(e) => handleSpecChange('display', 'type', e.target.value)} error={errors.spec_display_type} />
                                        <Inputs variant='adminPrimary' size='sm' placeholder={`Resolution`} value={specs.display.resolution} onChange={(e) => handleSpecChange('display', 'resolution', e.target.value)} error={errors.spec_display_resolution} />
                                        <Inputs variant='adminPrimary' size='sm' placeholder={`Rate (Hz)`} value={specs.display.refreshRate} onChange={(e) => handleSpecChange('display', 'refreshRate', e.target.value)} error={errors.spec_display_refreshRate} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Inputs variant='adminPrimary' className='py-3' size='sm' labelIcon={<Camera size={16} />} label={"Rear Camera"} placeholder={`48MP + 12MP + 12MP`} value={specs.camera.rear} onChange={(e) => handleSpecChange('camera', 'rear', e.target.value)} error={errors.spec_camera_rear} />
                                    <Inputs variant='adminPrimary' className='py-3' size='sm' labelIcon={<Camera size={16} />} label={"Front Lens"} placeholder={`12MP True Depth`} value={specs.camera.front} onChange={(e) => handleSpecChange('camera', 'front', e.target.value)} error={errors.spec_camera_front} />
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                                    <Inputs variant='adminPrimary' className='py-2.5' size='sm' labelIcon={<Battery size={16} />} label={"Battery"} placeholder={`5000 mAh`} value={specs.battery} onChange={(e) => handleSpecChange('battery', null, e.target.value)} error={errors.spec_battery} />
                                    <Inputs variant='adminPrimary' className='py-2.5' size='sm' labelIcon={<Cpu size={16} />} label={"Processor"} placeholder={`elite gen 5`} value={specs.processor} onChange={(e) => handleSpecChange('processor', null, e.target.value)} error={errors.spec_processor} />
                                    <Inputs variant='adminPrimary' className='py-2.5' size='sm' labelIcon={<Monitor size={16} />} label={"OS"} placeholder={`iOS 17`} value={specs.os} onChange={(e) => handleSpecChange('os', null, e.target.value)} error={errors.spec_os} />
                                    <Inputs variant='adminPrimary' className='py-2.5' size='sm' labelIcon={<Network size={16} />} label={"Network"} placeholder={`5G`} value={specs.network} onChange={(e) => handleSpecChange('network', null, e.target.value)} error={errors.spec_network} />
                                    <Inputs variant='adminPrimary' className='py-2.5' size='sm' labelIcon={<Weight size={16} />} label={"Weight"} placeholder={`221g`} value={specs.weight} onChange={(e) => handleSpecChange('weight', null, e.target.value)} error={errors.spec_weight} />
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
                                    <Inputs variant='adminPrimary' label={"Warranty"} name="warranty" value={formData.warranty} onChange={handleInputChange} placeholder={"No warranty"} />
                                    <Inputs variant='adminPrimary' label={"Shipping"} name="shipping" value={formData.shipping} onChange={handleInputChange} placeholder={"Ships in 3-5 days"} />
                                </div>
                            </section>

                            <section className="p-6 bg-white rounded-3xl border border-border shadow-sm">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-xl font-bold font-space text-brand flex items-center gap-2">
                                        <TagIcon size={20} className="text-accent" /> Metadata
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold uppercase text-slate-400">Active</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="sr-only peer" />
                                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-success"></div>
                                        </label>
                                    </div>
                                </div>
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

                            <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto pr-3" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitScrollbar: { display: 'none' } }} >
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
                                            <Inputs variant='adminPrimary' size='medium' className='border-white/10 text-white bg-white/5' labelClassName={"text-slate-300 text-xs"} label={"SKU"} placeholder={"IPH-15-256"} value={variant.sku} onChange={(e) => handleVariantChange(variant.id, 'sku', e.target.value)} error={errors[`variant_${index}_sku`]} />
                                            <Inputs variant='adminPrimary' size='medium' className='border-white/10 text-white bg-white/5' labelClassName={"text-slate-300 text-xs"} label={"COLOR"} placeholder={"Space Gray"} value={variant.color} onChange={(e) => handleVariantChange(variant.id, 'color', e.target.value)} error={errors[`variant_${index}_color`]} />
                                            <Inputs variant='adminPrimary' size='medium' className='border-white/10 text-white bg-white/5' labelClassName={"text-slate-300 text-xs"} type='number' label={"RAM (GB)"} placeholder={"8"} value={variant.ram} onChange={(e) => handleVariantChange(variant.id, 'ram', e.target.value, 'number')} error={errors[`variant_${index}_ram`]} />
                                            <Inputs variant='adminPrimary' size='medium' className='border-white/10 text-white bg-white/5' labelClassName={"text-slate-300 text-xs"} type='number' label={"Storage (GB)"} placeholder={"256"} value={variant.storage} onChange={(e) => handleVariantChange(variant.id, 'storage', e.target.value, 'number')} error={errors[`variant_${index}_storage`]} />

                                            <div className='border-t border-white/5 pt-3'>
                                                <Inputs variant='adminPrimary' size='medium' className='border-white/10 text-white bg-accent/20' labelClassName={"text-accent/80 text-xs"} type='number' label={"Price"} placeholder={"99.00"} value={variant.price} onChange={(e) => handleVariantChange(variant.id, 'price', e.target.value, 'number')} error={errors[`variant_${index}_price`]} />
                                            </div>
                                            <div className='border-t border-white/5 pt-3'>
                                                <Inputs variant='adminPrimary' size='medium' className='border border-success/30 text-white bg-success/10' labelClassName={"text-success/80 text-xs"} type='number' label={"Stock"} placeholder={"50"} value={variant.stock} onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value, 'number')} error={errors[`variant_${index}_stock`]} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </>
    );
};

export default page;