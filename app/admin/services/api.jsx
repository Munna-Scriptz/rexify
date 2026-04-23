import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApis = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
    endpoints: (build) => ({
        getCategory: build.query({
            query: () => "/category/all",
        }),
        createCategory: build.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("slug", data.slug);
                formData.append("description", data.description);
                formData.append("thumbnail", data.thumbnail); // 👈 file
                return {
                    url: "/category/create",
                    method: "POST",
                    body: formData,
                    credentials: "include",
                };
            },
        }),
    }),
})


export const { useGetCategoryQuery, useCreateCategoryMutation } = adminApis