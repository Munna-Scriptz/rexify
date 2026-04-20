import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApis = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (build) => ({
        getCategory: build.query({
            query: () => "/category/all",
        }),
    }),
})


export const { useGetCategoryQuery } = adminApis