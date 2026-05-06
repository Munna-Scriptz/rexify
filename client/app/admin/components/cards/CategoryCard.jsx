import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import EditCategoryModal from '../category/EditCategoryModal';

const CategoryCard = ({ categories, onDelete }) => {
  const [isEditOpen, setEditIsOpen] = useState(false)
  return (
    <>
      <div className="relative overflow-hidden rounded-3xl group h-70 shadow-sm hover:shadow-xl transition-all duration-500">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
          style={{ backgroundImage: `url(${categories.thumbnail})` }} />

        {/* Overlay - Bottom Gradient for text clarity */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end gap-2">
          {/* Category Name */}
          <h3 className="text-white text-2xl font-semibold font-space leading-tight">
            {categories.name}
          </h3>

          {/* Product Count */}
          <p className="text-white/70 text-sm font-medium">
            {categories.totalProducts} Products
          </p>

          {/* Action Buttons */}
          <div className="absolute top-8 right-8 flex gap-3">
            <button
              onClick={() => setEditIsOpen(true)}
              className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 hover:bg-accent hover:border-accent transition-all duration-300"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={onDelete}
              className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 hover:bg-error hover:border-error transition-all duration-300"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <EditCategoryModal categories={categories} isEditOpen={isEditOpen} onClose={() => setEditIsOpen(false)} />
    </>
  );
};

export default CategoryCard;
