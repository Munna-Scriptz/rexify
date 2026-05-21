import { useRef, useState } from 'react';
import { X, Upload, Check, Power, LayoutGrid, Type, Hash, FileText } from 'lucide-react';
import Inputs from '../ui/Inputs';
import { useCreateCategoryMutation } from '../../services/api';
import { toast } from 'react-toastify';
import Button from '@/app/components/ui/Buttons';

const CreateCategoryModal = ({ isOpen, onClose }) => {
    const [createCategory, { isLoading }] = useCreateCategoryMutation()

    const [formData, setFormData] = useState({
        name: '',
        nameErr: '',
        slug: '',
        slugErr: '',
        description: '',
        isActive: true,
        thumbnail: null,
        thumbnailErr: ''
    });
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, thumbnail: reader.result, imageFile: file }));
            };
            reader.readAsDataURL(file);
        }
    };
    // ------------ Handle create --------------

    const handleCreate = async () => {
        if (!formData.thumbnail) return setFormData((prev) => ({ ...prev, thumbnailErr: "Thumbnail is required" }))
        if (!formData.name) return setFormData((prev) => ({ ...prev, nameErr: "Name is required" }))
        if (!formData.slug) return setFormData((prev) => ({ ...prev, slugErr: "Slug is required" }))

        const provided = new FormData()
        provided.append('thumbnail', formData.imageFile)
        provided.append('name', formData.name)
        provided.append('slug', formData.slug)
        provided.append('description', formData.description)


        try {
            await toast.promise(
                createCategory(provided).unwrap(),
                {
                    pending: "Creating category...",
                    success: {
                        render({ data }) {
                            return data.message || "Category created successfully";
                        }
                    },
                    error: {
                        render({ data }) {
                            return data?.data?.message || "Something went wrong";
                        }
                    }
                }
            );
            onClose()
            setFormData({ name: '', slug: '', description: '', isActive: true, thumbnail: null })
        } catch (err) {
            console.log("Error:", err);
        }
    };


    if (!isOpen) return null;
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
                    <div className='flex gap-6 w-full'>
                        {/* Thumbnail Upload */}
                        <div className="flex flex-col gap-3 flex-1">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <div
                                onClick={() => { fileInputRef.current.click(), setFormData((prev) => ({ thumbnailErr: '' })) }}
                                className={`h-66 rounded-4xl border-2 border-dashed ${formData.thumbnailErr ? "border-error bg-error/10" : "border-border bg-surface/50"}  group hover:border-accent/40 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 relative overflow-hidden`}
                            >
                                {formData.thumbnail ? (
                                    <>
                                        <img src={formData.thumbnail} className="w-full h-full object-cover" alt="preview" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                                <Upload size={20} />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={`w-14 h-14 rounded-full ${formData.thumbnailErr ? "bg-error/20" : "bg-white"} shadow-xl flex items-center justify-center text-accent group-hover:scale-110`}>
                                            <Upload size={24} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-bold font-space text-brand mb-1">{formData.thumbnailErr ? "Thumbnail is required" : "Upload High-Res Cover"}</p>
                                            <p className="text-[10px] text-text-muted font-medium">Recommended: 1200 x 800px</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 flex-1">
                            {/* Name */}
                            <Inputs
                                labelIcon={<Type size={12} />}
                                label={"Category Name"}
                                error={formData.nameErr}
                                labelClassName={"text-[11px] font-semibold font-space text-coil uppercase tracking-widest pl-2 flex items-center gap-2"}
                                variant='adminPrimary'
                                value={formData.name}
                                placeholder="Premium Smartphones"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value, nameErr: '' })}
                            />

                            <Inputs
                                labelIcon={<Hash size={12} />}
                                label={"Category slug"}
                                error={formData.slugErr}
                                labelClassName={"text-[11px] font-semibold font-space text-coil uppercase tracking-widest pl-2 flex items-center gap-2"}
                                variant='adminPrimary'
                                value={formData.slug}
                                placeholder="Product slug"
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value, slugErr: '' })}
                            />

                            {/* Status Toggle */}
                            <div className="flex flex-col gap-2 w-full">
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
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2 mt-6">
                        <label className="text-[11px] font-semibold font-space text-coil uppercase tracking-widest pl-2 flex items-center gap-2">
                            <FileText size={12} /> Rich Description
                        </label>
                        <textarea
                            rows="4"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe what makes this collection unique..."
                            className="w-full px-6 py-4 bg-surface border border-border rounded-3xl font-medium text-brand focus:border-accent outline-none resize-none leading-relaxed"
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-6 bg-surface border-t border-border flex items-center justify-end gap-4">
                    <Button variant='ghost' size='lg' isLoading={isLoading}
                        onClick={onClose}
                    >
                        Discard
                    </Button>
                    <Button variant='adminPrimary' size='lg' isLoading={isLoading} type="submit" leftIcon={<Check size={18} />}
                        onClick={handleCreate}
                    >
                        Create Category
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default CreateCategoryModal;