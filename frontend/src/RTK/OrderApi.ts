import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:1337/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => `/orders/my`,
    }),

    getAllOrders: builder.query({
      query: () => "/orders/all",
    }),

    getSingleOrder: builder.query({
      query: (id) => `/order/${id}`,
    }),

    createOrder: builder.mutation({
      query: (body) => ({
        url: "/order/new",
        method: "POST",
        body: body,
      }),
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
    }),

    updateOrder: builder.mutation({
      query: (body) => ({
        url: `/order/${body.id}`,
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} = orderApi;
