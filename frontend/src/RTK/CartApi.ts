import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (pid) => ({
        url: "/cart/add",
        method: "POST",
        body: pid,
      }),
    }),

    removeFromCart: builder.mutation({
      query: (pid) => ({
        url: "/cart/remove",
        method: "DELETE",
        body: pid,
      }),
    }),

    getCartItems: builder.query({
      query: () => "/cart/items",
    }),

    decreaseQuant: builder.mutation({
      query: (pid) => ({
        url: "/cart/decquan",
        method: "DELETE",
        body: pid,
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartItemsQuery,
  useLazyGetCartItemsQuery,
  useDecreaseQuantMutation,
  useRemoveFromCartMutation,
} = cartApi;
