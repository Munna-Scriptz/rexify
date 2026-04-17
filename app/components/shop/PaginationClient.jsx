'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Pagination from './Pagination'

const PaginationClient = ({ currentPage, totalPages }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);
        if (newPage === 1) {
            params.delete('page');
        } else {
            params.set('page', newPage);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
        />
    );
};

export default PaginationClient;
