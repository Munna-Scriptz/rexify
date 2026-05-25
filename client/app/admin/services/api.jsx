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
    tagTypes: ['products', 'category', 'order'],


    endpoints: (build) => ({
        // ------------ Products --------------
        getProducts: build.query({
            query: () => "/product",
            providesTags: ['products'],
        }),

        getSingleProduct: build.query({
            query: (slug) => `product/${slug}`,
            providesTags: ['products'],
        }),

        createProduct: build.mutation({
            query: (data) => ({
                url: "/product/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['products'],
        }),

        updateProduct: build.mutation({
            query: ({ slug, id, formData }) => ({
                url: `/product/update/${slug}?id=${id}`,
                method: "PATCH",
                body: formData,
            }),

            invalidatesTags: ["products"],
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

        updateCategory: build.mutation({
            query: (data) => ({
                url: "/category/update",
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['category'],
        }),

        // ------------ Orders --------------
        getOrders: build.query({
            query: () => "/checkout/get",
            providesTags: ['order'],
        }),
    }),

})


export const {
    useGetProductsQuery,
    useGetSingleProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,

    useGetCategoryQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,


    useGetOrdersQuery,
} = adminApis