import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/v1",
    credentials: "include", // Importand to include "cookies"
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/product/new",
        method: "POST",
        body: product,
      }),
    }),

    getProductDetails: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: `/product/all`,
      }),
    }),

    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/product/${product.id}`,
        method: "PUT",
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetProductDetailsMutation,
} = productApi;
