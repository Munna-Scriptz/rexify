"use client"
import { useState } from 'react';
import CategoryCard from '../components/cards/CategoryCard';
import { Layers, CheckCircle, Plus } from 'lucide-react';
import StatCard from '../components/common/StatCards';
import CategoryHeader from '../components/category/CategoryHeader';
import CreateCategoryModal from '../components/category/CreateCategoryModal';
import VerifyDelete from '../components/common/VerifyDelete';
import { useGetCategoryQuery } from '../services/api';

const page = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleteOpen, SetisDeleteOpen] = useState(false)
  const [categoryId, SetCategoryId] = useState("")
  // ------------ Get data from server -------------
  const { data: categories, error, isLoading } = useGetCategoryQuery()

  // ------------ Handle delete -------------
  const handleDelete = () => {
    
  }

  return (
    <>
      {/* ----------------------- Row One: Stats ----------------------- */}
      <section className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-10'>
        <StatCard
          title="Total Category"
          value={categories?.data?.length}
          trendValue="+2"
          icon={<Layers size={32} strokeWidth={1.2} />}
          variant="accent"
        />

        <StatCard
          title="Total Products"
          value={categories?.data?.reduce((sum, item) => sum + item.totalProducts, 0)}
          icon={<CheckCircle size={32} strokeWidth={1.2} />}
          variant="success"
        />
      </section>

      {/* ----------------------- Category Header ----------------------- */}
      <CategoryHeader setIsOpen={setIsOpen} />

      {/* ---------- Modals  */}
      <VerifyDelete isOpen={isDeleteOpen} onClose={() => SetisDeleteOpen(false)} onConfirm={handleDelete} itemName="Spring Collection 2024" />
      <CreateCategoryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* ----------------------- Category Grid ----------------------- */}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {categories?.data?.map((item, i) => (
          <CategoryCard
            key={i}
            categories={item}
            onDelete={(e) => { SetisDeleteOpen(true), SetCategoryId(e) }}
          />
        ))}


        {/*----------------- Create New Card */}
        <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col items-center justify-center p-8 bg-surface border-2 border-dashed border-border rounded-3xl hover:border-accent hover:bg-accent/5 transition-all duration-300 gap-4 group cursor-pointer h-70">
          <div className="w-18 h-18 flex items-center justify-center rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform">
            <div className='w-12 h-12 bg-gray-200 flex items-center justify-center text-text-primary rounded-full'>
              <Plus size={24} />
            </div>
          </div>
          <div className="text-center">
            <h4 className="text-brand font-bold text-lg font-space">Create New Selection</h4>
            <p className="text-text-muted text-sm font-medium italic">Start a new curated collection</p>
          </div>
        </button>

      </section>
    </ >
  );
};

export default page;