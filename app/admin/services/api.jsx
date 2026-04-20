import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApis = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
    endpoints: (build) => ({
        getCategory: build.query({
            query: () => "/category/all",
        }),
    }),
})


export const { useGetCategoryQuery } = adminApis