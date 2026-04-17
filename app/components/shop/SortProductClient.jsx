'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SortProduct from './SortProduct'

const SortProductClient = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const sortBy = searchParams?.get('sort') || 'featured';
    const viewMode = searchParams?.get('view') || 'grid';

    const handleSortChange = (newSort) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', newSort);
        params.delete('page'); // Reset to page 1 when sorting changes
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleViewModeChange = (newViewMode) => {
        const params = new URLSearchParams(searchParams);
        params.set('view', newViewMode);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <SortProduct 
            sortBy={sortBy} 
            setSortBy={handleSortChange} 
            viewMode={viewMode}
            setViewMode={handleViewModeChange}
        />
    );
};

export default SortProductClient;
