"use client"
import { useState } from 'react';
import { Plus, Trash2, Package, Cpu, Battery, Monitor, Camera, Tag as TagIcon, Smartphone, ShieldCheck, Layers, Network, Weight, Sparkles, CheckCircle2 } from 'lucide-react';
import CreateHeader from '../../components/createProduct/CreateHeader';
import VariantManager from '../../components/createProduct/VariantManager';
import Inputs from '../../components/ui/Inputs';
import { useCreateProductMutation, useGetCategoryQuery } from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';

const Page = () => {
    // ------------ Get categories from server -------------
    const { data: categories, error: categoryError, isLoading } = useGetCategoryQuery();

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        category: '',
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
        colorName: '',
        colorCode: '#111111',
        storage: '',
        ram: '',
        price: '',
        discountPercentage: 0,
        stock: '',
        isDefault: true,
        thumbnailFile: null,
        imageFiles: [null, null]
    }]);

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState({});

    // ----------- handle all input changes -----------
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

    // ----------- handle all specifications changes -----------
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

    // ----------- handle add tags -----------
    const addTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
            e.preventDefault();
        }
    };

    // ----------- handle remove tags -----------
    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    // ----------- handle all input validations -----------
    const validateForm = () => {
        const newErrors = {};

        // General Info
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.brand) newErrors.brand = "Brand is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.description) newErrors.description = "Description is required";

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
            if (!v.colorName) newErrors[`variant_${index}_colorName`] = "Color name";
            if (!v.colorCode) newErrors[`variant_${index}_colorCode`] = "Color code";
            if (!v.storage) newErrors[`variant_${index}_storage`] = "Storage required";
            if (!v.ram) newErrors[`variant_${index}_ram`] = "RAM required";
            if (!v.price || v.price < 1) newErrors[`variant_${index}_price`] = "Min price 1";
            if (v.stock === '' || v.stock < 0) newErrors[`variant_${index}_stock`] = "Min stock 0";
            if (!v.thumbnailFile) newErrors[`variant_${index}_thumbnail`] = "Cover image required";
            if (!v.imageFiles[0] || !v.imageFiles[1]) newErrors[`variant_${index}_gallery`] = "Both gallery slots required";
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstErrorField = Object.keys(newErrors)[0];
            toast.error(`Please fix form errors (check variant and specification sections)`);
            return false;
        }

        return true;
    };

    // --------------- Handle submit ----------------
    const [createProduct] = useCreateProductMutation();

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!validateForm()) return;
        const formDataToSend = new FormData();

        // 1. General details
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        // 2. Set base price and discount from default variant (for backend controller compatibility)
        const defaultVariant = variants.find(v => v.isDefault) || variants[0];
        formDataToSend.append('price', Number(defaultVariant.price));
        formDataToSend.append('discountPercentage', Number(defaultVariant.discountPercentage || 0));

        // 3. Serialize specifications & tags
        formDataToSend.append('specifications', JSON.stringify(specs));
        formDataToSend.append('tags', JSON.stringify(tags));

        // 4. Serialize variants array (without File binaries to avoid serialization error)
        const cleanVariants = variants.map(v => ({
            sku: v.sku,
            color: {
                name: v.colorName,
                code: v.colorCode
            },
            ram: Number(v.ram),
            storage: Number(v.storage),
            price: Number(v.price),
            discountPercentage: Number(v.discountPercentage || 0),
            stock: Number(v.stock),
            isDefault: v.isDefault
        }));
        formDataToSend.append('variants', JSON.stringify(cleanVariants));

        // 5. Append individual binary files per variant with dynamic keys
        variants.forEach((v, index) => {
            if (v.thumbnailFile) {
                formDataToSend.append(`variant_${index}_thumbnail`, v.thumbnailFile);
            }
            if (v.imageFiles[0]) {
                formDataToSend.append(`variant_${index}_image_0`, v.imageFiles[0]);
            }
            if (v.imageFiles[1]) {
                formDataToSend.append(`variant_${index}_image_1`, v.imageFiles[1]);
            }
        });

        await toast.promise(
            createProduct(formDataToSend).unwrap(),
            {
                pending: "Uploading media and creating product...",
                success: {
                    render({ data }) {
                        return data.message || "Product created successfully!";
                    }
                },
                error: {
                    render({ data }) {
                        return data?.data?.message || "Failed to create product.";
                    }
                }
            }
        );
    };

    // ----------- Dynamic Preview Data -----------
    const defaultVar = variants.find(v => v.isDefault) || variants[0];
    const previewThumbnailUrl = defaultVar?.thumbnailFile ? URL.createObjectURL(defaultVar.thumbnailFile) : null;
    const categoryName = categories?.data?.find(c => c._id === formData.category)?.name || "Technology";

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col gap-6 pb-20 animate-fade-in">
                {/* ---------------- Header ---------------- */}
                <CreateHeader onPublish={handleSubmit} />

                {/* ================= LEFT COLUMN ================= */}
                <div className="flex flex-col gap-6">

                    {/* General Information */}
                    <section className="p-6 bg-white rounded-3xl border border-border shadow-sm">
                        <h2 className="text-xl font-bold font-space text-brand mb-6 flex items-center gap-3">
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

                            <div className="md:col-span-2 flex flex-col gap-2">
                                <label className={`text-xs font-bold uppercase tracking-widest duration-300 ${errors.description ? 'text-error animate-pulse' : 'text-slate-500'}`}>
                                    {errors.description ? <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-red-500 rounded-full"></span>{errors.description}</span> : "Full Description"}
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Highlight technical features, camera capabilities, screen tech, etc..."
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

                    {/* Logistics Section */}
                    <section className="p-6 bg-white rounded-3xl border border-border shadow-sm flex flex-col gap-4">
                        <h2 className="text-lg font-bold font-space text-brand flex items-center gap-2">
                            <ShieldCheck size={18} className="text-accent" /> Logistics & Metadata
                        </h2>
                        <div className="flex flex-col gap-4">
                            <Inputs variant='adminPrimary' label={"Warranty"} name="warranty" value={formData.warranty} onChange={handleInputChange} placeholder={"No warranty"} />
                            <Inputs variant='adminPrimary' label={"Shipping"} name="shipping" value={formData.shipping} onChange={handleInputChange} placeholder={"Ships in 3-5 days"} />
                        </div>

                        <section className="p-6 bg-white rounded-3xl border border-border shadow-sm flex flex-col gap-4">
                            <div className="flex items-center justify-between pb-1 border-b border-border/40">
                                <h2 className="text-lg font-bold font-space text-brand flex items-center gap-2">
                                    <TagIcon size={18} className="text-accent" /> Metadata
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Active Status</span>
                                    <label className="relative inline-flex items-center cursor-pointer select-none">
                                        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="sr-only peer" />
                                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-success"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                                {tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-brand text-white rounded-lg text-[11px] font-bold font-space flex items-center gap-1.5">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(i)} className="cursor-pointer opacity-70 hover:opacity-100 font-sans">x</button>
                                    </span>
                                ))}
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={addTag}
                                    placeholder="Type search tag and press Enter..."
                                    className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl focus:border-accent outline-none text-xs font-bold text-brand shadow-sm"
                                />
                                <Plus className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent" size={14} />
                            </div>
                        </section>
                    </section>
                    {/* Variants Section (BOTTTOM OF GENERAL INFOS & SPECS!) */}
                    <VariantManager
                        variants={variants}
                        setVariants={setVariants}
                        errors={errors}
                        setErrors={setErrors}
                    />

                </div>
            </div>
        </>
    );
};

export default Page;