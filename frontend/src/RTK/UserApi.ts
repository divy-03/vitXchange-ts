import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/v1",
    credentials: "include", // Importand to include "cookies"
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),

    getUser: builder.mutation({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    getCookie: builder.mutation({
      query: () => ({
        url: "/auth/cookie",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserMutation,
  useGetCookieMutation,
} = userApi;
