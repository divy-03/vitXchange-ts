import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: process.env.REACT_APP_BASE_URL,
    baseUrl: "https://vitxchange-server.onrender.com/api/v1/",
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

    getUserProfile: builder.mutation({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation({
      query: (user) => ({
        url: "/auth/update",
        method: "PUT",
        body: user,
      }),
    }),

    getCookie: builder.mutation({
      query: () => ({
        url: "/auth/cookie",
        method: "GET",
      }),
    }),

    forgotPasssword: builder.mutation({
      query: (email) => ({
        url: "/password/forgot",
        method: "POST",
        body: email,
      }),
    }),

    resetPassword: builder.mutation({
      query: (info) => ({
        url: `/password/reset/${info.token}`,
        method: "PUT",
        body: {
          password: info.password,
          confirmPassword: info.confirmPassword,
        },
      }),
    }),

    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword, confirmPassword }) => ({
        url: "/password/update",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
          confirmPassword,
        },
      }),
    }),

    getAllUsers: builder.mutation({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
    }),

    getUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "GET",
      }),
    }),

    editUserRole: builder.mutation({
      query: ({ id, name, email, role }) => ({
        url: `/admin/user/${id}`,
        method: "PUT",
        body: {
          name,
          email,
          role,
        },
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserProfileMutation,
  useUpdateProfileMutation,
  useGetCookieMutation,
  useForgotPassswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useGetAllUsersMutation,
  useGetUserMutation,
  useEditUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
