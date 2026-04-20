"use client"
import React, { useState } from 'react';
import CategoryCard from '../components/cards/CategoryCard';
import { Layers, CheckCircle, Plus } from 'lucide-react';
import StatCard from '../components/common/StatCards';
import CategoryHeader from '../components/category/CategoryHeader';
import CreateCategoryModal from '../components/category/CreateCategoryModal';
import EditCategoryModal from '../components/category/EditCategoryModal';
import VerifyDelete from '../components/common/VerifyDelete';

const page = () => {
  const categories = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop',
      name: 'Premium Apparel',
      subtitle: 'CURATION #01',
      count: 452
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop',
      name: 'Luxury Watches',
      subtitle: 'CURATION #02',
      count: 128
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop',
      name: 'Bespoke Living',
      subtitle: 'CURATION #03',
      count: 84
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2670&auto=format&fit=crop',
      name: 'Artisan Beauty',
      subtitle: 'CURATION #04',
      count: 215
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop',
      name: 'Sonic High-End',
      subtitle: 'CURATION #05',
      count: 56
    }
  ];

  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setEditIsOpen] = useState(false)
  const [isDeleteOpen, SetisDeleteOpen] = useState(false)


  return (
    <>
      {/* ----------------------- Row One: Stats ----------------------- */}
      <section className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-10'>
        <StatCard
          title="Total Category"
          value="12"
          trendValue="+2"
          icon={<Layers size={32} strokeWidth={1.2} />}
          variant="accent"
        />

        <StatCard
          title="Total Category"
          value="08"
          icon={<CheckCircle size={32} strokeWidth={1.2} />}
          variant="success"
        />
      </section>

      {/* ----------------------- Category Header ----------------------- */}
      <CategoryHeader setIsOpen={setIsOpen} />
      
      {/* ---------- Modals  */}
      <VerifyDelete isOpen={isDeleteOpen} onClose={() => SetisDeleteOpen(false)} onConfirm={""} itemName="Spring Collection 2024" />
      <CreateCategoryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <EditCategoryModal isEditOpen={isEditOpen} onClose={() => setEditIsOpen(false)} />

      {/* ----------------------- Category Grid ----------------------- */}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            image={cat.image}
            name={cat.name}
            subtitle={cat.subtitle}
            count={cat.count}
            onEdit={() => setEditIsOpen(true)}
            onDelete={() => SetisDeleteOpen(true)}
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