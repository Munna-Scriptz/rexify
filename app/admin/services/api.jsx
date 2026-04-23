import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApis = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
    endpoints: (build) => ({
        getCategory: build.query({
            query: () => "/category/all",
        }),
        createCategory: build.mutation({
            query: (data) => ({
                url: "/category/create",
                method: "POST",
                body: data,
            }),
        }),
    }),
})


export const { useGetCategoryQuery, useCreateCategoryMutation } = adminApis