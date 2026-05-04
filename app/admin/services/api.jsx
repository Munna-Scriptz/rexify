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