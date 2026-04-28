import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApis = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: "include"
    }),
    endpoints: (build) => ({
        getCategory: build.query({
            query: () => "/category/all",
        }),
        getProducts: build.query({
            query: () => "/product",
        }),
        createProduct: build.mutation({
            query: (data) => ({
                url: "/product/create",
                method: "POST",
                body: data
            })
        })
    }),
})


export const { useGetCategoryQuery, useGetProductsQuery, useCreateProductMutation } = adminApis