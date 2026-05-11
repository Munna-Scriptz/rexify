import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "include"
})

const baseQueryWithReauth = async (args, api, options) => {
    let result = await baseQuery(args, api, options)


    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery({
            url: "/auth/refreshAccessToken",
            method: "POST",
        }, api, options)


        if (refreshResult.data) {
            result = await baseQuery(args, api, options)

        } else {
            await baseQuery({
                url: "/auth/signout",
                method: "POST",
            }, api, options)
        }
    }

    return result
}

export const adminApis = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['products', 'category'],


    endpoints: (build) => ({

        // ------------ Products --------------
        getProducts: build.query({
            query: () => "/product",
        }),

        createProduct: build.mutation({
            query: (data) => ({
                url: "/product/create",
                method: "POST",
                body: data
            })
        }),


        // ------------ Category --------------
        getCategory: build.query({
            query: () => "/category/all",
            providesTags: ['category'],
        }),

        createCategory: build.mutation({
            query: (data) => ({
                url: "/category/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['category'],
        }),

        deleteCategory: build.mutation({
            query: (data) => ({
                url: "/category/delete",
                method: "DELETE",
                body: data
            }),
            invalidatesTags: ['category'],
        }),


    }),

})


export const { 
    useGetProductsQuery,
    useCreateProductMutation,

    useGetCategoryQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation
    
} = adminApis