import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vitxchange-server.vercel.app",
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

    getProductDetails: builder.query({
      query: (id) => `/product/${id}`,
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

    getCartProducts: builder.query({
      query: () => "/cart/products"
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useGetCartProductsQuery,
} = productApi;
